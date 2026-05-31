<template>
  <div class="w-full space-y-2">
    <div v-for="star in starRows" :key="star" class="flex items-center justify-between text-sm">
      <span class="w-[65px] whitespace-nowrap mr-2"
        ><span>{{ star }}</span> {{ star === 1 ? 'звезда' : 'звезди' }}
      </span>

      <div class="w-3/5 h-2 rating-bar-bg rounded-full overflow-hidden mr-2">
        <div class="h-2 bg-gray-400 rounded-full" :style="{ width: barWidth(star) + '%' }"></div>
      </div>

      <span class="text-gray-600 w-6 flex justify-end"> ({{ stars[star] ?? 0 }}) </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  stars: Record<number, number>
}>()

const starRows = [5, 4, 3, 2, 1]

const total = computed(() => starRows.reduce((sum, s) => sum + (props.stars[s] ?? 0), 0))

function barWidth(star: number): number {
  const count = props.stars[star] ?? 0
  if (!total.value) return 0
  return (count / total.value) * 100
}
</script>
