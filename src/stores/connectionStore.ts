import { defineStore } from 'pinia'

type State = {
  connected: boolean
  error: string | null
}

export const useConnectionStore = defineStore('wsConnection', {
  state: (): State => ({
    connected: false,
    error: null,
  }),
  actions: {
    setConnected(value: boolean) {
      this.connected = value
      if (value) {
        this.error = null
      }
    },
    setError(message: string | null) {
      this.error = message
      if (message !== null) {
        this.connected = false
      }
    },
    reset() {
      this.connected = false
      this.error = null
    },
  },
})
