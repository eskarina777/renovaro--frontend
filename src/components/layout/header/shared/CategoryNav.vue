<template>
  <div
    v-if="auth.activeRole == null || auth.activeRole == 'CLIENT'"
    class="ml-4 py-2 bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto hidden md:block"
  >
    <div class="relative">
      <div class="swiper-button-prev nav-round gallery-category-prev"></div>
      <div class="swiper-button-next nav-round gallery-category-next"></div>
      <Swiper
        :modules="[Navigation, Grid]"
        :navigation="{ prevEl: '.gallery-category-prev', nextEl: '.gallery-category-next' }"
        :breakpoints="{
          0: { slidesPerView: 'auto', spaceBetween: 16, navigation: { enabled: true } },
          1490: { slidesPerView: 'auto', spaceBetween: 18, navigation: { enabled: false } },
        }"
        class=""
      >
        <SwiperSlide v-for="cat in categories" :key="cat.categoryId" class="!w-auto flex-shrink-0">
          <RouterLink
            class="text-gray-600 text-[15px] hover:text-[#77b393] whitespace-nowrap"
            :to="{ name: 'category', params: { id: cat.categoryId } }"
          >
            {{ cat.categoryName }}
          </RouterLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div
    v-if="auth.activeRole == null || auth.activeRole == 'CLIENT'"
    class="w-full border-b border-gray-200"
  ></div>
</template>
<script setup lang="ts">
import type { Category } from '@/types/Types'
import { ref, onMounted } from 'vue'
import { getCategories } from '@/api/data'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
const loading = ref(true)
const error = ref<string | null>(null)
const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  } finally {
    loading.value = false
  }
})
</script>
<style scoped>
.swiper-button-prev {
  left: -19px;
}

.swiper-button-next {
  right: -15px;
}

:deep(.nav-round) {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: transparent !important;
  box-shadow: none !important;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  top: auto !important;
  bottom: 0 !important;
  transform: none !important;
  color: #111827 !important;
  display: flex !important;
  align-items: center !important;
  bottom: 6px !important;
}

:deep(.swiper-button-prev .swiper-navigation-icon),
:deep(.swiper-button-next .swiper-navigation-icon) {
  width: 10px !important;
  height: 10px !important;
  font-weight: 200;
}
</style>
