import axios from 'axios'
import { api } from '@/lib/axios'
import type {
  City,
  Role,
  Category,
  AdCardType,
  ReviewType,
  Subcategory,
  CalendarDay,
  MessageType,
  AdPricingPlan,
  UserRatingType,
  ChatPreviewType,
  PricingUnitType,
  PublishAdPayload,
  AdDetailedsResponse,
  PackageTypeResponse,
  ConsultationResponce,
  NotificationPreviewType,
  ProviderProfileType,
  FreelancePackageResponce,
  ConsultationReservationType,
  CreateServiceRequestPayload,
} from '@/types/Types'
import { API_BASE_URL } from '@/utils/constants'

// HOME VIEW

export async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get<Category[]>(`${API_BASE_URL}/public/category/all`)
  return data
}

export async function getCities(): Promise<City[]> {
  const { data } = await axios.get(`${API_BASE_URL}/public/user/cities`)
  return data
}

export async function getSubcategoriesHome(): Promise<Subcategory[]> {
  const { data } = await axios.get<Subcategory[]>(
    `${API_BASE_URL}/public/category/most-viewed/subcategories`,
  )
  return data
}

export async function getAdsHome(): Promise<AdCardType[]> {
  const { data } = await axios.get<AdCardType[]>(
    `${API_BASE_URL}/public/ads/top-architecture-design`,
  )
  return data
}

// CATEGORY VIEW

export async function getSubcategoriesCategory(categoryId: number): Promise<Subcategory[]> {
  const { data } = await axios.get<Subcategory[]>(
    `${API_BASE_URL}/public/category/${categoryId}/subcategories`,
  )
  return data
}

export async function getMostViewedAdsCategory(categoryId: number): Promise<AdCardType[]> {
  const { data } = await axios.get<AdCardType[]>(
    `${API_BASE_URL}/public/category/${categoryId}/most-viewed-ads`,
  )
  return data
}

export async function getCategoryById(categoryId: number | undefined): Promise<Category> {
  const { data } = await axios.get<Category>(`${API_BASE_URL}/public/category/${categoryId}`)
  return data
}

// SUBGATEGORY VIEW

export async function getSubcategoryAds(id: number, params: Record<string, unknown>) {
  const { data } = await axios.get(`${API_BASE_URL}/public/ads/subcategory/${id}/filter`, {
    params,
  })
  return data
}

export async function getSubcategoryById(id: number): Promise<Subcategory> {
  const { data } = await axios.get<Subcategory>(`${API_BASE_URL}/public/category/subcategory/${id}`)
  return data
}

export async function getSearchResultAds(params: Record<string, unknown>) {
  const { data } = await axios.get(`${API_BASE_URL}/public/ads/search`, {
    params,
  })
  return data
}

///AD VIEW

export async function getRecommendedAds(subcategoryId: number, excludeAdId: number) {
  const { data } = await axios.get(`${API_BASE_URL}/public/ads/recommended`, {
    params: { subcategoryId, excludeAdId },
  })
  return data
}

export async function getAdDetailsById(adId: number): Promise<AdDetailedsResponse> {
  const { data } = await axios.get(`${API_BASE_URL}/public/ads/ad-details/${adId}`)
  return data
}

export async function getFreelancePackagesByAdId(adId: number): Promise<FreelancePackageResponce> {
  const { data } = await axios.get(`${API_BASE_URL}/public/ads/${adId}/freelance-panel`)
  return data
}

export async function getConsutationOptionsByAdId(adId: number): Promise<ConsultationResponce> {
  const { data } = await axios.get(`${API_BASE_URL}/public/reservation/consultation-panel/${adId}`)
  return data
}

export async function getRatingBreakdownByUserId(userId: number): Promise<UserRatingType> {
  const { data } = await axios.get(`${API_BASE_URL}/public/rating/rating-breakdown/${userId}`)
  return data
}

export async function getReviewsByUserId(userId: number): Promise<ReviewType[]> {
  const { data } = await axios.get(`${API_BASE_URL}/public/rating/reviews/${userId}`)
  return data
}

// CLIENT SERVICE REQUEST
export async function createServiceRequest(payload: CreateServiceRequestPayload) {
  await api.post(`${API_BASE_URL}/ad/service-request`, payload)
}

