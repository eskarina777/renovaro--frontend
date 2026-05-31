<template>
  <div v-if="consultationId">
    <div class="w-full h-full min-h-[289px]">
      <p class="text-xs text-center text-gray-500">{{ getBgWeekday(props.day.date) }}</p>
      <p class="font-medium text-xs mt-[3px] sm:text-[16px] text-center text-gray-600">
        {{ formatBgDate(day.date) }}
      </p>
      <div
        v-if="day?.timeSlots && day.timeSlots.length > 0"
        class="relative mt-3 text-xs group w-full mb-1"
      >
        <TimeSlotButton
          v-for="(timeSlot, index) in day.timeSlots"
          :key="timeSlot.serviceTimeSlotId"
          :timeSlot="timeSlot"
          :date="props.day.date"
          :class="[!expanded && index >= 6 ? 'hidden' : '']"
        />
        <div v-if="day.timeSlots.length > 6" class="flex justify-center mt-1.5">
          <ToggleShowMoreButton :expanded="expanded" @toggle="expanded = !expanded" />
        </div>
      </div>
      <div
        v-else
        class="w-full h-auto mt-3 min-h-[253px] bg-gray-100 border border-gray-200 rounded-sm"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CalendarDay } from '@/types/Types'
import { getBgWeekday, formatBgDate } from '@/utils/date'
import TimeSlotButton from './TimeSlotButton.vue'
import { ref } from 'vue'
import ToggleShowMoreButton from './ToggleShowMoreButton.vue'
const expanded = ref(false)
const props = defineProps<{
  day: CalendarDay
  consultationId: number | null
}>()
console.log('date: ', props.day.date)
</script>
