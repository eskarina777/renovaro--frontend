<template>
  <div class="relative">
    <div
      v-if="ad.adStatus === 'EXPIRED'"
      class="absolute top-12 left-0 right-0 z-20 flex flex-col items-center justify-center text-center"
    >
      <p class="text-[15px] font-semibold mb-1 text-gray-500">Обявата е изтекла</p>
      <button class="text-[15px] underline text-gray-700">Публикувайте отново</button>
    </div>
  </div>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md w-[250px] h-[350px] pb-4 relative"
    :class="ad.adStatus === 'EXPIRED' ? 'opacity-30 border' : ''"
  >
    <div class="relative">
      <RouterLink :to="{ name: 'ad', params: { id: ad.adId } }">
        <img class="w-full h-[165px] object-cover opacity-70" :src="ad.adImageUrl"
      /></RouterLink>
    </div>
    <div class="px-[16px] pt-[12px] pb-2">
      <div class="flex items-center mb-3">
        <img class="w-8 h-8 rounded-full mr-2" :src="ad.profileImageUrl" />

        <span class="text-md font-medium text-[14px] text-gray-700">{{ ad.userName }}</span>
        <span
          class="material-icons text-gray-500 ml-auto"
          :class="
            auth.user?.userRole?.find((r) => r !== 'CLIENT') === 'COMPANY'
              ? 'text-md'
              : 'text-[18px]'
          "
        >
          {{
            auth.user?.userRole?.find((r) => r !== 'CLIENT') === 'COMPANY' ? 'groups' : 'person'
          }}</span
        >

        <span v-if="ad.serviceType != 'FREELANCE'" class="text-xs text-gray-500 ml-1">{{
          ad.city
        }}</span>
      </div>
      <RouterLink :to="{ name: 'ad', params: { id: ad.adId } }">
        <div
          class="line-clamp-2 no-underline hover:underline font-medium hover:text-black text-[15px] text-gray-600 mb-2 h-12 overflow-hidden"
        >
          {{ ad.adTitle }}
        </div>
      </RouterLink>

      <div class="flex items-center text-sm text-[#f9ae53] mb-2">
        <span class="material-icons text-base mr-1">star</span>
        <span class="font-semibold">{{ ad.ratingAverage ?? '' }}</span>
        <span class="text-gray-500 ml-1">({{ ad.ratingCount ?? 0 }})</span>
      </div>
      <p class="text-sm font-semibold text-gray-700 whitespace-nowrap ml-1">
        {{ ad.adPriceMin }}
        <span v-if="ad.adPriceMax && ad.adPriceMin != null" class=""> - </span>
        {{ ad.adPriceMax }}<span v-if="ad.adPriceMax || ad.adPriceMin != null" class=""> € </span>
        <span
          v-if="ad.pricingUnit != 'по договаряне' && ad.pricingUnit != null"
          class="font-medium"
        >
          /{{ props.ad.pricingUnit }}
        </span>
        <span v-else class="font-medium">
          {{ props.ad.pricingUnit }}
        </span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AdCardType } from '@/types/Types'
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
const props = defineProps<{ ad: AdCardType }>()
</script>
