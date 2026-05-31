import type { PackageType } from '@/stores/freelanceStore'
import type { CalendarTimeSlotPayload } from '@/stores/calendarStore'
import type { FreelancePackage } from '@/stores/freelanceStore'

export type ReStatusType = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'DECLINED' | 'COMPLETED'
export type ServiceTypeCode = 'LOCAL_FLEX' | 'FREELANCE' | 'LOCAL_FIXED'
export type CriteriaType = 'Комуникация' | 'Качество' | 'Време за изпълнение'
export type ProviderRole = 'SPECIALIST' | 'COMPANY' | null
export type Role = 'CLIENT' | 'SPECIALIST' | 'COMPANY'
export type RatingValue = 1 | 2 | 3 | 4 | 5
export type TimeSlotStatusCodeType = 'AVAILABLE' | 'RESERVED' | 'TRANSPORT' | null
export type PricingCodeType = 'DAYS_14' | 'MONTH_1' | 'MONTHS_2' | 'MONTHS_3'

export type PublishedByValue = 'specialist' | 'company' | null
export type SortValue = 'price_asc' | 'price_desc' | 'date_desc' | 'views_desc' | null
export type SortReviewValue = 'rating_asc' | 'rating_desc' | 'date_desc' | null

export interface PublishAdResponse {
  adId: number
}
export interface PublishAdPayload {
  ad: AdPayload
  localService: LocalServicePayload | null
  consultation: ConsultationPayload | null
  serviceTimeSlots: CalendarTimeSlotPayload[] | null
  freelancePackage: FreelancePackageGroupPayload | null
  images: ImagePayload[]
}

export interface AdPayload {
  cityId: number | null
  adPricingPlanId: number | undefined
  serviceTypeCode: ServiceTypeCode | undefined | null
  pricingUnitId: number | undefined
  subcategoryId: number | undefined
  title: string | null
  description: string | null
  importantInfo: string | null
}

export interface ImagePayload {
  isPrimary: boolean
  file: File
}

export interface LocalServicePayload {
  servicePriceMin: number | null
  servicePriceMax: number | null
  providerQuestion: string | null
  importantInfo: string | null
}

export interface ConsultationPayload {
  consultationPriceMin: number | null
  consultationPriceMax: number | null
}

export interface CreateChat {
  providerId: number
  clientId: number
}

export interface MessageType {
  messageId: number
  toChatId: number
  fromUserId: number
  messageBody: string
  createdAt: string
}

export interface MessageRequest {
  chatId: number
  messageBody: string
}

export interface ChatPreviewType {
  chatId: number

  userId: number
  userName: string
  profileImageUrl: string
  onlineStatus: boolean

  lastMessageId: number
  lastMessageText: string
  createdAt: string
  isRead: boolean
  isStarred: boolean
}

export interface ChatMassagesResponse {
  chatId: number
  messages: MessageType[]
}

export interface UserRatingResponce {
  userId: 1
  ratingAverage: number | null
  ratingCount: number | null
}

export interface SingleFreelancePackagePayload {
  packageTitle: string | null
  packageDescription: string | null
  packageInfo: string | null

  packagePrice: number | null
  deliveryDays: number | null
  revisionCount: number | null
  renderCount: number | null
  detailDrawingCount: number | null
  has3DModel: boolean | null
  has2DDrawings: boolean | null
  hasSourceFile: boolean | null
}

export interface FreelancePackageGroupPayload {
  basic: SingleFreelancePackagePayload | null
  standard: SingleFreelancePackagePayload | null
  premium: SingleFreelancePackagePayload | null
}

export interface ConsultationPayload {
  consultationPriceMin: number | null
  consultationPriceMax: number | null
}

export interface ReservationType {
  date: string
  timeSlot: TimeSlotType
}

export type CalendarDay = {
  date: string
  timeSlots: TimeSlotType[]
}

export interface TimeSlotType {
  systemTimeSlotId: number
  serviceTimeSlotId: number
  startTimeLabel: string
  timeSlotStatusCode: TimeSlotStatusCodeType
}
export type PackageTypeCode = 'BASIC' | 'STANDARD' | 'PREMIUM'

export interface PackageTypeResponse {
  packageTypeId: number
  packageTypeCode: PackageType
  packageTypeLabel: string
}
export interface PricingUnitType {
  pricingUnitId: number
  pricingUnitCode: string
  pricingUnitLabel: string
}

export interface DeliveryDaysOption {
  value: number
  label: string
}

export interface RevisionCountOption {
  value: number
  label: string
}
export interface AdPricingPlan {
  adPricingPlanId: number
  planCode: string
  planName: string
  credits: number
}
export interface AdPricingFeatures {
  pricingCode: PricingCodeType
  features: string[]
}
export interface AdDetailedsResponse {
  adId: number
  serviceTypeCode: ServiceTypeCode
  subcategory: Subcategory
  category: Category
  userProfile: UserProfileType
  adDetails: AdDetailsType
}

export interface UserRatingBreakdownResponce {
  userId: number
  userRating: UserRatingType
}

export interface UserReviewsResponce {
  userId: number
  reviews: ReviewType[]
}

export type FreelancePackageType = Omit<FreelancePackage, 'isEnabled'>

