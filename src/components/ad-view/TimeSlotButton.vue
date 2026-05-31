<template>
  <div class="relative text-xs group w-full mb-1">
    <button
      v-if="timeSlot.timeSlotStatusCode === 'AVAILABLE'"
      @click="
        authStore.user ? openReservationModal?.(props.timeSlot, props.date) : openLoginModal()
      "
      class="w-full h-[32px] text-xs sm:text-[14px] font-medium py-1 border-[2px] border-[#77b393] rounded-[4px] text-[#77b393] hover:bg-[#abcbbe] hover:border-[#abcbbe] hover:text-gray-500 transition duration-300"
    >
      {{ props.timeSlot.startTimeLabel }}
    </button>
    <button
      v-else
      class="w-full h-[32px] bg-gray-100 text-[14px] font-normal py-1 border border-gray-300 rounded-[4px] text-gray-300 pointer-events-none"
    >
      {{ props.timeSlot.startTimeLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { TimeSlotType } from '@/types/Types'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const props = defineProps<{
  timeSlot: TimeSlotType
  date: string
}>()
console.log('date TumeslotButton: ', props.date)
const openReservationModal =
  inject<(timeSlot: TimeSlotType, date: string) => void>('openReservationModal')
const openLoginModal = inject<() => void>('openLoginModal', () => {})
</script>
