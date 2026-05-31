<template>
  <div class="w-full" @click="onSelect">
    <div
      :class="
        isRead
          ? 'px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm bg-gray-50 mt-1.5 mx-2'
          : 'px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-sm bg-[#e7f0eb] mt-1.5 mx-2'
      "
    >
      <div class="flex items-start space-x-3">
        <div class="relative">
          <img class="w-10 h-10 rounded-full object-cover" :src="preview.profileImageUrl" />
          <div :class="onlineStatus ? 'online-status-dot' : 'offline-status-dot'"></div>
        </div>

        <div class="flex-1 items-start">
          <div class="flex items-center">
            <p class="flex-1 text-[14px] font-medium text-gray-700">
              {{ preview.userName }}
            </p>
            <div class="flex gap-0.5 items-center">
              <span
                @click="onToggleIsStarred(preview.chatId)"
                @click.stop
                class="text-base leading-none ml-2 hover:text-gray-600 cursor-pointer"
                :class="
                  isStarred
                    ? 'material-icons text-[#f9ae53]'
                    : 'material-symbols-outlined text-gray-400'
                "
              >
                {{ isStarred ? 'star' : 'star_outline' }}
              </span>
              <DropdownMenu class="relative">
                <DropdownMenuTrigger @click.stop>
                  <div class="relative group w-7 h-7 flex items-center justify-center">
                    <div
                      class="absolute inset-0 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition"
                    ></div>
                    <span class="material-icons text-gray-600 text-xl relative"> more_horiz </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="" align="end">
                  <DropdownMenuItem as-child>
                    <div class="flex items-center gap-1 py-1">
                      <span class="material-icons-outlined text-gray-500 text-base">{{
                        isRead ? 'drafts' : 'mail'
                      }}</span>
                      <span
                        @click="onToggleHasUnreadMessages(preview.chatId)"
                        class="text-gray-500"
                        >{{
                          preview.isRead
                            ? 'Маркирайте като непрочетенo'
                            : 'Маркирайте като прочетенo'
                        }}</span
                      >
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem as-child>
                    <div @click="onDeleteChat(preview.chatId)" class="flex items-center gap-1 py-1">
                      <span class="material-icons-outlined text-gray-500 text-base">delete</span>
                      <span class="text-gray-500">Изтрийте</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div class="flex items-center">
            <p class="flex-1 text-[13px] text-gray-600 line-clamp-1">
              {{ preview.lastMessageText }}
            </p>
            <p class="ml-4 mr-1 text-[12px] text-gray-400 leading-none">
              {{ formatRelativeTime(props.preview.createdAt) || ' ' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatPreviewType } from '@/types/Types'
import { useRelativeTime } from '@/composables/useRelativeTime'
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
import { computed } from 'vue'
import { toggleChatIsRead, toggleChatIsStarred, deleteChat } from '@/api/data'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
const { formatRelativeTime } = useRelativeTime()
const isStarred = computed(() => props.preview.isStarred)
const isRead = computed(() => props.preview.isRead)

const props = defineProps<{ preview: ChatPreviewType }>()
const emit = defineEmits<{
  (e: 'select-chat', chatId: number): void
}>()
function onSelect() {
  emit('select-chat', props.preview.chatId)
}
const chatPreviewsStore = useChatPreviewsStore()
const onlineStatusStore = useOnlineStatusStore()

async function onToggleHasUnreadMessages(chatId: number) {
  const newValue = !chatPreviewsStore.getIsRead(chatId)
  try {
    await toggleChatIsRead(chatId, newValue)
    chatPreviewsStore.toggleChatIsReadUI(chatId, newValue)
  } catch (err) {
    console.error('Failed to toggle unread messages:', err)
  }
}

async function onToggleIsStarred(chatId: number) {
  const newValue = !chatPreviewsStore.getIsStarred(chatId)
  try {
    await toggleChatIsStarred(chatId, newValue)
    chatPreviewsStore.toggleChatIsStarredUI(chatId, newValue)
  } catch (err) {
    console.error('Failed to toggle starred chat:', err)
  }
}

async function onDeleteChat(chatId: number) {
  try {
    await deleteChat(chatId)
    chatPreviewsStore.deleteChatUI(chatId)
  } catch (err) {
    console.error('Failed to delete chat:', err)
  }
}
const onlineStatus = computed(
  () => onlineStatusStore.getOnlineStatus(props.preview.userId) ?? props.preview.onlineStatus,
)
</script>
<style scoped></style>
