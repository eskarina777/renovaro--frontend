<template>
  <div class="flex items-start space-x-1 sm:space-x-2">
    <div class="relative flex mr-2 w-8 h-8 flex-shrink-0">
      <img alt="" class="w-8 h-8 rounded-full object-cover" :src="props.preview?.profileImageUrl" />
      <div :class="onlineStatus ? 'online-status-dot-chat' : 'offline-status-dot-chat'"></div>
    </div>
    <div>
      <div
        class="bg-gray-100 text-gray-900 p-3 rounded-lg rounded-tl-none max-w-[440px] mr-20 sm:mr-36"
      >
        <p class="text-[14px] leading-[1.3]">
          {{ props.message.messageBody }}
        </p>
      </div>
      <p class="text-[12px] text-gray-400 mt-1">{{ formatChatDate(props.message.createdAt) }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatChatDate } from '@/utils/date'
import { computed } from 'vue'
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
import type { ChatPreviewType } from '@/types/Types'
import type { MessageType } from '@/types/Types'
const onlineStatusStore = useOnlineStatusStore()
const onlineStatus = computed(() => {
  if (!props.preview) return null

  return onlineStatusStore.getOnlineStatus(props.preview.userId) ?? props.preview.onlineStatus
})
const props = defineProps<{
  message: MessageType
  preview: ChatPreviewType | null
}>()
</script>