export interface ConsultationResponce {
  adId: number
  consultation: ConsultationType
  adCalendar: CalendarDay[]
  inportantInfo: string
}
export interface FreelanceResponse {
  adId: number
  packages: FreelancePackageResponce
}
export interface FreelancePackageResponce {
  basic: FreelancePackageType
  standard: FreelancePackageType
  premium: FreelancePackageType
}

export interface ConsultationType {
  consultationId: number | null
  consultationPriceMin: number | null
  consultationPriceMax: number | null
}
export interface UserProfileType {
  userId: number
  userName: string
  userRole: Role[]
  userProfileImageUrl: string
  userWebsite: string
  userDetails: string
  ratingAverage: number
  ratingCount: number
  memberSince: string
  phoneNumber: string
  showPhoneNumber: boolean
}
export interface AdImageUrlType {
  adImageId: number
  isPrimary: boolean
  adImageUrl: string
}

export interface RatingCriteria {
  label: CriteriaType
  avg: number
}

export interface UserRatingType {
  stars: Record<number, number>
  criteria: RatingCriteria[]
}

export interface AdDetailsType {
  city: string
  adTitle: string
  adDescription: string
  adPriceMin: number | null
  adPriceMax: number | null
  pricingUnit: string | null
  adImageUrl: AdImageUrlType[]
  importantInfo: string
}

export type ReviewType = {
  userReviewId: number
  // serviceBookingId: number
  createdAt: string
  userReviewContent: string
  reviewImageUrl: string | null
  servicePrice: number
  ratingGeneral: number
  providerAnswer: string | null
  reviewerName: string
  reviewerProfileImageUrl: string
  providerName: string
  providerProfileImageUrl: string
  serviceCity: string
  serviceDurationDays: number
}

export interface AdCardType {
  adId: number
  adStatus: string
  userId: number
  userName: string
  profileImageUrl: string
  serviceType: ServiceTypeCode
  adTitle: string
  ratingAverage: number | null
  ratingCount: number | null
  adPriceMin: number | null
  adPriceMax: number | null
  pricingUnit: string | null
  adImageUrl: string
  userRole: 'SPECIALIST' | 'COMPANY'
  city: string
}

export interface PaginatedAdsResponse {
  ads: AdCardType[]
  total: number
}

export type JsonServerPaginationResponse<T> = {
  data: T[]
  items: number
  pages: number
}
export type ResponsePage<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  number: number // TODO BE is 0 based
  size: number
}

export interface RatingOption {
  value: RatingValue
  label: string
}

export interface PublishedByOption {
  value: PublishedByValue
  label: string
}

export interface BudgetRange {
  min: number | null
  max: number | null
}

export interface BudgetOption {
  label: string
  value: BudgetRange
}

export interface SortOption {
  label: string
  value: SortValue
}
export interface SortReviewOption {
  label: string
  value: SortReviewValue
}
export interface Category {
  categoryId: number
  categoryCode: string
  categoryName: string
}

export interface Subcategory {
  categoryId: number
  subcategoryId: number
  subcategoryCode: string
  subcategoryName: string
}

export interface City {
  cityId: number
  cityName: string
}

export interface NotificationPreviewType {
  notificationId: number
  notificationTitle: string
  notificationText: string
  notificationTypeCode: string
  isRead: boolean
  createdAt: Date
  entityType: 'SERVICE_RESERVATION' | 'FREELANCE_REQUEST' | 'AD' | 'REVIEW' | 'SYSTEM'
  entityId: number | null
}

export interface UserType {
  userId: number
  userName: string
  userRole: Role[]
  userProfileImage: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
}

export interface LoginType {
  email: string
  password: string
}
export type SpecialistProfile = {
  firstName: string
  lastName: string
  description: string
  phone: string
  publishPhone: boolean
  website: string
  profileImage: File | null
}
export type RegisterRequest = {
  email: string
  password: string
  role: Role
  specialistProfile?: SpecialistProfile
  // clientProfile?: ClientProfile
  // companyProfile?: CompanyProfile
}

export type RoleCardType = {
  role: Role
  label: string
  icon: string
}

export interface ProviderProfileResponce {
  userRating: UserRatingType
  reviews: ReviewType[]
  profileInfo: ProviderProfileType
  reservations: ConsultationReservationType[]
}

export interface ProviderProfileType {
  ratingAverage: number
  ratingCount: number
  userWebsite: string
  memberSince: string
  phoneNumber: string
  showPhoneNumber: boolean
  totalCredit: number
}
export interface ConsultationReservationType {
  reStatus: ReStatusType
  address: AdsressType
  userContactInfo: UserContactInfo
  consultationPrice: ConsultationType
  appointment: AppointmentType
}
export interface AdsressType {
  city: string
  district: string
  street: string
  streetNumber: string
}

export interface UserContactInfo {
  userName: string
  userPhoneNumber: string
}
export interface AppointmentType {
  serviceBookingId: number
  date: string
  startTimeLabel: string
  endTimeLabel: string
  isArchived: boolean
}

export type CreateServiceRequestPayload = {
  categoryId: number
  title: string
  description: string
}

export interface DetailedAdResponse {
  adId: number
  serviceTypeCode: ServiceTypeCode
  subcategory: Subcategory
  category: Category
  userProfile: UserProfileType
  adDetails: AdDetailsType
  userRating: UserRatingType
  reviews: ReviewType[]
  consultation: ConsultationType
  adCalendar: CalendarDay[]
}
