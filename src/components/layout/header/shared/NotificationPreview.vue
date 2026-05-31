<template>
  <div
    :class="
      prev.isRead
        ? 'px-2 py-2.5 hover:bg-gray-200 cursor-pointer bg-white mt-1.5 mx-1 rounded-sm'
        : 'px-2 py-2 hover:bg-gray-200 cursor-pointer bg-gray-100 mt-1.5 mx-1 rounded-sm'
    "
  >
    <div class="flex justify-between space-x-3 relative">
      <div class="flex items-start space-x-3 relative">
        <div class="relative">
          <div
            class="w-10 h-10 rounded-full bg-[#cfe4d9] flex items-center justify-center text-sm text-[#5ea480] font-thin"
          >
            <span class="material-symbols-outlined items-center text-xl">{{
              prev.notificationTypeCode
            }}</span>
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <div class="flex fustify-center">
              <p class="text-sm font-medium text-gray-700">{{ prev.notificationTitle }}</p>
            </div>
            <div class="flex items-center space-x-2"></div>
          </div>
          <p class="text-[13px] text-gray-600 line-clamp-2">
            {{ prev.notificationText }}
          </p>
          <p class="text-[12px] text-gray-400">
            {{ formatRelativeTime(props.prev.createdAt) || ' ' }}
          </p>
        </div>
      </div>
      <DropdownMenu class="relative">
        <DropdownMenuTrigger @click.stop class="flex justify-end">
          <div class="relative group w-7 h-7 flex items-center justify-center">
            <div
              class="absolute inset-0 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition"
            ></div>
            <span class="material-icons text-gray-600 text-xl relative justify-end">
              more_horiz
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="" side="left">
          <DropdownMenuItem as-child>
            <div
              class="flex items-center gap-1 py-1"
              @click.stop.prevent="onToggleNotificationIsRead(prev.notificationId)"
            >
              <span class="material-icons-outlined text-gray-500 text-base"
                ><span class="material-icons-outlined text-gray-500 text-base">{{
                  prev.isRead ? 'mail' : 'drafts'
                }}</span></span
              >
              <span class="text-gray-500">{{
                prev.isRead ? 'Маркирайте като непрочетена' : 'Маркирайте като прочетена'
              }}</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem as-child>
            <div
              class="flex items-center gap-1 py-1"
              @click.stop.prevent="onDeleteNotification(prev.notificationId)"
            >
              <span class="material-icons-outlined text-gray-500 text-base">delete</span>
              <span class="text-gray-500">Изтрийте</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span v-if="!prev.isRead" class="absolute bottom-1 right-2 notification-status-dot"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationPreviewType } from '@/types/Types'
import { useRelativeTime } from '@/composables/useRelativeTime'
import { toggleNotificationIsRead, deleteNotification } from '@/api/data'
import { useNotificationPreviewsStore } from '@/stores/notificationsPreviewsStore'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
const notificationsPreviewsStore = useNotificationPreviewsStore()
const { formatRelativeTime } = useRelativeTime()
const props = defineProps<{ prev: NotificationPreviewType }>()

async function onToggleNotificationIsRead(notificationId: number) {
  const newValue = !notificationsPreviewsStore.getIsRead(notificationId)

  try {
    await toggleNotificationIsRead(notificationId, newValue)
    notificationsPreviewsStore.toggleIsReadUI(notificationId, newValue)
  } catch (err) {
    console.error('Failed to toggle notification:', err)
  }
}

async function onDeleteNotification(notificationId: number) {
  try {
    await deleteNotification(notificationId)
    notificationsPreviewsStore.deleteNotificationUI(notificationId)
  } catch (err) {
    console.error('Failed to delete notification:', err)
  }
}
</script>
<style scoped>
.notification-status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: #f9ae53;
}
</style>
