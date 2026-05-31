<template>
  <RouterLink :to="{ name: 'category', params: { id: cat.categoryId } }">
    <div
      class="relative block min-w-[260px] max-w-[305px] h-[210px] bg-white p-6 rounded-xl soft-shadow-green text-center hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
    >
      <div
        class="w-[80px] h-[80px] mx-auto mb-5 flex items-center justify-center bg-[#e7f0eb] rounded-sm"
      >
        <span
          class="material-icons material-symbols-outlined text-[#3b6751] opacity-50 leading-none"
          :class="cat.categoryCode === '24/7' ? 'text-[18px] font-bold' : 'text-[40px]'"
        >
          {{ cat.categoryCode }}
        </span>
      </div>
      <h3 class="text-base font-medium text-gray-500">{{ props.cat.categoryName }}</h3>
      <div
        v-if="cat.categoryId === 1 || cat.categoryId === 6"
        class="group w-9 h-9 -top-3 z-10 absolute -right-3 bg-white/70 shadow-md backdrop-blur text-gray-500 hover:bg-white/90 font-medium flex items-center rounded-[3px] justify-center cursor-pointer"
      >
        <span class="material-icons-outlined text-gray-300 text-3xl"> star_border </span>
        <div
          class="text-[14px] hidden lg:inline absolute right-0 -bottom-12 whitespace-nowrap rounded-sm bg-white/70 shadow-md backdrop-blur text-gray-500 hover:bg-white/90 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          Примерна категория
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Category } from '@/types/Types'
const props = defineProps<{ cat: Category }>()
</script>
