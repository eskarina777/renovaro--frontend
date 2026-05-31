<template>
  <div @click="openRegistrationModal?.()" class="text-gray-600 hover:text-[#77b393] text-base">
    Регистрация
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
const openRegistrationModal = inject<() => void>('openRegistrationModal')
</script>