//PUBLISH AD VIEW
export async function getProviderCalendar(adExpirationDate: string | null): Promise<CalendarDay[]> {
  const { data } = await api.get(`${API_BASE_URL}/reservation/provider-calendar`, {
    params: { adExpirationDate },
  })
  return data
}

export async function publishAd(payload: PublishAdPayload): Promise<number> {
  const formData = new FormData()
  formData.append('payload', JSON.stringify(payload))
  payload.images.forEach((img) => {
    formData.append('files', img.file)
  })
  const { data } = await api.post(`${API_BASE_URL}/ad/publish`, formData)
  return data
}
export async function getAdPricingPlans(): Promise<AdPricingPlan[]> {
  const { data } = await axios.get<AdPricingPlan[]>(`${API_BASE_URL}/public/ads/pricing-plans`)
  return data
}

export async function getPackageTypes(): Promise<PackageTypeResponse[]> {
  const { data } = await axios.get<PackageTypeResponse[]>(
    `${API_BASE_URL}/public/ads/package-types`,
  )
  return data
}

export async function getPricingUnits(): Promise<PricingUnitType[]> {
  const { data } = await axios.get<PricingUnitType[]>(`${API_BASE_URL}/public/ads/pricing-units`)
  return data
}

//INBOX VIEW
export async function getChatPreviews(): Promise<ChatPreviewType[]> {
  const { data } = await api.get(`${API_BASE_URL}/chat/user-chats`)
  return data
}

export async function getChatMessages(chatId: number): Promise<MessageType[]> {
  const { data } = await api.get(`${API_BASE_URL}/chat/${chatId}/messages`)
  return data
}

export async function createChat(otherUserId: number): Promise<number> {
  const { data } = await api.post<number>(`${API_BASE_URL}/chat/create/${otherUserId}`)
  return data
}
export async function deleteChat(chatId: number): Promise<void> {
  await api.post(`${API_BASE_URL}/chat/delete/${chatId}`)
}

export async function toggleChatIsRead(chatId: number, newValue: boolean): Promise<void> {
  await api.patch(`${API_BASE_URL}/chat/toggle-is-read/${chatId}`, { isRead: newValue })
}

export async function toggleChatIsStarred(chatId: number, newValue: boolean): Promise<void> {
  await api.patch(`${API_BASE_URL}/chat/toggle-is-starred/${chatId}`, { isStarred: newValue })
}

// NOTIFICATIONS DROPDOWN
export async function getNotificationsPreview(): Promise<NotificationPreviewType[]> {
  const { data } = await api.get(`${API_BASE_URL}/notification/user-notifications`)
  return data
}

export async function deleteNotification(notificationId: number): Promise<void> {
  await api.delete(`${API_BASE_URL}/notification/delete/${notificationId}`)
}

export async function toggleNotificationIsRead(
  notificationId: number,
  newValue: boolean,
): Promise<void> {
  await api.patch(`${API_BASE_URL}/notification/${notificationId}/toggle-is-read`, {
    isRead: newValue,
  })
}

///PROVIDER PROFILE VIEW

export async function getProviderAds(): Promise<AdCardType[]> {
  const { data } = await api.get(`${API_BASE_URL}/ads/provider-ads`)
  return data
}

export async function getProviderConsultations(): Promise<ConsultationReservationType[]> {
  const { data } = await api.get(`${API_BASE_URL}/reservation/provider/consultations`)
  return data
}

export async function getProviderReviews(): Promise<ReviewType[]> {
  const { data } = await api.get(`${API_BASE_URL}/rating/provider/reviews`)
  return data
}

export async function getProviderInfo(): Promise<ProviderProfileType> {
  const { data } = await api.get(`${API_BASE_URL}/user/provider-info`)
  return data
}

export async function addClientRoleToProvider(): Promise<void> {
  await api.post(`${API_BASE_URL}/user/add-client-role`)
}

export async function addProviderRoleToClient(role: Role): Promise<void> {
  await api.post(`${API_BASE_URL}/user/add-provider-role`, { role })
}

export async function updateShowPhoneNumber(newValue: boolean): Promise<void> {
  await api.patch(`${API_BASE_URL}/user/toggle-show-phone-number`, {
    showPhoneNumber: newValue,
  })
}
