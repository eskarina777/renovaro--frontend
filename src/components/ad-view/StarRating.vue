<template>
  <div class="flex items-center gap-2">
    <div class="flex gap-1">
      <template v-for="star in 5" :key="star">
        <span
          v-if="starType(star) === 'full'"
          class="material-icons"
          :class="['text-[#f9ae53]', starClass]"
        >
          star
        </span>
        <span
          v-else-if="starType(star) === 'half'"
          class="material-icons"
          :class="['text-[#f9ae53]', starClass]"
        >
          star_half
        </span>

        <span v-else class="material-icons" :class="['text-[#f9ae53]', starClass]">
          star_outline
        </span>
      </template>
    </div>

    <span v-if="value > 0" class="ml-1 text-gray-500" :class="valueClass" style="font-weight: 500">
      {{ Number.isInteger(value) ? value : value.toFixed(1) }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number
    starClass?: string
    valueClass?: string
    outerGapClass?: string
    innerGapClass?: string
  }>(),
  {
    starClass: 'text-[18px] sm:text-[22px]',
    valueClass: 'text-[16px]',
    outerGapClass: 'gap-2',
    innerGapClass: 'gap-1',
  },
)
function starType(index: number): 'full' | 'half' | 'empty' {
  const rating = Math.min(5, Math.max(0, props.value))
  const whole = Math.floor(rating)
  const decimal = rating - whole

  let effective = rating
  if (decimal > 0 && decimal <= 0.5) {
    effective = whole + 0.5
  } else if (decimal > 0.5) {
    effective = Math.min(5, whole + 1)
  }

  const fullStars = Math.floor(effective)
  const hasHalf = effective % 1 === 0.5

  if (index <= fullStars) return 'full'
  if (hasHalf && index === fullStars + 1) return 'half'
  return 'empty'
}
</script>
