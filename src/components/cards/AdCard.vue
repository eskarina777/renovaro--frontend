<template>
  <div class="bg-white rounded-lg shadow-md w-[305px] h-[400px] pb-4">
    <div class="relative">
      <RouterLink :to="{ name: 'ad', params: { id: ad.adId } }">
        <img
          class="w-full h-[200px] object-cover rounded-t-lg opacity-70"
          :src="ad.adImageUrl || '/fallback-ad.png'"
      /></RouterLink>
      <div
        v-if="ad.adId === 1 || ad.adId === 9"
        class="group w-9 h-9 -top-3 z-10 absolute -right-3 bg-white/70 shadow-md backdrop-blur text-gray-500 hover:bg-white/90 font-medium flex items-center rounded-[3px] justify-center cursor-pointer"
      >
        <span class="material-icons-outlined text-gray-300 text-3xl"> star_border </span>
        <div
          class="text-[14px] lg:inline absolute right-0 -bottom-12 whitespace-nowrap rounded-sm bg-white/70 shadow-md backdrop-blur text-gray-500 hover:bg-white/90 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          Примерна обява
        </div>
      </div>
    </div>
    <div class="px-5 pt-5 pb-6">
      <div class="flex items-center mb-3">
        <img
          class="w-8 h-8 rounded-full mr-2"
          :src="
            ad.profileImageUrl ||
            (ad.userRole === 'COMPANY' ? '/fallback-group.png' : '/fallback-user.png')
          "
        />

        <span class="text-md font-medium text-[15px] text-gray-700">{{ ad.userName }}</span>
        <span
          class="material-icons text-gray-500 ml-auto mb-0.5"
          :class="ad.userRole === 'COMPANY' ? 'text-md' : 'text-[18px]'"
        >
          {{ ad.userRole === 'COMPANY' ? 'groups' : 'person' }}</span
        >

        <span v-if="ad.serviceType != 'FREELANCE'" class="text-sm text-gray-500 ml-1">{{
          ad.city
        }}</span>
      </div>
      <RouterLink :to="{ name: 'ad', params: { id: ad.adId } }">
        <div
          class="line-clamp-2 no-underline hover:underline hover:text-black text-md text-gray-600 mb-2 h-[49px] overflow-hidden"
        >
          {{ ad.adTitle }}
        </div>
      </RouterLink>

      <div class="flex items-center text-sm text-[#f9ae53] mb-2">
        <span class="material-icons text-base mr-1"
          >{{ ad.ratingCount ? 'star' : 'star_outline' }}
        </span>
        <span class="font-semibold">{{ ad.ratingAverage ?? '' }}</span>
        <span class="text-gray-500 ml-1">({{ ad.ratingCount ?? 0 }})</span>
      </div>
      <p class="text-base font-semibold text-gray-700 whitespace-nowrap">
        {{ ad.adPriceMin }}
        <span v-if="ad.adPriceMax && ad.adPriceMin != null" class=""> - </span>
        {{ ad.adPriceMax }}<span v-if="ad.adPriceMax || ad.adPriceMin != null" class=""> € </span>
        <span
          v-if="ad.pricingUnit != 'по договаряне' && ad.pricingUnit != null"
          class="font-medium text-[15px] mr-[1px]"
        >
          /<span class="font-medium text-[16px] ml-[2px]">
            {{ props.ad.pricingUnit }}
          </span>
        </span>
        <span v-else class="font-medium text-[16px]">
          {{ props.ad.pricingUnit }}
        </span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AdCardType } from '@/types/Types'

const props = defineProps<{ ad: AdCardType }>()
</script>
