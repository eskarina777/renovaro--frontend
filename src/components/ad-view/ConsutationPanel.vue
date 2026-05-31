<template>
  <div class="flex sm:my-2 mx-1">
    <h2 class="text-lg font-medium text-gray-600 mb-5">
      Запазете час
      <span class="hidden md:inline text-base font-normal"
        >{{ serviceTypeCode === 'LOCAL_FIXED' ? 'услуга' : 'за консултация/оглед' }}
      </span>
    </h2>
    <h2 class="text-xl font-medium text-gray-600 ml-auto mr-3">
      {{ consultation?.consultationPriceMin }}
      <span
        v-if="consultation?.consultationPriceMin && consultation?.consultationPriceMax != null"
        class="mr-1 ml-1"
      >
        -
      </span>
      {{ consultation?.consultationPriceMax
      }}<span v-if="consultation?.consultationPriceMin != null" class="mr-0.5 ml-1"> € </span>
    </h2>
  </div>
  <div class="mb-4 mx-1">
    <div class="grid grid-cols-[auto_1fr] gap-x-1">
      <div
        class="col-span-1 w-[58px] h-[58px] mr-2 rounded-full flex items-center justify-center bg-[#e7f0eb]"
      >
        <span
          class="material-icons material-icons-outlined text-[25px] text-[#3b6751] opacity-50 leading-none"
          >calendar_month</span
        >
      </div>

      <div div class="col-span-1 items-center">
        <p class="font-medium text-gray-600 mt-1">{{ userProfile.userName }}</p>
        <div class="flex flex-row text-xs text-gray-500">
          <div class="w-full text-sm sm:text-[15px] mt-[3px]">
            <span class="material-icons-outlined text-base align-middle">location_on</span>
            {{ city }}
          </div>
          <div v-if="userProfile.showPhoneNumber" class="flex flex-row justify-end mr-3">
            <p class="text-sm sm:text-[15px] text-gray-500 whitespace-nowrap">
              <span class="material-icons align-middle ml-2 text-sm sm:text-[14px]"
                >phone_iphone</span
              >
              {{ userProfile.phoneNumber }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="consultation" class="flex justify-end mb-2 mr-1">
    <button class="text-xs text-[#3b6751] opacity-60 ml-auto hover:text-gray-400 mr-2">
      <span class="material-icons-outlined text-xs">calendar_today</span>
      Избор на друга дата
    </button>
  </div>
  <div v-if="consultation?.consultationId" class="relative mt-6 px-1 sm:px-2 rounded-sm">
    <div class="swiper-button-prev swiper-button-prev-cal nav-cal galery-cal-prev"></div>
    <div class="swiper-button-next swiper-button-next-cal nav-cal galery-cal-next"></div>
    <Swiper
      :modules="[Navigation, Grid]"
      :navigation="{ prevEl: '.galery-cal-prev', nextEl: '.galery-cal-next' }"
      :breakpoints="{
        0: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 12 },
        640: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 12 },
      }"
    >
      <SwiperSlide v-for="day in adCalendar" :key="day.date">
        <div v-if="consultation?.consultationId" class="mb-2">
          <AdCalendarDay :day="day" :consultationId="consultation.consultationId" />
        </div>
        <div v-else>
          <NoConsultation />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <div v-if="consultation === null">
    <NoConsultation />
  </div>
  <div
    v-if="consultation !== null"
    class="bg-[#e7f0eb] text-gray-500 rounded-sm p-3 text-sm mb-4 mx-1 mt-5"
  >
    <div class="flex items-start gap-2">
      <span class="material-icons-outlined text-[15px] mt-1">info</span>
      <div>
        <p class="font-medium text-[13px] mb-0.5">Важна информация</p>
        <p v-if="importantInfo" class="font-normal text-xs">
          {{ importantInfo }}
        </p>
        <p v-else class="font-normal text-xs">
          Поради естеството на работата е възможно изоставане в графика – предварително благодарим
          за разбирането! Очаквана продължителност на консултацията 15-60 мин.
        </p>
      </div>
    </div>
  </div>
  <div class="relative text-xs group w-full mt-8 px-0 sm:px-2 flex justify-end">
    <ContactButton :providerId="props.userProfile.userId" />
  </div>

  <ReservationModal
    v-if="showReservationModal"
    :timeSlot="selectedSlot"
    :date="selectedDate"
    @close="showReservationModal = false"
  />
  <ContactModal
    v-if="showContactModal"
    :providerId="userProfile.userId"
    @close="showContactModal = false"
  />
  <LoginModal v-if="auth.showLoginModal" @close="auth.closeLoginModal" />
</template>
<script setup lang="ts">
import type { ServiceTypeCode, ConsultationType, CalendarDay, UserProfileType } from '@/types/Types'
import { ref, provide } from 'vue'
import ReservationModal from '@/components/ad-view/ReservationModal.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import AdCalendarDay from '@/components/ad-view/AdCalendarDay.vue'
import type { TimeSlotType } from '@/types/Types'
import ContactModal from '@/components/ad-view/ContactModal.vue'
import ContactButton from '@/components/ad-view/ContactButton.vue'
import NoConsultation from '@/components/ad-view/NoConsultation.vue'
import { useAuthStore } from '@/stores/authStore'
import LoginModal from '../auth/LoginModal.vue'

const auth = useAuthStore()
const props = defineProps<{
  serviceTypeCode: ServiceTypeCode
  userProfile: UserProfileType
  city: string
  consultation?: ConsultationType
  adCalendar?: CalendarDay[]
  importantInfo: string | undefined
}>()

const showReservationModal = ref(false)
const selectedSlot = ref<TimeSlotType | null>(null)
const selectedDate = ref<string | null>(null)

function openReservationModal(timeSlot: TimeSlotType, date: string) {
  selectedSlot.value = timeSlot
  selectedDate.value = date
  showReservationModal.value = true
}
provide('openContactModal', openContactModal)

const showContactModal = ref(false)

function openContactModal() {
  showContactModal.value = true
}
provide('openReservationModal', openReservationModal)

function openLoginModal() {
  auth.openLoginModal()
}
provide('openLoginModal', openLoginModal)
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
