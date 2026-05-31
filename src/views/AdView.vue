<template>
  <div v-if="adCore">
    <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto mb-12">
      <div class="mb-6 mt-6 text-sm text-gray-500">
        <AdSubgategoryPath :category="adCore.category" :subcategory="adCore.subcategory" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div
          class="order-2 lg:order-1 2xl:max-w-1/2 w-full bg-white sm:p-6 rounded-md sm:soft-shadow"
        >
          <AdDetails :ad="adCore" />
          <div v-if="ads && ads.length > 0">
            <h1 class="text-lg font-medium text-gray-900 mt-12">Препоръчано за вас</h1>

            <div class="relative mt-8 px-2">
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
          <div v-if="ratingBreakdown">
            <RatingBreakdown
              :userRating="ratingBreakdown"
              :ratingCount="adCore.userProfile.ratingCount"
              :ratingAverage="adCore.userProfile.ratingAverage"
            />
          </div>
          <div v-if="reviews">
            <FilterReview class="mt-8" />
            <ClientReview
              v-for="(review, index) in reviews"
              :key="review.userReviewId"
              :review="review"
              :userProfile="adCore.userProfile"
              class="mt-8"
              :class="[!expanded && index >= 3 ? 'hidden ' : '']"
            />
            <div v-if="reviews.length > 3" class="flex justify-end mt-6">
              <button
                class="w-full text-xs font-normal sm:w-auto px-4 py-2 border-[1px] border-gray-600 text-gray-600 rounded-[4px] hover:bg-gray-700 hover:opacity-80 hover:text-white transition duration-300"
                @click="expanded = !expanded"
              >
                {{ expanded ? 'Скриване на оценките' : 'Показване на повече оценки' }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="order-1 lg:order-2 w-full 2xl:max-w-1/2 bg-white rounded-md sm:soft-shadow"
          :class="adCore.serviceTypeCode === 'FREELANCE' ? '' : 'p-1 sm:p-6'"
        >
          <ConsutationPanel
            v-if="
              adCore.serviceTypeCode === 'LOCAL_FLEX' || adCore.serviceTypeCode === 'LOCAL_FIXED'
            "
            :serviceTypeCode="adCore.serviceTypeCode"
            :userProfile="adCore.userProfile"
            :city="adCore.adDetails.city"
            :consultation="consultation"
            :adCalendar="adCalendar"
            :importantInfo="inportantInfo"
          />
          <FreelacePackagePanel
            v-if="packages && adCore.serviceTypeCode === 'FREELANCE'"
            :packages="packages"
            :pricingUnitLabel="adCore.adDetails.pricingUnit"
            :providerId="adCore.userProfile.userId"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    Page not found
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import {
  getRecommendedAds,
  getAdDetailsById,
  getRatingBreakdownByUserId,
  getReviewsByUserId,
  getConsutationOptionsByAdId,
  getFreelancePackagesByAdId,
} from '@/api/data'
import type {
  AdCardType,
  AdDetailedsResponse,
  UserRatingType,
  ReviewType,
  ConsultationType,
  CalendarDay,
  FreelancePackageResponce,
} from '@/types/Types'
import { ref, onMounted, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import AdCardSmall from '@/components/cards/AdCardSmall.vue'
import ClientReview from '@/components/profiles/ClientReview.vue'
import FilterReview from '@/components/ad-view/FilterReview.vue'
import AdSubgategoryPath from '@/components/publish-ad-view/common/AdSubgategoryPath.vue'
import AdDetails from '@/components/ad-view/AdDetails.vue'
import RatingBreakdown from '@/components/ad-view/RatingBreakdown.vue'
import ConsutationPanel from '@/components/ad-view/ConsutationPanel.vue'
import FreelacePackagePanel from '@/components/ad-view/FreelacePackagePanel.vue'
const expanded = ref(false)
const route = useRoute()

const adCore = ref<AdDetailedsResponse>()
const ratingBreakdown = ref<UserRatingType>()
const ads = ref<AdCardType[]>()
const reviews = ref<ReviewType[]>()
const consultation = ref<ConsultationType>()
const adCalendar = ref<CalendarDay[]>()
const inportantInfo = ref<string>()
const packages = ref<FreelancePackageResponce>()

const loading = ref(true)
const error = ref<string | null>(null)

async function loadAll(id: number) {
  loading.value = true
  try {
    const adDet = await getAdDetailsById(id)
    adCore.value = adDet
    const recAds = await getRecommendedAds(adCore.value.subcategory.subcategoryId, id)
    ads.value = recAds
    if (adCore.value.serviceTypeCode === 'LOCAL_FLEX') {
      const con = await getConsutationOptionsByAdId(id)
      consultation.value = con.consultation
      adCalendar.value = con.adCalendar
      inportantInfo.value = con.inportantInfo
    } else if (adCore.value.serviceTypeCode === 'FREELANCE') {
      const pack = await getFreelancePackagesByAdId(id)
      packages.value = pack
    }

    if (adCore.value.userProfile.ratingCount > 0) {
      const breakdown = await getRatingBreakdownByUserId(adCore.value.userProfile.userId)
      ratingBreakdown.value = breakdown
      const rev = await getReviewsByUserId(adCore.value.userProfile.userId)
      reviews.value = rev
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  loadAll(Number(route.params.id))
})
watch(
  () => route.params.id,
  (newId) => {
    if (newId != null) {
      loadAll(Number(newId))
    }
  },
)
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
