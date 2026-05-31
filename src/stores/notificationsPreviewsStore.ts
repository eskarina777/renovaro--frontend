import { defineStore } from 'pinia'
import type { NotificationPreviewType } from '@/types/Types'

type State = {
  previews: NotificationPreviewType[]
}

export const useNotificationPreviewsStore = defineStore('notificationPreviews', {
  state: (): State => ({
    previews: [],
  }),

  actions: {
    initFromPreviews(list: NotificationPreviewType[]) {
      this.previews = list
    },

    addNewNotificationToTop(notification: NotificationPreviewType) {
      this.previews.unshift(notification)
    },
    toggleIsReadUI(notificationId: number, newValue: boolean) {
      const found = this.previews.find((n) => n.notificationId === notificationId)
      if (found) {
        found.isRead = newValue
      }
    },

    markAsRead(notificationId: number) {
      const found = this.previews.find((n) => n.notificationId === notificationId)
      if (found) {
        found.isRead = true
      }
    },

    markAsUnread(notificationId: number) {
      const found = this.previews.find((n) => n.notificationId === notificationId)
      if (found) {
        found.isRead = false
      }
    },

    markAllAsRead() {
      this.previews.forEach((n) => {
        n.isRead = true
      })
    },

    deleteNotificationUI(notificationId: number) {
      this.previews = this.previews.filter((n) => n.notificationId !== notificationId)
    },
    getIsRead(notificationId: number): boolean {
      const found = this.previews.find((n) => n.notificationId === notificationId)
      return found ? found.isRead : false
    },
  },
})
