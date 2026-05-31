<template>
  <h1 class="text-base sm:text-lg mb-8 font-medium text-gray-600 sm:mt-2">
    {{ ad.adDetails.adTitle }}
  </h1>

  <div class="grid grid-cols-[auto_1fr] gap-x-2 px-1">
    <div class="w-[58px] h-[58px] col-span-1">
      <img class="w-[58px] h-[58px] rounded-full mr-2" :src="ad.userProfile.userProfileImageUrl" />
    </div>
    <div class="col-span-1">
      <div class="flex items-center mr-1">
        <span class="text-sm sm:text-[17px] font-medium text-gray-500">{{
          ad.userProfile.userName
        }}</span>
        <span class="ml-2 material-icons text-gray-400 text-sm sm:text-xl">{{
          ad.userProfile.userRole.includes('COMPANY') ? 'groups' : 'person'
        }}</span>
        <div
          v-if="ad.serviceTypeCode === 'LOCAL_FLEX' || ad.serviceTypeCode === 'LOCAL_FIXED'"
          class="ml-auto flex items-center"
        >
          <span class="material-icons-outlined text-gray-500 text-sm sm:text-lg">location_on</span>
          <span class="text-sm sm:text-base font-medium text-gray-500 ml-1">{{
            ad.adDetails.city
          }}</span>
        </div>
      </div>
      <div class="flex flex-col md:flex-row mt-[2px] gap-1 sm:gap-1 mr-1">
        <div class="flex w-full items-center gap-2">
          <StarRating :value="ad.userProfile.ratingAverage ?? 0" />
          <span class="ml-1 text-sm text-gray-500 whitespace-nowrap">
            ({{ ad.userProfile.ratingCount ?? 0 }} оценки)
          </span>
        </div>
        <div
          v-if="ad.serviceTypeCode === 'LOCAL_FLEX' || ad.serviceTypeCode === 'LOCAL_FIXED'"
          class="items-end"
        >
          <AdPrice
            class="justify-end"
            :priceMin="ad.adDetails.adPriceMin"
            :priceMax="ad.adDetails.adPriceMax"
            :pricingUnit="ad.adDetails.pricingUnit"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-7">
    <AdThumbsGallery :images="ad.adDetails.adImageUrl" />
  </div>
  <h2 v-if="ad.adDetails.adDescription" class="text-lg font-medium text-gray-600 mt-10 mb-4">
    Повече за обявата
  </h2>
  <p class="text-gray-500 ad-desc text-sm mb-8" v-html="ad.adDetails.adDescription"></p>
  <hr class="mb-8 border-gray-200" />

  <div
    v-if="ad.serviceTypeCode === 'LOCAL_FLEX'"
    class="bg-gray-50 p-5 text-[13px] rounded-sm border border-gray-200"
  >
    <div class="flex items-center mb-2">
      <span class="material-icons text-gray-500 mr-2">info_outline</span>
      <h4 class="text-gray-600 font-medium">Изисквания за изпълнение</h4>
    </div>
    <p v-if="ad.adDetails.importantInfo" class="text-xs text-gray-600">
      {{ ad.adDetails.importantInfo }}
    </p>
    <p
      v-if="ad.serviceTypeCode === 'LOCAL_FLEX' && !ad.adDetails.importantInfo"
      class="text-xs text-gray-600"
    >
      За изготвяне на оферта, моля свържете се за консултация или оглед, на които ще бъдат уточнени
      конкретните изисквания относно използвани материали, методи на работа, срок за изпълнение и
      крайна цена.
    </p>
  </div>

  <div
    v-if="ad.serviceTypeCode === 'FREELANCE' && ad.adDetails.importantInfo"
    class="bg-gray-50 p-5 text-[13px] rounded-sm border border-gray-200"
  >
    <div class="flex items-center mb-2">
      <span class="material-icons text-gray-500 mr-2">info_outline</span>
      <h4 class="text-gray-600 font-medium">Изисквания за изпълнение</h4>
    </div>
    <p v-if="ad.adDetails.importantInfo" class="text-xs text-gray-600">
      {{ ad.adDetails.importantInfo }}
    </p>
  </div>
  <div class="mb-4 mt-12">
    <h2 class="text-lg font-medium text-gray-600 mt-2 mb-8">Повече за изпълнителя</h2>
    <div class="grid grid-cols-[auto_1fr] gap-x-2">
      <div class="w-12 h-12 col-span-1">
        <img class="w-12 h-12 rounded-full mr-2" :src="ad.userProfile.userProfileImageUrl" />
      </div>
      <div class="col-span-1">
        <div class="flex items-center">
          <span class="text-sm sm:text-[17px] font-medium text-gray-500">{{
            ad.userProfile.userName
          }}</span>
          <span class="ml-2 material-icons text-gray-500 text-sm sm:text-lg">{{
            ad.userProfile.userRole.includes('COMPANY') ? 'groups' : 'person'
          }}</span>
          <div v-if="ad.userProfile.showPhoneNumber" class="ml-auto mr-1">
            <p class="text-xs sm:text-[14px] text-gray-500">
              <span class="material-icons text-sm sm:text-base align-middle ml-2 mb-1"
                >phone_iphone</span
              >
              {{ ad.userProfile.phoneNumber }}
            </p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row mt-1.5 gap-2">
          <div class="flex w-full items-center gap-2">
            <StarRating :value="ad.userProfile.ratingAverage ?? 0" />
            <span class="ml-1 text-sm text-gray-500 whitespace-nowrap">
              ({{ ad.userProfile.ratingCount ?? 0 }} оценки)
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="relative text-xs group w-full mt-6 mb-8 flex justify-end">
      <ContactButton :providerId="ad.userProfile.userId" />
    </div>
  </div>
  <div
    v-if="ad.userProfile.userDetails"
    class="px-5 py-5 text-xs rounded-sm border border-gray-200 mt-5"
  >
    <div class="flex flex-row justify-between text-sm">
      <div>
        <div v-if="ad.serviceTypeCode === 'LOCAL_FLEX'">
          <span class="material-icons-outlined text-gray-500 text-xl mr-1 ml-auto align-middle"
            >location_on</span
          >
          <span class="text-md text-gray-600 font-medium">{{ ad.adDetails.city }}</span>
        </div>
        <div v-if="ad.userProfile.userWebsite" class="ml-auto flex items-center mt-1">
          <span class="ml-1 mr-1 material-icons-outlined text-gray-500 text-[16px] sm:text-[17px]"
            >public</span
          >
          <span class="text-sm sm:text-[14px] font-medium text-gray-600 ml-1">{{
            ad.userProfile.userWebsite
          }}</span>
        </div>
      </div>
      <div class="mr-2 sm:mr-4">
        <p class="text-gray-500">Член от</p>
        <p class="font-medium text-gray-600 mt-1">
          {{ formatDate(ad.userProfile.memberSince) }}
        </p>
      </div>
    </div>
    <hr class="my-5 border-gray-200" />
    <p class="text-gray-700 text-[14px] ml-2 leading-[1.5]">
      {{ props.ad.userProfile.userDetails }}
    </p>
  </div>
  <ContactModal
    v-if="showContactModal"
    :providerId="ad.userProfile.userId"
    @close="showContactModal = false"
  />
  <LoginModal v-if="auth.showLoginModal" @close="auth.closeLoginModal" />
</template>
<script setup lang="ts">
import type { AdDetailedsResponse } from '@/types/Types'
import StarRating from '@/components/ad-view/StarRating.vue'
import AdThumbsGallery from '@/components/ad-view/AdThumbsGallery.vue'
import { formatDate } from '@/composables/useFormatDate'
import ContactButton from '@/components/ad-view/ContactButton.vue'
import AdPrice from '@/components/publish-ad-view/common/AdPrice.vue'
import ContactModal from './ContactModal.vue'
import { ref, provide } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import LoginModal from '../auth/LoginModal.vue'

const auth = useAuthStore()
provide('openContactModal', openContactModal)

const showContactModal = ref(false)

function openContactModal() {
  showContactModal.value = true
}
const props = defineProps<{
  ad: AdDetailedsResponse
}>()

function openLoginModal() {
  auth.openLoginModal()
}
provide('openLoginModal', openLoginModal)
</script>
<style scoped>
.ad-desc :deep(*) {
  color: rgb(75 85 99) !important;
  line-height: 1.45;
  /* color: rgb(107 114 128) !important; */
}
</style>
