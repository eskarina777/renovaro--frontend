<template>
  <div class="w-full h-full min-h-[289px]">
    <p class="text-xs text-center" :class="[props.isSelected ? 'text-[#abcbbe]' : 'text-gray-500']">
      {{ getBgWeekday(props.day.date) }}
    </p>
    <p
      class="font-medium text-xs mt-[3px] sm:text-[16px] text-center"
      :class="[props.isSelected ? 'text-[#abcbbe]' : 'text-gray-500']"
    >
      {{ formatBgDate(day.date) }}
    </p>
    <div class="relative mt-3 text-xs group w-full mb-1.5">
      <PublishAdTimeSlotButton
        v-for="(timeSlot, index) in day.timeSlots"
        :key="index"
        :timeSlot="timeSlot"
        :date="day.date"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { WorkingCalendarDay } from '@/stores/calendarStore'
import { getBgWeekday, formatBgDate } from '@/utils/date'
import PublishAdTimeSlotButton from './PublishAdTimeSlotButton.vue'
const props = defineProps<{
  day: WorkingCalendarDay
  isSelected: boolean
}>()
</script>
