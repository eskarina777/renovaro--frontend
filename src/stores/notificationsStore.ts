import { defineStore } from 'pinia'

type State = {
  inboxViewOpen: boolean
  hasNewMessages: boolean
  inboxDropdownOpen: boolean
  notificationsDropdownOpen: boolean
  notificationsModalOpen: boolean
  hasNewNotifications: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): State => ({
    inboxViewOpen: false,
    inboxDropdownOpen: false,
    hasNewMessages: false,
    notificationsDropdownOpen: false,
    notificationsModalOpen: false,
    hasNewNotifications: false,
  }),

  actions: {
    setInboxViewOpen(value: boolean) {
      this.inboxViewOpen = value
    },
    setInboxDropdownOpen(value: boolean) {
      this.inboxDropdownOpen = value
    },
    setHasNewMessages(value: boolean) {
      this.hasNewMessages = value
    },
    setNotificationsDropdownOpen(value: boolean) {
      this.notificationsDropdownOpen = value
    },
    setNotificationsModalOpen(value: boolean) {
      this.notificationsModalOpen = value
    },
    setHasNewNotifications(value: boolean) {
      this.hasNewNotifications = value
    },
  },
})
