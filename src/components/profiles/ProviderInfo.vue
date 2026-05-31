<template>
  <div class="">
    <div v-if="props.userWebsite" class="ml-auto flex items-center mt-2 mb-[6px]">
      <span class="material-icons-outlined text-gray-400 text-[16px] sm:text-[17px]">public</span>
      <span class="text-sm sm:text-[14px] fontnormal text-gray-500 ml-1.5">{{
        props.userWebsite
      }}</span>
    </div>
    <div class="flex flex-col gap-[2px] leading-none">
      <div class="mb-[6px]">
        <span class="mdi mdi-account-hard-hat-outline m-0 p-0 text-[18px] text-gray-400"></span>
        <span class="text-sm sm:text-[14px] text-gray-500 ml-1.5"
          >Член от {{ formatDate(props.memberSince) }}
        </span>
      </div>
      <div class="mb-[7px]">
        <span
          class="mdi mdi-wallet-bifold-outline text-gray-400 hover:text-[#77b393] text-[18px] m-0 p-0"
        ></span>
        <span class="text-gray-500 m-0 p-0 ml-1.5 text-sm sm:text-[14px]"
          >{{ props.totalCredit }} кредита</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '@/composables/useFormatDate'
const props = defineProps<{
  userWebsite: string | null
  memberSince: string
  totalCredit: number
}>()
</script>
