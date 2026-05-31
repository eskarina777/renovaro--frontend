import { defineStore } from 'pinia'
import type { MessageType, MessageRequest } from '@/types/Types'
import { getChatMessages, toggleChatIsRead } from '@/api/data'
import { useAuthStore } from '@/stores/authStore'
import { sendChatMessage } from '@/lib/websocketService'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
type State = {
  currentChatId: number | null
  messages: MessageType[]
  loading: boolean
  error: string | null
}

export const useChatStore = defineStore('chat', {
  state: (): State => ({
    currentChatId: null,
    messages: [],
    loading: false,
    error: null,
  }),

  actions: {
    async openChat(chatId: number) {
      if (this.currentChatId === chatId) return
      console.log('openChat chatId:', chatId, typeof chatId)
      this.currentChatId = chatId
      this.loading = true
      this.error = null
      this.messages = []

      try {
        const data = await getChatMessages(chatId)
        this.messages = data
        const previewsStore = useChatPreviewsStore()
        await toggleChatIsRead(chatId, true)
        previewsStore.toggleChatIsReadUI(chatId, true)
      } catch (err) {
        this.error = 'Loading unsuccessful'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    addIncomingMessage(message: MessageType) {
      if (this.currentChatId === message.toChatId) {
        this.messages.push(message)
      }
    },

    clearChat() {
      this.currentChatId = null
      this.messages = []
      this.loading = false
      this.error = null
    },
    async sendMessage(body: string) {
      const authStore = useAuthStore()

      if (!this.currentChatId || !authStore.user) return

      const msg: MessageType = {
        messageId: Date.now(),
        toChatId: this.currentChatId,
        fromUserId: authStore.user.userId,
        messageBody: body,
        createdAt: new Date().toISOString(),
      }

      const msgWS: MessageRequest = {
        chatId: this.currentChatId,
        messageBody: body,
      }
      this.messages.push(msg)
      sendChatMessage(msgWS)
    },
  },
})
