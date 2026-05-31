<template>
  <RouterLink
    :to="{ name: 'subcategory', params: { id: sub.subcategoryId } }"
    custom
    v-slot="{ navigate }"
  >
    <div
      @click="$emit('click', navigate)"
      class="relative w-[150px] h-[150px] bg-white soft-shadow rounded-xl p-[16px] flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300"
    >
      <span class="material-symbols-outlined text-3xl text-gray-500 mb-2">{{
        sub.subcategoryCode
      }}</span>
      <p class="text-sm font-medium text-gray-700">{{ props.sub.subcategoryName }}</p>
      <!-- ---------------- -->
      <div
        v-if="
          sub.subcategoryId === 1 ||
          sub.subcategoryId === 2 ||
          sub.subcategoryId === 17 ||
          sub.subcategoryId === 18 ||
          sub.subcategoryId === 20
        "
        class="group w-8 h-8 -top-3 z-10 absolute -right-3 bg-white/70 shadow-md backdrop-blur text-gray-500 hover:bg-white/90 font-medium flex items-center rounded-[3px] justify-center cursor-pointer"
      >
        <span class="material-icons-outlined text-gray-300 text-[25px]"> star_border </span>
        <div
          class="text-[14px] hidden lg:inline absolute right-0 -bottom-12 whitespace-nowrap rounded-sm bg-white/70 shadow-md backdrop-blur text-gray-500 hover:bg-white/90 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          Примерна подкатегория
        </div>
      </div>
      <!-- ----------------- -->
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Subcategory } from '@/types/Types'
const props = defineProps<{ sub: Subcategory }>()
defineEmits<{
  (e: 'click', navigate: () => void): void
}>()
</script>
