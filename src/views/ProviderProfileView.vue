<template>
  <div>
    <div
      class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto mb-12 mt-10"
    >
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <div class="w-[335px]">
          <div class="bg-white pb-5 p-6 rounded-[6px] soft-shadow">
            <div class="flex flex-col items-center mb-3">
              <img
                alt="User avatar"
                class="w-24 h-24 rounded-full"
                :src="auth.user?.userProfileImage"
              />
              <h1 class="mt-4 mb-3 text-[19px] font-medium text-gray-600">
                {{ auth.user?.userName }}
              </h1>
            </div>

            <ProviderInfo
              v-if="providerInfo"
              :userWebsite="providerInfo.userWebsite"
              :memberSince="providerInfo.memberSince"
              :totalCredit="providerInfo.totalCredit"
            />
          </div>
          <div class="bg-white mt-7 pb-6 pt-6 px-6 rounded-[6px] soft-shadow">
            <div v-if="ratingBreakdown" class="w-full space-y-6">
              <h2 class="text-lg font-medium text-gray-700 mb-6">Рейтинг</h2>
              <div class="flex justify-between items-center space-x-2">
                <div class="">
                  <span class="ml-1 text-sm sm:text:lg font-medium text-gray-500 whitespace-nowrap">
                    {{ providerInfo?.ratingCount ?? 0 }} оценки
                  </span>
                </div>
                <StarRating :value="providerInfo?.ratingAverage ?? 0" />
              </div>
              <div class="flex w-full">
                <RatingBreakdownBars :stars="ratingBreakdown?.stars" />
              </div>
            </div>
            <div v-if="ratingBreakdown" class="flex-full mt-9 mb-[9px]">
              <RatingCriteriaList :criteria="ratingBreakdown?.criteria" />
            </div>
          </div>
        </div>
        <div class="w-full max-w-[950px]">
          <h2 class="text-[19px] font-medium text-gray-600 mb-4">Моят профил</h2>
          <div
            v-if="auth.hasBothTypeRoles()"
            class="bg-[#e7f0eb] text-gray-500 px-4 py-3 rounded-[6px] mb-6 flex items-start soft-shadow"
            role="alert"
          >
            <span class="material-icons mr-3">info_outline</span>
            <p class="text-sm">
              В момента сте в профила си на изпълнител. Ако желаете да превключите към клиентския си
              профил, можете да го направите
              <span
                class="font-semibold underline hover:text-gray-800"
                @click="auth.switchToOtherRole()"
              >
                <RouterLink :to="{ name: 'client-profile' }"> оттук </RouterLink>
              </span>
            </p>
          </div>
          <div class="bg-white px-6 py-5 rounded-[6px] soft-shadow mb-8">
            <h3 class="text-[15px] sm:text-base font-medium text-gray-700 mb-2">
              Лична информация
            </h3>
            <ContactComponent :phone="profStore.phoneNumber" />
            <div class="space-y-5 mt-5">
              <div class="flex sm:items-center items-start">
                <Switch
                  :model-value="profStore.showPhoneNumber"
                  @update:modelValue="onToggleShowPhone"
                  class="data-[state=checked]:bg-[#77b393] mr-3 ml-1 mt-1 sm:mt-0"
                />
                <p class="text-[17px] text-[#77b393] font-medium flex items-center">
                  Желая телефонът ми да бъде публикуван в към обяви
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white px-6 py-5 rounded-[6px] soft-shadow mb-8">
            <h3 class="text-[15px] sm:text-base font-medium text-gray-700 mb-4">
              Резервации за консултация/оглед
            </h3>
            <div class="flex justify-between mb-4">
              <div>
                <button class="text-sm font-medium text-gray-600 bg-[#e7f0eb] px-3 py-1 rounded-sm">
                  Всички
                </button>
                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  За потвърждение
                </button>
                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  Предстоящи
                </button>
                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  Приключени
                </button>
                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  Архивирани
                </button>
              </div>
              <p class="ml-auto items-center text-sm font-medium text-[#5ea480] hover:underline">
                Вижте всички
              </p>
            </div>
            <div
              v-for="(reservation, index) in reservations"
              :key="reservation.appointment.serviceBookingId"
              :class="
                isMobile
                  ? [!expanded && index >= 1 ? 'hidden' : '']
                  : [!expanded && index >= 3 ? 'hidden' : '']
              "
            >
              <ReservationComponent :reservation="reservation" />
            </div>
            <div v-if="reservations && reservations.length > 1" class="flex justify-end mt-6">
              <button
                class="w-full text-xs font-normal sm:w-auto px-4 py-2 border-[1px] border-gray-600 text-gray-600 rounded-[4px] hover:bg-gray-700 hover:opacity-80 hover:text-white transition duration-300"
                @click="expanded = !expanded"
              >
                {{ expanded ? 'Скриване на резервациите' : 'Показване на повече резервации' }}
              </button>
            </div>
          </div>
          <div v-if="ads" class="bg-white px-6 py-5 rounded-sm soft-shadow mb-8">
            <h3 class="text-md font-medium text-gray-700 mr-10 mb-4">Моите обяви</h3>
            <div class="flex gap-y-3 justify-start mb-4 items-center">
              <div>
                <button class="text-sm font-medium text-gray-600 bg-[#e7f0eb] px-3 py-1 rounded-sm">
                  Всички
                </button>

                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  Активни
                </button>
                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  Изтекли
                </button>
                <button class="ml-4 text-sm text-gray-600 hover:text-black transition-colors">
                  Архивирани
                </button>
              </div>
              <p class="ml-auto items-center text-sm font-medium text-[#5ea480] hover:underline">
                Вижте всички
              </p>
            </div>
            <div class="relative mt-6 px-1 sm:px-2 rounded-sm">
              <div class="swiper-button-prev swiper-button-prev-cn nav-round galery-rec-prev"></div>
              <div class="swiper-button-next swiper-button-next-cn nav-round galery-rec-next"></div>
              <Swiper
                :modules="[Navigation, Grid]"
                :navigation="{ prevEl: '.galery-rec-prev', nextEl: '.galery-rec-next' }"
                :space-between="18"
                :breakpoints="{
                  0: { slidesPerView: 'auto', spaceBetween: 18, navigation: { enabled: true } },
                }"
                class=""
              >
                <SwiperSlide v-for="ad in ads" :key="ad.adId" class="!w-auto flex-shrink-0">
                  <div class="mb-2">
                    <AdCardSmall :ad="ad" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div class="bg-white sm:px-6 sm:pt-2 sm:pb-6 rounded-[6px] sm:soft-shadow">
            <div class="flex justify-between items-center mt-4">
              <h3 class="text-md font-medium text-gray-700 ml-1">Oценки</h3>
              <p class="text-sm font-medium text-[#5ea480] hover:underline mr-1">Вижте всички</p>
            </div>
            <ProviderClientReview
              v-for="(review, index) in reviews"
              :key="review.userReviewId"
              :review="review"
              class="mt-4"
              :class="[!expandedReviews && index >= 2 ? 'hidden ' : '']"
            />
            <div v-if="reviews && reviews.length > 2" class="flex justify-end mt-5">
              <button
                class="w-full text-xs font-normal sm:w-auto px-4 py-2 border-[1px] border-gray-600 text-gray-600 rounded-[4px] hover:bg-gray-700 hover:opacity-80 hover:text-white transition duration-300"
                @click="expandedReviews = !expandedReviews"
              >
                {{ expandedReviews ? 'Скриване на оценките' : 'Показване на повече оценки' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import {
  updateShowPhoneNumber,
  getProviderAds,
  getProviderConsultations,
  getProviderReviews,
  getRatingBreakdownByUserId,
  getProviderInfo,
} from '@/api/data'
import type {
  ProviderProfileResponce,
  AdCardType,
  ConsultationReservationType,
  ReviewType,
  UserRatingType,
  ProviderProfileType,
} from '@/types/Types'
import { ref, onMounted } from 'vue'
import StarRating from '@/components/ad-view/StarRating.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import RatingBreakdownBars from '@/components/ad-view/RatingBreakdownBars.vue'
import RatingCriteriaList from '@/components/ad-view/RatingCriteriaList.vue'
import ContactComponent from '@/components/profiles/ContactComponent.vue'
import ReservationComponent from '@/components/profiles/ReservationComponent.vue'
import ProviderInfo from '@/components/profiles/ProviderInfo.vue'
import { useProviderStore } from '@/stores/providerProfileStore'
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
const profStore = useProviderStore()
import { useBreakpoint } from '@/composables/useBreakpoint'
import AdCardSmall from '@/components/cards/AdCardSmall.vue'
import ProviderClientReview from '@/components/profiles/ProviderClientReview.vue'
const { isMobile } = useBreakpoint()
const expanded = ref(false)
const expandedReviews = ref(false)

const profile = ref<ProviderProfileResponce>()
const reservations = ref<ConsultationReservationType[]>()
const reviews = ref<ReviewType[]>()
const ratingBreakdown = ref<UserRatingType>()
const providerInfo = ref<ProviderProfileType>()
const ads = ref<AdCardType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function loadAll() {
  loading.value = true
  try {
    const res = await getProviderConsultations()
    reservations.value = res
    console.log('RESERVATIONS:', reservations)

    const rev = await getProviderReviews()
    reviews.value = rev

    const breakdown = await getRatingBreakdownByUserId(auth.user!.userId)
    ratingBreakdown.value = breakdown

    const info = await getProviderInfo()
    providerInfo.value = info

    const adsRes = await getProviderAds()
    ads.value = adsRes

    profStore.initFromProfileInfo(
      providerInfo.value.showPhoneNumber,
      providerInfo.value.userWebsite,
      providerInfo.value.phoneNumber,
    )
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  } finally {
    loading.value = false
  }
  console.log('reservations length:', profile.value?.reservations.length)
}

onMounted(() => {
  loadAll()
})
async function onToggleShowPhone() {
  if (!auth.user?.userId) return
  const newValue = !profStore.showPhoneNumber
  try {
    await updateShowPhoneNumber(newValue)
    profStore.updateShowPhoneNumberUI(newValue)
  } catch (err) {
    console.error(err)
  }
}
</script>
<style scoped>
.swiper-button-prev {
  left: -22px;
}

.swiper-button-next {
  right: -22px;
}
:deep(.nav-round) {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-prev-cn),
:deep(.swiper-button-next-cn) {
  top: 50%;
  transform: translateY(-50%);
  color: #111827 !important;
}

:deep(.swiper-button-prev .swiper-navigation-icon),
:deep(.swiper-button-next .swiper-navigation-icon) {
  width: 16px !important;
  height: 16px !important;
  font-weight: 200;
}

.swiper-button-prev-cal {
  left: -17px;
}

.swiper-button-next-cal {
  right: -17px;
}

:deep(.nav-cal) {
  width: 15px;
  height: 15px;
  border-radius: 9999px;
  background: transparent !important;
  box-shadow: none !important;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-prev-cal),
:deep(.swiper-button-next-cal) {
  top: 14%;
  transform: translateY(-50%);
  color: #111827 !important;
}

:deep(.swiper-button-prev-cal .swiper-navigation-icon),
:deep(.swiper-button-next-cal .swiper-navigation-icon) {
  width: 12px !important;
  height: 12px !important;
  font-weight: 100;
}
</style>
