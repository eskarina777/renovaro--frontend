import { defineStore } from 'pinia'
import { refresh, getUserInfo, login as loginApi, logout as logoutApi } from '@/api/authApi'
import { setAccessToken } from '@/lib/axios'
import type { Role, UserType, LoginType } from '@/types/Types'
import { closeSocket } from '@/lib/websocketService'
import { axiosLogout } from '@/lib/axios'

axiosLogout(() => useAuthStore().logout())

type State = {
  user: UserType | null
  accessToken: string | null
  activeRole: Role | null
  isInitialized: boolean
  showLoginModal: boolean
}

const ACTIVE_ROLE_KEY = 'activeRole'

const pickPriority = (roles: Role[]): Role =>
  roles.includes('COMPANY') ? 'COMPANY' : roles.includes('SPECIALIST') ? 'SPECIALIST' : 'CLIENT'

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: null,
    accessToken: null,
    activeRole: (localStorage.getItem(ACTIVE_ROLE_KEY) as Role) ?? null,
    isInitialized: false,
    showLoginModal: false,
  }),

  actions: {
    openLoginModal() {
      this.showLoginModal = true
    },

    closeLoginModal() {
      this.showLoginModal = false
    },
    setActiveRole(role: Role) {
      this.activeRole = role
      localStorage.setItem(ACTIVE_ROLE_KEY, role)
    },

    hasBothTypeRoles(): boolean {
      if (!this.user) return false
      const roles = this.user.userRole
      const hasClient = roles.includes('CLIENT')
      const hasProvider = roles.includes('SPECIALIST') || roles.includes('COMPANY')
      return hasClient && hasProvider
    },
    switchToOtherRole(): void {
      if (!this.user) return

      const roles = this.user.userRole
      if (roles.length < 2) return

      const current = this.activeRole
      const other = roles.find((role) => role !== current) ?? roles[0]

      this.setActiveRole(other as Role)
    },

    pickInitialRole(savedRole: Role | null, roles: Role[]): Role {
      const valid = savedRole !== null && roles.includes(savedRole)
      return valid ? savedRole : pickPriority(roles)
    },
    async hydrate(): Promise<void> {
      try {
        const dataToken = await refresh()
        this.accessToken = dataToken.accessToken
        setAccessToken(dataToken.accessToken)
        const dataUser = await getUserInfo()
        if (!dataUser) throw new Error('empty user')
        this.user = dataUser

        const savedRole = localStorage.getItem(ACTIVE_ROLE_KEY) as Role | null
        const initialRole = this.pickInitialRole(savedRole, this.user.userRole)
        this.setActiveRole(initialRole)
        this.isInitialized = true
      } catch (err) {
        if (err instanceof Error) console.error(err.message)
        else console.error(String(err))
        this.user = null
        this.accessToken = null
        setAccessToken(null)
        this.activeRole = null
        localStorage.removeItem(ACTIVE_ROLE_KEY)
      } finally {
      }
    },
    async login(email: string, password: string): Promise<void> {
      try {
        const credentials: LoginType = { email, password }
        const dataToken = await loginApi(credentials)
        this.accessToken = dataToken.accessToken
        setAccessToken(dataToken.accessToken)
        const dataUser = await getUserInfo()
        this.user = dataUser

        const savedRole = localStorage.getItem(ACTIVE_ROLE_KEY) as Role | null
        const initialRole = this.pickInitialRole(savedRole, this.user.userRole)
        this.setActiveRole(initialRole)
      } catch (err) {
        this.user = null
        this.accessToken = null
        setAccessToken(null)
        this.activeRole = null
        localStorage.removeItem(ACTIVE_ROLE_KEY)
        throw err
      }
    },

    async logout() {
      try {
        await logoutApi()
      } catch (err) {
        console.error('Failed to clear refresh token', err)
      }

      this.user = null
      this.accessToken = null
      setAccessToken(null)
      this.activeRole = null
      localStorage.removeItem(ACTIVE_ROLE_KEY)
      closeSocket()
    },
  },
})
