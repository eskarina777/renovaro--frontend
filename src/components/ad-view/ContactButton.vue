<template>
  <button
    class="text-base font-normal px-10 py-2 border-[1px] border-gray-600 text-gray-600 rounded-[6px] hover:bg-gray-700 hover:opacity-80 hover:text-white transition duration-300"
    @click="authStore.user ? openContactModal?.(props.providerId) : openLoginModal()"
  >
    Свържете се
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const props = defineProps<{
  providerId: number
}>()
const openContactModal = inject('openContactModal') as ((providerId: number) => void) | undefined
const openLoginModal = inject<() => void>('openLoginModal', () => {})
</script>
