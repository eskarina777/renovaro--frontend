<template>
  <button
    @click="openLoginModal?.()"
    class="px-4 rounded-md hover:bg-gray-700 hover:border-gray-700 hover:text-[#FFFFFF] transition-colors duration-300 py-1 h-8 text-sm border-2 border-black"
  >
    Вход
  </button>
</template>
<script setup lang="ts">
import { inject } from 'vue'
const openLoginModal = inject<() => void>('openLoginModal', () => {})
</script>
