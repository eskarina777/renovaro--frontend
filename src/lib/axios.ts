import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  // TODO set a path auth for login/refresh BE sets refresh token in an HttpOnly cookie
})

let accessToken: string | null = null

export function setAccessToken(token: string | null): void {
  accessToken = token
}

api.interceptors.request.use((request) => {
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`
  return request
})

let isRefreshing = false
let pending: Array<() => void> = []

let logoutFn: (() => void) | null = null

export function axiosLogout(fn: () => void) {
  logoutFn = fn
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      if (!isRefreshing) {
        isRefreshing = true
        try {
          //TODO synchronize wity BE url
          const response = await api.post('/auth/refresh')
          const data = response.data
          setAccessToken(data.accessToken ?? null)
          pending.forEach((fn) => fn())
          pending = []
        } catch {
          isRefreshing = false
          if (logoutFn) logoutFn()

          throw err
        }
        isRefreshing = false
      }
      await new Promise<void>((resolve) => pending.push(resolve))
      return api(original)
    }
    throw err
  },
)
