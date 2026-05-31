<template>
  <h2
    class="flex w-full md:justify-end font-medium text-gray-700 whitespace-nowrap"
    :class="pricingUnit == 'по договаряне' ? 'text-lg' : 'text-[20px]'"
  >
    {{ priceMin }}
    <span v-if="priceMin !== null && priceMax !== null" class="mr-1 ml-1"> - </span>
    {{ priceMax }}
    <span
      v-if="
        (priceMin !== null && priceMin !== undefined) ||
        (priceMax !== null && priceMax !== undefined)
      "
      class="mr-0.5 ml-1"
    >
      €
    </span>
    <span
      v-if="pricingUnit !== 'по договаряне' && pricingUnit !== null && pricingUnit !== undefined"
      class="mr-0.5 ml-0.5"
      >/</span
    >
    {{ pricingUnit }}
  </h2>
</template>
<script setup lang="ts">
defineProps<{
  priceMin: number | null | undefined
  priceMax: number | null | undefined
  pricingUnit: string | null | undefined
}>()
</script>
