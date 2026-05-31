<template>
  <nav class="py-2 bg-white px-[25px] md:px-[115px] 2xl:px-0 2xl:max-w-[1330px] 2xl:mx-auto">
    <div class="flex min-[1150px]:flex-row flex-col gap-y-3">
      <div class="relative max-w-[875px]">
        <div class="swiper-button-prev nav-round gallery-stepper-prev"></div>
        <div class="swiper-button-next nav-round gallery-stepper-next"></div>
        <Swiper
          :modules="[Navigation, Grid]"
          :navigation="{ prevEl: '.gallery-stepper-prev', nextEl: '.gallery-stepper-next' }"
          :space-between="9"
          :breakpoints="{
            0: { slidesPerView: 'auto', navigation: { enabled: true } },
            1050: { slidesPerView: 'auto', navigation: { enabled: false } },
          }"
          class=""
        >
          <SwiperSlide v-for="step in steps" :key="step.id" class="!w-auto flex-shrink-0">
            <div class="flex items-center">
              <template v-if="isStepSaved[step.id] && currentStep !== step.id">
                <div class="flex items-center">
                  <span class="material-icons text-[28px] text-[#77b393] mr-1"> check_circle </span>
                  <span class="text-[#77b393] text-sm">
                    {{ step.label }}
                  </span>
                </div>
              </template>

              <template v-else-if="currentStep === step.id">
                <span
                  class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#77b393] text-white text-sm mr-1"
                >
                  {{ step.id }}
                </span>
                <span class="text-gray-600 font-medium text-sm">
                  {{ step.label }}
                </span>
              </template>
              <template v-else>
                <span
                  class="inline-flex items-center justify-center w-6 h-6 rounded-full text-sm mr-1"
                  :class="
                    step.id === 4 && hasCalendar === false
                      ? 'bg-gray-100 text-gray-300'
                      : 'bg-gray-300 text-gray-700'
                  "
                >
                  {{ step.id }}
                </span>
                <span
                  class="text-sm"
                  :class="
                    step.id === 4 && hasCalendar === false ? 'text-gray-300' : 'text-gray-500'
                  "
                >
                  {{ step.label }}
                </span>
              </template>

              <span
                class="material-icons flex items-center text-lg mx-1"
                :class="step.id !== steps.length ? ' mx-1 text-gray-400' : 'text-transparent mx-2'"
              >
                chevron_right
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="flex w-full justify-end">
        <button
          class="text-xs text-gray-600 border border-gray-400 rounded-sm py-1 px-2 hover:text-white hover:bg-gray-700"
          @click="onSaveClick"
        >
          Запазете
        </button>
      </div>
    </div>
  </nav>
  <div class="w-full border-t border-gray-200"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePublishAdStore } from '@/stores/publishAdStore'
import { bus } from '@/events/bus'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
const publishAdStore = usePublishAdStore()
const { currentStep, isStepSaved, hasCalendar } = storeToRefs(publishAdStore)

const steps = [
  { id: 1, label: 'Продължителност' },
  { id: 2, label: 'Общ преглед' },
  { id: 3, label: 'Обхват' },
  { id: 4, label: 'Календар' },
  { id: 5, label: 'Галерия' },
  { id: 6, label: 'Публикация' },
]
function onSaveClick() {
  bus.emit('save-current-state-event')
}
</script>
<style scoped>
.swiper-button-prev {
  left: -18px;
}

.swiper-button-next {
  right: -18px;
}

:deep(.nav-round) {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: transparent !important;
  box-shadow: none !important;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  top: auto !important;
  bottom: 10px !important;
  transform: none !important;
  color: #111827 !important;
  display: flex !important;
  align-items: center !important;
}

:deep(.swiper-button-prev .swiper-navigation-icon),
:deep(.swiper-button-next .swiper-navigation-icon) {
  width: 10px !important;
  height: 10px !important;
  font-weight: 200;
}
</style>
