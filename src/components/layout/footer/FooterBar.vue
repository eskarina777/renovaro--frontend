<template>
  <footer
    class="py-8 bg-white px-[35px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto border-t border-gray-200"
  >
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-y-4">
      <RouterLink
        class="text-lg sm:text-xl font-bold text-gray-600 whitespace-nowrap"
        :to="{ name: 'home' }"
      >
        RENOVARO
      </RouterLink>

      <div class="flex items-center sm:space-x-6 space-x-4">
        <a class="text-gray-500 hover:text-black relative top-[3px]" href="#">
          <i class="fab fa-tiktok"></i>
        </a>
        <a class="text-gray-500 hover:text-black relative top-[3px]" href="#">
          <i class="fab fa-instagram"></i>
        </a>
        <a
          class="text-white bg-gray-500 hover:text-black rounded-[2px] w-4 h-4 flex items-center justify-center mr-2"
          href="#"
        >
          <i class="fab fa-linkedin-in text-xs"></i>
        </a>
        <a
          class="text-white bg-gray-500 hover:text-black rounded-full w-5 h-5 flex items-center justify-center mr-2"
          href="#"
        >
          <i class="fab fa-facebook-f text-xs"></i>
        </a>
        <a
          class="text-white bg-gray-500 hover:text-black rounded-full w-5 h-5 flex items-center justify-center"
          href="#"
        >
          <i class="fab fa-pinterest-p text-xs"></i>
        </a>
        <LanguageToggle />
        <div class="text-gray-600 text-sm whitespace-nowrap font-medium">€ EUR</div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import LanguageToggle from '../header/shared/LanguageToggle.vue'
</script>
