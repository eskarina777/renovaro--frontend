<template>
  <button @click="onLogout" class="text-[16px] font-medium text-gray-600">Изход</button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
function onLogout() {
  auth.logout()
  window.location.href = '/'
}
</script>
