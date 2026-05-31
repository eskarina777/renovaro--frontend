import { Client, type IFrame } from '@stomp/stompjs'
import { useConnectionStore } from '@/stores/connectionStore'
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
import { useChatStore } from '@/stores/chatStore'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { useNotificationPreviewsStore } from '@/stores/notificationsPreviewsStore'
import { useAuthStore } from '@/stores/authStore'
import type { MessageType, MessageRequest } from '@/types/Types'
import { getChatPreviews } from '@/api/data'
let stompClient: Client | null = null
const WS_BASE_URL = 'ws://localhost:8080/public/ws'

export function openSocket(accessToken: string): void {
  if (stompClient && stompClient.active) {
    return
  }

  const connectionStore = useConnectionStore()

  stompClient = new Client({
    //TODO replace after seting backend to take token from header
    // webSocketFactory: () => new WebSocket(WS_BASE_URL),
    // connectHeaders: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
    webSocketFactory: () =>
      new WebSocket(`${WS_BASE_URL}?token=${encodeURIComponent(accessToken)}`),
    onConnect: async () => {
      connectionStore.setConnected(true)

      const onlineStatusStore = useOnlineStatusStore()
      const chatPreviewsStore = useChatPreviewsStore()
      const authStore = useAuthStore()

      const data = await getChatPreviews()
      onlineStatusStore.initFromPreviews(data)
      chatPreviewsStore.initFromPreviews(data)

      stompClient!.subscribe('/topic/online-status', (msg) => {
        const data = JSON.parse(msg.body)
        onlineStatusStore.updateOnlineStatus(data.userId, data.online)
      })

      const currentUserId = authStore.user?.userId
      if (!currentUserId) return

      const chatIds = chatPreviewsStore.previews.map((p) => p.chatId)

      subscribeToAllUserChats(currentUserId, chatIds)

      stompClient!.subscribe(`/topic/user/${currentUserId}`, (msg) => {
        const data = JSON.parse(msg.body) as { chatId: number }
        const chatId = data.chatId
        if (!chatId) return
        subscribeToChat(currentUserId, chatId)
      })
      const notificationsPreviewsStore = useNotificationPreviewsStore()
      const notificationsStore = useNotificationsStore()
      stompClient!.subscribe(`/topic/notifications/${currentUserId}`, (msg) => {
        const notification = JSON.parse(msg.body)
        if (
          notificationsStore.notificationsDropdownOpen ||
          notificationsStore.notificationsModalOpen
        ) {
          notificationsPreviewsStore.addNewNotificationToTop(notification)
        } else {
          notificationsStore.setHasNewNotifications(true)
        }
      })
    },

    onStompError: (frame: IFrame) => {
      const message = frame.headers['message'] || 'STOMP error'
      connectionStore.setError(message)
    },
    onWebSocketClose: () => {
      connectionStore.setConnected(false)
      const previewsStore = useChatPreviewsStore()
      previewsStore.subscribedChatIds.clear()
      stompClient = null
    },
  })

  stompClient.activate()
}

export function closeSocket(): void {
  if (!stompClient) {
    return
  }

  const connectionStore = useConnectionStore()

  try {
    stompClient.deactivate()
  } finally {
    stompClient = null
    connectionStore.reset()
  }
}

export function subscribeToAllUserChats(currentUserId: number | null, chatIds: number[]): void {
  if (!stompClient || !stompClient.active) return
  for (const chatId of chatIds) {
    subscribeToChat(currentUserId, chatId)
  }
}
export function subscribeToChat(currentUserId: number | null, chatId: number): void {
  if (!stompClient || !stompClient.active) return

  const chatStore = useChatStore()
  const previewsStore = useChatPreviewsStore()
  const notificationStore = useNotificationsStore()

  if (!previewsStore.subscribedChatIds.has(chatId)) {
    previewsStore.subscribedChatIds.add(chatId)

    stompClient.subscribe(`/topic/chat/${chatId}`, (msg) => {
      const data = JSON.parse(msg.body) as MessageType

      if (currentUserId == null) return
      if (data.fromUserId === currentUserId) return

      if (notificationStore.inboxViewOpen || notificationStore.inboxDropdownOpen) {
        chatStore.addIncomingMessage(data)
        previewsStore.updateFromNewMessage(data, currentUserId)
      } else {
        notificationStore.setHasNewMessages(true)
      }
    })
  }
}

export function sendChatMessage(payload: MessageRequest): void {
  if (!stompClient || !stompClient.active) return

  stompClient.publish({
    destination: '/app/chat/send',
    body: JSON.stringify(payload),
  })
}
