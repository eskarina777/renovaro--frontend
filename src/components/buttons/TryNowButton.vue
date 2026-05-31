<template>
  <button
    v-if="!auth.user"
    @click="openRegistrationModal?.()"
    class="bg-gray-800 text-white font-medium py-3 px-6 rounded-md hover:bg-gray-700 transition duration-300"
  >
    Опитайте сега
  </button>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
const openRegistrationModal = inject<() => void>('openRegistrationModal')
</script>
