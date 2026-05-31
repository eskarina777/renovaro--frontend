<template>
  <nav class="w-full flex justify-center items-center my-2 space-x-4">
    <button
      class="px-2"
      :disabled="props.currentPage === 1"
      @click="emit('change', props.currentPage - 1)"
    >
      <ChevronLeft class="text-gray-500" />
    </button>

    <div class="flex gap-2 mx-4">
      <button
        v-for="page in props.totalPages"
        :key="page"
        class="w-[33px] h-[33px] rounded-full"
        :class="page === props.currentPage ? 'bg-gray-200 font-medium' : 'bg-transparent'"
        @click="emit('change', page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="px-2"
      :disabled="props.currentPage === props.totalPages"
      @click="emit('change', props.currentPage + 1)"
    >
      <ChevronRight class="text-gray-500" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (event: 'change', page: number): void
}>()
</script>
