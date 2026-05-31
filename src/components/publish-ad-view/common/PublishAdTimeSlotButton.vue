<template>
  <div class="relative text-xs group w-full mb-1">
    <button
      v-if="timeSlot.timeSlotStatusCode === 'RESERVED'"
      class="w-full h-[32px] bg-gray-100 text-xs sm:text-[14px] font-normal py-1 border border-gray-300 rounded-[4px] text-gray-300 pointer-events-none"
    >
      {{ timeSlot.startTimeLabel }}
    </button>
    <button
      v-if="timeSlot.timeSlotStatusCode === 'TRANSPORT'"
      class="w-full h-[32px] bg-gray-200 text-xs sm:text-[14px] font-normal py-1 border border-gray-300 rounded-[4px] text-gray-300 pointer-events-none"
    >
      {{ timeSlot.startTimeLabel }}
    </button>

    <button
      @click="onClick"
      v-if="timeSlot.timeSlotStatusCode === null"
      class="w-full h-[32px] text-xs sm:text-[14px] font-medium py-1 border-[2px] border-[#77b393] rounded-[4px] text-[#77b393] hover:text-gray-500 transition duration-300"
      :class="
        currentStatusType === 'availableCurrentAd'
          ? ' hover:bg-[#abcbbe] border-[2px] hover:border-[#abcbbe]'
          : 'hover:bg-gray-300 hover:border-[1px] hover:border-gray-400'
      "
    >
      {{ props.timeSlot.startTimeLabel }}
    </button>
    <button
      @click="onClick"
      v-if="timeSlot.timeSlotStatusCode === 'AVAILABLE'"
      class="w-full h-[32px] bg-[#dcebe3] text-xs sm:text-[14px] font-normal py-1 border border-gray-400 rounded-[4px] text-gray-500 hover:bg-[#abcbbe] hover:border-[#abcbbe] hover:text-gray-500 transition duration-300"
      :class="currentStatusType === 'transportCurrentAd' ? ' pointer-events-none' : ''"
    >
      {{ timeSlot.startTimeLabel }}
    </button>
    <button
      @click="onClick"
      v-if="timeSlot.timeSlotStatusCode === 'availableCurrentAd'"
      class="w-full h-[32px] text-xs sm:text-[14px] bg-[#abcbbe] font-normal py-1 border border-gray-400 rounded-[4px] text-gray-500"
      :class="currentStatusType === 'transportCurrentAd' ? ' pointer-events-none' : ''"
    >
      {{ props.timeSlot.startTimeLabel }}
    </button>
    <button
      @click="onClick"
      v-if="timeSlot.timeSlotStatusCode === 'transportCurrentAd'"
      class="text-xs sm:text-[14px] w-full h-[32px] bg-[#D1D5DB] text-[14px] font-normal py-1 border border-gray-400 rounded-[4px] text-gray-500"
      :class="currentStatusType === 'availableCurrentAd' ? ' pointer-events-none' : ''"
    >
      {{ props.timeSlot.startTimeLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { WorkingSlot, CurrentStatusType } from '@/stores/calendarStore'
import { useUserCalendarStore } from '@/stores/calendarStore'
import type { Ref } from 'vue'
import { inject } from 'vue'
const currentStatusType = inject<Ref<CurrentStatusType>>('currentStatusType')!
const store = useUserCalendarStore()

function onClick() {
  store.toggleSlot(props.date, props.timeSlot.systemTimeSlotId, currentStatusType.value)
}
const props = defineProps<{
  timeSlot: WorkingSlot
  date: string
}>()
</script>
