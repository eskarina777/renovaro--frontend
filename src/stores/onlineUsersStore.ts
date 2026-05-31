import { defineStore } from 'pinia'

type State = {
  onlineStatusMap: Map<number, boolean>
}

export const useOnlineStatusStore = defineStore('onlineStatus', {
  state: (): State => ({
    onlineStatusMap: new Map<number, boolean>(),
  }),

  actions: {
    initFromPreviews(previews: Array<{ userId: number; onlineStatus: boolean }>) {
      this.onlineStatusMap.clear()
      previews.forEach((p) => {
        this.onlineStatusMap.set(p.userId, p.onlineStatus)
      })
    },

    updateOnlineStatus(userId: number, onlineStatus: boolean) {
      if (!this.onlineStatusMap.has(userId)) return
      this.onlineStatusMap.set(userId, onlineStatus)
    },

    getOnlineStatus(userId: number): boolean | undefined {
      return this.onlineStatusMap.get(userId)
    },

    reset() {
      this.onlineStatusMap.clear()
    },
  },
})
