<template>
  <div class="relative flex flex-col xl:flex-row gap-8">
    <div class="flex flex-col items-start text-left">
      <span class="material-symbols-outlined text-4xl text-gray-400 mb-2">draft</span>
      <div>
        <p class="text-md text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua ut enim ad minim
        </p>
      </div>
    </div>
    <div class="flex flex-col items-start text-left">
      <span class="material-icons text-4xl text-gray-400 mb-2 mr-4">calendar_month</span>
      <div>
        <p class="text-md text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua ut enim ad minim
        </p>
      </div>
    </div>

    <div :class="['flex flex-col items-start text-left', expanded ? 'flex' : 'hidden sm:flex']">
      <span class="material-icons text-4xl text-[#abcbbe] mb-2">handshake</span>
      <div>
        <p class="text-md text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua ut enim ad minim
        </p>
      </div>
    </div>
    <div :class="['flex flex-col items-start text-left', expanded ? 'flex' : 'hidden sm:flex']">
      <span class="material-symbols-outlined text-4xl text-[#fbc98c] mb-2">Quiz</span>
      <div>
        <p class="text-md text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua ut enim ad minim
        </p>
      </div>
    </div>
  </div>

  <div class="border-t w-full sm:hidden"></div>
  <div class="flex justify-center sm:hidden mt-6 mb-8">
    <ToggleExpandButton :expanded="expanded" @toggle="expanded = !expanded" />
  </div>
</template>

<script setup lang="ts">
import ToggleExpandButton from '@/components/buttons/ToggleExpandButton.vue'
import { ref } from 'vue'
const expanded = ref(false)
</script>
