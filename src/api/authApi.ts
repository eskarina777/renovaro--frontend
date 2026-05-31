import axios from 'axios'
import { api } from '@/lib/axios'
import {  API_BASE_URL } from '@/utils/constants'

import type { AuthResponse, UserType, LoginType, RegisterRequest } from '@/types/Types'

export async function login(body: LoginType): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/public/auth/login`, body)
  return data
}

export async function getUserInfo(): Promise<UserType> {
  const { data } = await api.get<UserType>(`${API_BASE_URL}/user/user-info`)
  return data
}
export async function registerSpecialist(payload: RegisterRequest): Promise<void> {
  const formData = new FormData()

  formData.append('payload', JSON.stringify(payload))

  if (payload.specialistProfile?.profileImage) {
    formData.append('file', payload.specialistProfile.profileImage)
  }

  await api.post(`${API_BASE_URL}/public/auth/register/specialist`, formData)
}

// TODO Set-Cookie: refreshToken=; Max-Age=0; Path=/auth/refresh; HttpOnly; Secure
export async function logout(): Promise<void> {
  await api.post(`${API_BASE_URL}/auth/logout`)
}

// TODO backend REFRESH TOKEN LOGIC
export async function refresh(): Promise<AuthResponse> {
  const { data } = await axios.get<AuthResponse>(`${API_BASE_URL}/auth-refresh`)
  return data
}
