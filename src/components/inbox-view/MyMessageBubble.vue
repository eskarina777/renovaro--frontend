<template>
  <div class="flex justify-end mr-4">
    <div>
      <div
        class="bg-[#e7f0eb] text-gray-800 p-3 rounded-lg rounded-tr-none max-w-[480px] ml-24 sm:ml-36"
      >
        <p class="text-[14px] leading-[1.3]">
          {{ props.message.messageBody }}
        </p>
      </div>
      <p class="text-[12px] text-gray-400 mt-1 text-right">
        {{ formatChatDate(props.message.createdAt) }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatChatDate } from '@/utils/date'
import type { MessageType } from '@/types/Types'
const props = defineProps<{ message: MessageType }>()
</script>
