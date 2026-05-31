<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div
        class="bg-white mx-4 rounded-lg px-0 pt-10 pb-6 sm:py-5 sm:pt-8 sm:pb-8 sm:pl-8 sm:pr-8 shadow-xl max-w-[360px] max-h-[685px] md:w-auto md:max-w-[940px] relative"
      >
        <ModalCloseButton @click="emit('close')" />
        <div class="text-center mb-3">
          <h2 class="text-base sm:text-lg font-medium text-gray-500 mb-1">
            Добавете адрес и телефон, за да направите резервацията
          </h2>
          <p class="text-gray-400 text-xs hidden sm:inline">
            Телефонът и адресът Ви ще бъдат споделяни само с изпълнителите, при които сте
            резервирали консултация.
          </p>
        </div>
        <div class="mt-5 w-full overflow-y-auto h-[455px] custom-scroll">
          <form @submit.prevent="onSubmit" class="px-2">
            <ReservationDetailsHTML />
          </form>
        </div>
        <div class="mt-6 sm:mt-4 flex justify-end mr-[10px]">
          <button
            class="bg-[#3b6751] text-base opacity-50 hover:bg-white border border-[#3b6751] hover:text-[#3b6751] text-white font-medium py-2 px-3 rounded-sm focus:outline-none shadow-md"
            type="submit"
            :disabled="isSubmitting"
          >
            <Loader2 v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
            <p>Запазете</p>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import ModalCloseButton from '../buttons/ModalCloseButton.vue'
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import type { TimeSlotType } from '@/types/Types'
import ReservationDetailsHTML from './ReservationDetailsHTML.vue'
const emit = defineEmits(['close'])

const props = defineProps<{
  timeSlot: TimeSlotType | null
  date: string | null
}>()
async function onSubmit() {}
const isSubmitting = ref(false)
</script>
<style scope>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #c8c8c8;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}
</style>
