<template>
  <div class="text-sm text-gray-500 relative">
    <RouterLink
      v-if="category"
      :to="{ name: 'category', params: { id: category.categoryId } }"
      class="group hover:text-[#77b393]"
    >
      <span
        class="material-symbols-outlined align-middle text-xl text-gray-500 mr-1 relative group-hover:text-[#77b393]"
      >
        {{ category?.categoryCode }}</span
      >
      <span class="text-gray-600 text-[18px] align-middle mr-2 group-hover:text-[#77b393]">
        {{ category?.categoryName }}
      </span></RouterLink
    >
    <RouterLink
      v-if="subcategory"
      :to="{ name: 'subcategory', params: { id: subcategory.subcategoryId } }"
      class="group"
    >
      <span v-if="category !== null && subcategory !== null">/</span>
      <span class="whitespace-nowrap"
        ><span
          class="material-symbols-outlined align-middle text-xl text-gray-500 sm:ml-2 mr-1 mb-1 group-hover:text-[#77b393]"
        >
          {{ subcategory?.subcategoryCode }}
        </span>
        <span class="text-gray-700 text-[18px] align-middle group-hover:text-[#77b393]">
          {{ subcategory?.subcategoryName }}
        </span></span
      ></RouterLink
    >
  </div>
</template>
<script setup lang="ts">
import type { Category, Subcategory } from '@/types/Types'
defineProps<{
  category: Category | null
  subcategory: Subcategory | null
}>()
</script>
