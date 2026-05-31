<template>
  <div class="flex flex-col gap-3 sm:gap-4 relative">
    <div class="swiper-button-prev nav-round gallery1-prev"></div>
    <div class="swiper-button-next nav-round gallery1-next"></div>
    <Swiper
      :modules="swiperModules"
      :slides-per-view="1"
      :navigation="{
        prevEl: '.gallery1-prev ',
        nextEl: '.gallery1-next ',
      }"
      @swiper="onMainSwiper"
      @slideChange="onSlideChange"
      class="w-full rounded-md overflow-hidden"
    >
      <SwiperSlide v-for="(img, index) in images" :key="index">
        <img
          :src="img.adImageUrl"
          :alt="''"
          class="w-full h-[210px] sm:h-[340px] object-cover opacity-80"
        />
      </SwiperSlide>
    </Swiper>

    <div v-if="props.images.length > 1" class="flex gap-2 sm:gap-3 mt-1">
      <button
        v-for="(img, index) in images"
        :key="'thumb-' + index"
        type="button"
        @click="goTo(index)"
        class="rounded-md overflow-hidden border-2 transition w-[59px] h-[38px] sm:w-[120px] sm:h-[68px]"
        :class="
          index === activeIndex ? 'border-gray-400 opacity-80' : 'border-transparent opacity-50'
        "
      >
        <img :src="img.adImageUrl" :alt="''" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AdImageUrlType } from '@/types/Types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps<{
  images: AdImageUrlType[]
}>()

const swiperModules = [Navigation]

const mainSwiper = ref<SwiperType | null>(null)
const activeIndex = ref(0)

function onMainSwiper(swiper: SwiperType) {
  mainSwiper.value = swiper
}

function onSlideChange(swiper: SwiperType) {
  activeIndex.value = swiper.realIndex ?? swiper.activeIndex
}

function goTo(index: number) {
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index)
    activeIndex.value = index
  }
}
</script>
<style scoped>
.swiper-button-prev {
  left: -19px;
}

.swiper-button-next {
  right: -19px;
}
:deep(.nav-round) {
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  top: 50%;
  transform: translateY(-75%);
  color: #111827 !important;
}

:deep(.swiper-button-prev .swiper-navigation-icon),
:deep(.swiper-button-next .swiper-navigation-icon) {
  width: 14px !important;
  height: 14px !important;
  font-weight: 200;
}
</style>
