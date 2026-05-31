import { defineStore } from 'pinia'
import type { Role, SpecialistProfile } from '@/types/Types'

type RegistrationState = {
  email: string | null
  password: string | null
  role: Role | null
  specialistProfile: SpecialistProfile
}

export const useRegistrationStore = defineStore('registration', {
  state: (): RegistrationState => ({
    email: null,
    password: null,
    role: null,
    specialistProfile: {
      firstName: '',
      lastName: '',
      description: '',
      phone: '',
      publishPhone: false,
      website: '',
      profileImage: null,
    },
  }),

  actions: {
    setCredentials(email: string, password: string) {
      this.email = email
      this.password = password
    },

    setRole(role: Role) {
      this.role = role
    },
    setSpecialistProfile(profile: SpecialistProfile) {
      this.specialistProfile = profile
    },

    reset() {
      this.email = null
      this.password = null
      this.role = null
    },
  },
})
