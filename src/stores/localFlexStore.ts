import { defineStore } from 'pinia'
import type { City } from '@/types/Types'
export type LocalFlexState = {
  city: City | null
  servicePriceMin: number | null
  servicePriceMax: number | null
  providerQuestion: string | null
  localServiceInfo: string | null
  consultationPriceMin: number | null
  consultationPriceMax: number | null
  consultationType: string | null
}

export type LocalFlexFieldKey = 'city' | 'consultationType'
export const useLocalFlexStore = defineStore('localFlex', {
  state: (): LocalFlexState => ({
    city: null,
    servicePriceMin: null,
    servicePriceMax: null,
    providerQuestion: null,
    localServiceInfo: null,
    consultationPriceMin: null,
    consultationPriceMax: null,
    consultationType: null,
  }),

  actions: {
    setField<K extends LocalFlexFieldKey>(key: K, value: LocalFlexState[K]) {
      const state = this.$state as LocalFlexState
      state[key] = value
    },
    setConsultationType(value: string | null) {
      this.consultationType = value
    },
    setCity(city: City | null) {
      this.city = city
    },
    setLocalServiceInfo(info: string | null) {
      this.localServiceInfo = info
    },
    setServicePriceMin(value: number | null) {
      this.servicePriceMin = value
    },

    setServicePriceMax(value: number | null) {
      this.servicePriceMax = value
    },

    setProviderQuestion(question: string | null) {
      this.providerQuestion = question
    },

    setConsultationPriceMin(value: number | null) {
      this.servicePriceMin = value
    },

    setConsultationPriceMax(value: number | null) {
      this.servicePriceMax = value
    },
  },
})
