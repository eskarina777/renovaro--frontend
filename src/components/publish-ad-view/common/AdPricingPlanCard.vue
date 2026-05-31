<template>
  <div
    class="bg-white rounded-md p-6 flex flex-col min-w-[260px] max-w-[320px] border transition"
    :class="
      selected ? 'border-[#3b6751] bg-[#e7f0eb] shadow-2xl' : 'border-transparent soft-shadow '
    "
  >
    <h3 class="text-lg font-medium text-gray-700">
      {{ plan.planName }}
    </h3>

    <p class="text-[#77b393] text-[18px] mb-6">{{ plan.credits }} кредита</p>

    <button
      class="w-full py-2 rounded-md text-gray-700 hover:bg-gray-700 hover:text-white shadow-md bg-[#e7f0eb] mb-6"
      @click="$emit('select', plan.adPricingPlanId)"
    >
      Изберете
    </button>

    <ul class="text-[14px] text-gray-500 font-normal space-y-[10px]">
      <li v-for="(feature, i) in features" :key="i" class="flex items-start gap-1">
        <span class="material-icons text-sm text-[#77b393]">check</span>
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { AdPricingPlan } from '@/types/Types'
import { adPricingFeatures } from '@/utils/constants'
import { computed } from 'vue'

const props = defineProps<{
  plan: AdPricingPlan
  selected: boolean
}>()

const features = computed(() => {
  const match = adPricingFeatures.find((f) => f.pricingCode === props.plan.planCode)
  return match?.features ?? []
})
</script>
