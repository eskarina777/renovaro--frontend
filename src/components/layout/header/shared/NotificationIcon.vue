<template>
  <div class="relative group">
    <DropdownMenu v-model:open="isOpen" class="mr-10">
      <DropdownMenuTrigger>
        <div class="relative">
          <button class="text-gray-500 hover:text-[#77b393]">
            <span class="material-icons-outlined mt-1">notifications</span>
            <div v-if="notificationsStore.hasNewNotifications" class="unread-notifications"></div>
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[365px] sm:w-[450px] max-h-[620px]" :collision-padding="6">
        <DropdownMenuItem as-child class="pointer-events-none">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-gray-500">notifications</span>
            <span class="text-gray-800 text-sm font-medium">Нотификации</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <div class="max-h-[470px] overflow-y-auto custom-scroll">
          <template v-for="prev in notificationsPreviewsStore.previews" :key="prev.notificationId">
            <DropdownMenuItem
              as-child
              class="!bg-transparent hover:!bg-transparent"
              className="p-0"
            >
              <RouterLink :to="{ name: 'notification' }">
                <NotificationPreview :prev="prev" />
              </RouterLink>
            </DropdownMenuItem>
          </template>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem as-child class="!bg-transparent hover:!bg-transparent">
          <div class="p-4 flex justify-between items-center border-gray-200">
            <SettingsIcons />
            <RouterLink
              :to="{ name: 'notification' }"
              class="text-sm font-medium text-[#77b393] hover:underline"
            >
              Вижте всички
            </RouterLink>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div
      class="text-[14px] absolute left-0 -bottom-8 whitespace-nowrap rounded-md bg-gray-100 text-gray-500 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
    >
      Нотификации
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
import { getNotificationsPreview } from '@/api/data'
import { ref, watch } from 'vue'
import type { NotificationPreviewType } from '@/types/Types'
import SettingsIcons from './SettingsIcons.vue'
import NotificationPreview from './NotificationPreview.vue'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { useNotificationPreviewsStore } from '@/stores/notificationsPreviewsStore'
const notificationsStore = useNotificationsStore()
const notificationsPreviewsStore = useNotificationPreviewsStore()
const previewsNot = ref<NotificationPreviewType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const isOpen = ref(false)
watch(isOpen, async (open) => {
  if (open) {
    notificationsStore.setNotificationsDropdownOpen(true)
    notificationsStore.setHasNewNotifications(false)
    try {
      previewsNot.value = await getNotificationsPreview()
      notificationsPreviewsStore.initFromPreviews(previewsNot.value)
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
    notificationsStore.setNotificationsDropdownOpen(false)
  }
})
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
