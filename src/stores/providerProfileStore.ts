import { defineStore } from 'pinia'

type State = {
  showPhoneNumber: boolean
  userWebsite: string | null
  phoneNumber: string | null
}

export const useProviderStore = defineStore('provider', {
  state: (): State => ({
    showPhoneNumber: false,
    userWebsite: null,
    phoneNumber: null,
  }),
  actions: {
    initFromProfileInfo(
      showPhoneNumber: boolean,
      userWebsite: string | null,
      phoneNumber: string | null,
    ) {
      this.showPhoneNumber = showPhoneNumber
      this.userWebsite = userWebsite
      this.phoneNumber = phoneNumber
    },

    updateShowPhoneNumberUI(newValue: boolean) {
      this.showPhoneNumber = newValue
    },
  },
})
