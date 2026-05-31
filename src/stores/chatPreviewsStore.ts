import { defineStore } from 'pinia'
import type { ChatPreviewType, MessageType } from '@/types/Types'

type State = {
  previews: ChatPreviewType[]
  subscribedChatIds: Set<number>
}

export const useChatPreviewsStore = defineStore('chatPreviews', {
  state: (): State => ({
    previews: [],
    subscribedChatIds: new Set<number>(),
  }),

  actions: {
    initFromPreviews(list: ChatPreviewType[]) {
      this.previews = list
    },

    updateFromNewMessage(message: MessageType, currentUserId: number) {
      if (message.fromUserId === currentUserId) {
        return
      }

      const chatId = message.toChatId
      const found = this.previews.find((p) => p.chatId === chatId)
      if (!found) return

      found.lastMessageText = message.messageBody
      found.createdAt = message.createdAt
      found.isRead = true

      const otherChats = this.previews.filter((p) => p.chatId !== chatId)
      this.previews = [found, ...otherChats]
    },

    markAsRead(chatId: number) {
      const found = this.previews.find((p) => p.chatId === chatId)
      if (found) {
        found.isRead = false
      }
    },

    getIsRead(chatId: number): boolean {
      const found = this.previews.find((p) => p.chatId === chatId)
      return found ? found.isRead : false
    },
    getIsStarred(chatId: number) {
      const found = this.previews.find((p) => p.chatId === chatId)
      return found ? found.isStarred : false
    },
    toggleChatIsReadUI(chatId: number, newValue: boolean) {
      const preview = this.previews.find((p) => p.chatId === chatId)
      if (preview) preview.isRead = newValue
    },

    toggleChatIsStarredUI(chatId: number, newValue: boolean) {
      const preview = this.previews.find((p) => p.chatId === chatId)
      if (preview) preview.isStarred = newValue
    },

    deleteChatUI(chatId: number) {
      this.previews = this.previews.filter((p) => p.chatId !== chatId)
    },

    getPreviewByChatId(chatId: number | null) {
      return this.previews.find((p) => p.chatId === chatId) || null
    },

    add(id: number) {
      this.subscribedChatIds.add(id)
    },
    has(id: number) {
      return this.subscribedChatIds.has(id)
    },
    setAll(list: number[]) {
      this.subscribedChatIds = new Set(list)
    },
  },
})
