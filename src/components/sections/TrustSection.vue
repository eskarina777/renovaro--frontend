<template>
  <div v-if="!auth.user" class="bg-[#e7f0eb] rounded-lg p-16">
    <div class="container mx-auto text-center">
      <h1 class="text-xl sm:text-3xl md:text-4xl font-medium text-[#3b6751] mb-8">
        <span class="inline sm:hidden">Където</span>
        <span class="hidden sm:inline">Тук</span>
        професионализмът среща доверието
      </h1>

      <button
        @click="openRegistrationModal?.()"
        class="bg-[#e7f0eb] text-[#3b6751] border border-[#3b6751] font-medium py-3 px-6 rounded-md hover:bg-[#3b6751] hover:text-[#cfe4d9] transition duration-200"
      >
        Присъединете се
      </button>
    </div>
  </div>
  <RegistrationModal v-if="showRegistrationModal" @close="showRegistrationModal = false" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import RegistrationModal from '../auth/RegistrationModal.vue'
const showRegistrationModal = ref(false)
const auth = useAuthStore()
const openRegistrationModal = () => {
  showRegistrationModal.value = true
}
</script>
