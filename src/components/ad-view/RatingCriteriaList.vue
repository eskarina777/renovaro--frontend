<template>
  <div class="space-y-3">
    <h3 class="text-base font-medium text-gray-700 mb-4 whitespace-nowrap">Разбивка на оценките</h3>

    <div
      v-for="item in props.criteria"
      :key="item.label"
      class="flex justify-between items-center text-sm"
    >
      <span>{{ item.label }}</span>

      <div class="flex items-center">
        <span class="material-icons text-[#f9ae53] text-base">star</span>
        <span class="font-semibold text-gray-500 ml-1">
          {{ item.avg.toFixed(1) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RatingCriteria } from '@/types/Types'

const props = defineProps<{
  criteria: RatingCriteria[]
}>()
</script>
