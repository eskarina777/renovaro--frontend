<template>
  <div class="relative group">
    <DropdownMenu v-model:open="isOpen">
      <DropdownMenuTrigger>
        <div class="relative">
          <button class="text-gray-500 hover:text-[#77b393]">
            <span class="material-icons-outlined mt-1">email</span>
            <div v-if="notificationsStore.hasNewMessages" class="unread-messages"></div>
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-[360px] sm:w-[380px] max-h-[560px]" :collision-padding="6">
        <DropdownMenuItem as-child class="pointer-events-none">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-gray-500">mail</span>
            <span class="text-gray-800 text-sm font-medium">Входящи</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div class="max-h-[400px] overflow-y-auto custom-scroll">
          <template v-for="prev in chatPreviewsStore.previews" :key="prev.chatId">
            <DropdownMenuItem
              as-child
              class="!bg-transparent hover:!bg-transparent"
              className="p-0"
            >
              <ChatPreviewCard :preview="prev" />
            </DropdownMenuItem>
          </template>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem as-child class="!bg-transparent hover:!bg-transparent">
          <div class="p-4 flex justify-between items-center border-gray-200">
            <SettingsIcons />
            <RouterLink
              :to="{ name: 'inbox' }"
              class="text-sm font-medium text-[#77b393] hover:underline"
            >
              Вижте всички
            </RouterLink>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div
      class="z-10 text-[14px] absolute left-0 -bottom-8 whitespace-nowrap rounded-md bg-gray-100 text-gray-500 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
    >
      Входящи
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { getChatPreviews } from '@/api/data'
import { ref, watch } from 'vue'
import type { ChatPreviewType } from '@/types/Types'
import ChatPreviewCard from './ChatPreviewCard.vue'
import SettingsIcons from './SettingsIcons.vue'
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
import { useNotificationsStore } from '@/stores/notificationsStore'
const notificationsStore = useNotificationsStore()
const onlineStatusStore = useOnlineStatusStore()
const chatPreviewsStore = useChatPreviewsStore()
const previews = ref<ChatPreviewType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const isOpen = ref(false)

watch(isOpen, async (open) => {
  if (open) {
    notificationsStore.setInboxDropdownOpen(true)
    notificationsStore.setHasNewMessages(false)
    try {
      previews.value = await getChatPreviews()
      onlineStatusStore.initFromPreviews(previews.value)
      chatPreviewsStore.initFromPreviews(previews.value)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  } else {
    notificationsStore.setInboxDropdownOpen(false)
  }
})
setInterval(() => {
  const random = Math.floor(Math.random() * previews.value.length)
  const item = previews.value?.[random]
  if (!item) return
  const userId = item.userId
  const newStatus = Math.random() > 0.5
  onlineStatusStore.updateOnlineStatus(userId, newStatus)
}, 10000)
</script>
<style scope>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #c8c8c8;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}
</style>
