<template>
  <RouterLink
    :to="{ name: 'inbox', query: { id: preview.chatId } }"
    @click="onOpenChat(preview.chatId)"
  >
    <div class="w-WULL">
      <div
        :class="
          isRead
            ? 'px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm bg-gray-50 mt-1.5 mx-2'
            : 'px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-sm bg-[#e7f0eb] mt-1.5 mx-2'
        "
      >
        <div class="flex items-start space-x-3">
          <div class="relative">
            <img
              :alt="`${preview.userName}`"
              class="w-10 h-10 rounded-full object-cover"
              :src="preview.profileImageUrl"
            />
            <div :class="onlineStatus ? 'online-status-dot' : 'offline-status-dot'"></div>
          </div>

          <div class="flex-1 items-start">
            <div class="flex mb-1 items-center">
              <p class="flex-1 text-[14px] font-medium text-gray-700">
                {{ preview.userName }}
              </p>
              <span
                @click.stop.prevent="onToggleChatIsRead(preview.chatId)"
                class="material-symbols-outlined text-gray-400 text-base leading-none ml-2 hover:text-gray-600 cursor-pointer"
              >
                {{ isRead ? 'drafts' : 'mail' }}
              </span>
            </div>
            <div class="flex items-center">
              <p class="flex-1 text-[13px] text-gray-600 line-clamp-1">
                {{ preview.lastMessageText }}
              </p>
              <p v-if="preview.lastMessageText" class="ml-4 text-[12px] text-gray-400 leading-none">
                {{ formatRelativeTime(props.preview.createdAt) || ' ' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ChatPreviewType } from '@/types/Types'
import { useRelativeTime } from '@/composables/useRelativeTime'
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
import { computed } from 'vue'
import { toggleChatIsRead } from '@/api/data'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
const chatPreviewsStore = useChatPreviewsStore()
const onlineStatusStore = useOnlineStatusStore()

async function onToggleChatIsRead(chatId: number) {
  const newValue = !chatPreviewsStore.getIsRead(chatId)

  try {
    await toggleChatIsRead(chatId, newValue)
    chatPreviewsStore.toggleChatIsReadUI(chatId, newValue)
  } catch (err) {
    console.error('Failed to toggle chat is read:', err)
  }
}

const onlineStatus = computed(
  () => onlineStatusStore.getOnlineStatus(props.preview.userId) ?? props.preview.onlineStatus,
)

async function onOpenChat(chatId: number) {
  await toggleChatIsRead(chatId, true)
  chatPreviewsStore.toggleChatIsReadUI(chatId, true)
}

const isRead = computed(() => props.preview.isRead)
const { formatRelativeTime } = useRelativeTime()

const props = defineProps<{ preview: ChatPreviewType }>()
</script>
<style scoped></style>
