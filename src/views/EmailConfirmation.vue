<template>
  <div
    class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto pt-8 pb-[395px]"
  >
    <h1 class="text-lg font-medium text-gray-800 mb-3">Моля потвърдете Вашият имейл адрес</h1>

    <p class="text-base text-gray-600">
      На посочения от Вас имейл адрес е изпратен линк за потвърждение.
    </p>
    <div class="flex flex-row items-center mt-6">
      <p class="text-base text-gray-600 mr-2">
        Моля, потвърдете имейла си след което може да осъществите достъп до системата
      </p>

      <button class="underline text-[#3b6751]" @click="openLogin">от тук</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

function openLogin() {
  auth.openLoginModal()
}
</script>
