<template>
  <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-11 sm:pt-6 items-start gap-6">
      <div class="w-full col-span-3 min-w-[330px] sm:px-6 pb-6">
        <div class="flex justify-center sm:justify-start mr-6">
          <Calendar
            v-model="selectedDate"
            :min-value="minValue"
            :max-value="maxValue"
            class="soft-shadow rounded-md"
          />
        </div>
        <div>
          <p class="mt-4 text-sm text-gray-600">
            Избрана дата:
            <span class="font-medium text-[#77b393]"
              >'{{ formatBgDate(selectedDate.toDate(getLocalTimeZone()).toISOString()) }}'</span
            >
          </p>
          <div class="flex items-start mb-5 text-xs text-gray-600 mt-3">
            <span class="material-icons-outlined text-[#abcbbe] text-sm mr-1"> check </span>
            <p class="text-xs text-gray-600">
              Изберете часове за консултация/оглед, сега и/или по-късно ги добавете/променете от
              секция "Моите обяви" в профила си..
            </p>
          </div>
        </div>
        <div class="w-full mt-4">
          <ToggleGroup
            class="gap-0 bg-gray-100"
            variant="outline"
            type="single"
            :modelValue="selectedType"
            @update:modelValue="(value: any) => onToggleUpdate(value)"
          >
            <ToggleGroupItem
              value="availableCurrentAd"
              class="flex-1 px-3 py-4 text-gray-600 border border-gray-300 rounded-l-sm rounded-r-none border-l data-[state=on]:bg-[#abcbbe]"
            >
              <p class="text-sm text-gray-600">консултация</p>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="transportCurrentAd"
              class="flex-1 px-3 py-4 text-gray-600 border border-gray-300 rounded-r-sm rounded-l-none border-l data-[state=on]:bg-gray-300"
            >
              <p class="text-sm text-gray-600">транспорт</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div class="flex items-start gap-2 text-gray-600 mt-6 mb-2">
          <span class="material-icons-outlined text-sm align-middle">info</span>
          <div>
            <p class="font-medium text-sm">Важна информация</p>
          </div>
        </div>
        <div class="flex items-start text-xs text-gray-600 mt-3">
          <span class="material-icons-outlined text-[#abcbbe] text-sm mr-1"> check </span>
          <p class="mb-1 text-xs text-gray-600">
            Чрез превключване на бутоните за консултация/транспорт имате възможност да избирате
            начален час за консултация или време за транспорт до следващ ангажимент в свободните
            времеви интервали.
          </p>
        </div>
        <div class="flex items-start text-xs text-gray-600 mt-1">
          <span class="material-icons-outlined text-[#abcbbe] text-sm mr-1"> check </span>
          <p class="mb-1 text-xs text-gray-600">
            Час се избира и добавя към обявата с клик върху желания бутон. При повторен клик той се
            деселектира.
          </p>
        </div>
        <div class="flex items-start text-xs text-gray-600 mt-1">
          <span class="material-icons-outlined text-[#abcbbe] text-sm mr-1"> check </span>
          <p class="mb-3 text-xs text-gray-600">
            Избраното време за транспорт ще бъде отбелязано в текущата обява като запазен час за
            консултация.
          </p>
        </div>
        <CalendarLegend />
      </div>

      <div class="col-span-8 max-w-[1000px] bg-white px-6 rounded-sm soft-shadow">
        <div v-if="days">
          <div class="relative mt-6 mb-4 px-1 sm:px-2 rounded-sm">
            <div class="swiper-button-prev swiper-button-prev-cal nav-cal galery-cal-prev"></div>
            <div class="swiper-button-next swiper-button-next-cal nav-cal galery-cal-next"></div>
            <Swiper
              @swiper="onSwiper"
              :modules="[Navigation, Grid]"
              :navigation="{ prevEl: '.galery-cal-prev', nextEl: '.galery-cal-next' }"
              :breakpoints="{
                0: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 12 },
                640: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 12 },
                1280: { slidesPerView: 7, slidesPerGroup: 7, spaceBetween: 12 },
              }"
            >
              <SwiperSlide v-for="day in days" :key="day.date">
                <div class="mb-2">
                  <PublishAdCalenderDay :day="day" :isSelected="day.date === selectedDateStr" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end mt-12 mb-8 space-y-3 relative">
      <StepperNextButton @click="onNext" />
      <StepperBackButton @click="onBack" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import StepperNextButton from './common/StepperNextButton.vue'
import StepperBackButton from './common/StepperBackButton.vue'
import CalendarLegend from './common/CalendarLegend.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch, provide, nextTick } from 'vue'
import type { Ref } from 'vue'
import { usePublishAdStore } from '@/stores/publishAdStore'
import type { CurrentStatusType } from '@/stores/calendarStore'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Calendar } from '@/components/ui/calendar'
import type { DateValue } from '@internationalized/date'
import { fromDate, today, getLocalTimeZone, parseDate } from '@internationalized/date'
import { formatBgDate } from '@/utils/date'
import type { Swiper as SwiperInstance } from 'swiper'
import { useUserCalendarStore } from '@/stores/calendarStore'
import PublishAdCalenderDay from './common/PublishAdCalenderDay.vue'

const publishAdStore = usePublishAdStore()
const { currentStep } = storeToRefs(publishAdStore)
const userCalendarStore = useUserCalendarStore()
const { days } = storeToRefs(userCalendarStore)

const selectedDate = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>
const minValue: DateValue = today(getLocalTimeZone())
const maxValue: DateValue = publishAdStore.adExpirationDate
  ? parseDate(publishAdStore.adExpirationDate.toISOString().slice(0, 10))
  : minValue

const selectedType = ref<CurrentStatusType>('availableCurrentAd')
const onToggleUpdate = (value: CurrentStatusType | null) => {
  if (!value) return
  selectedType.value = value
}
provide('currentStatusType', selectedType)

const loading = ref(true)
const error = ref<string | null>(null)
watch(days, async () => {
  await nextTick()
  swiperRef.value?.update()
})

async function loadAll() {
  loading.value = true
  try {
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
  loadAll()
})

onMounted(() => {
  userCalendarStore.loadUserCalendar()
})

function onNext() {
  publishAdStore.goToStep(currentStep.value + 1)
}
function onBack() {
  publishAdStore.goToStep(currentStep.value - 1)
}

const swiperRef = ref<SwiperInstance | null>(null)
function onSwiper(swiper: SwiperInstance) {
  swiperRef.value = swiper
}

const selectedDateStr = ref('')
watch(selectedDate, (newVal) => {
  if (!newVal || !days.value?.length || !swiperRef.value) return

  const target = String(newVal).slice(0, 10)
  selectedDateStr.value = target

  const index = days.value.findIndex((day) => day.date === target)
  if (index >= 0) {
    swiperRef.value.slideTo(index)
  } else {
    swiperRef.value.slideTo(0)
  }
})
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
  top: 4%;
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
