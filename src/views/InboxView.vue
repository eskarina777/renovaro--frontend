<template>
  <div class="bg-[#f6f7f8]">
    <div
      class="bg-gray-100px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1126px] 2xl:mx-auto py-4 sm:py-6"
    >
      <div class="flex flex-col lg:flex-row">
        <div
          class="bg-white rounded-l-lg sm:px-1 w-full lg:max-w-[380px] h-[560px] border border-r-0 mb-4"
        >
          <ChatSearchBar />
          <div
            class="bg-white h-[450px] w-full lg:max-w-[380px] pb-4 mb-4 overflow-y-auto custom-scrollbar"
          >
            <div class="flex flex-col mb-4 space-y-2 custom-scrollbar overflow-hidden">
              <ChatPreviewInboxCard
                @select-chat="onSelectChat(prev.chatId)"
                v-for="prev in chatPreviewsStore.previews"
                :key="prev.chatId"
                :preview="prev"
              />
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-r-lg h-[560px] w-full max-w-[820px] overflow-hidden border border-l-0"
        >

          <div class="px-6 py-[17px] border-b border-gray-200 mb-2 flex items-start">
            <div v-if="chatStore.currentChatId" class="relative flex mr-2">
              <img
                alt=""
                class="w-8 h-8 rounded-full object-cover"
                :src="
                  chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)?.profileImageUrl
                "
              />
              <div :class="true ? 'online-status-dot-chat' : 'offline-status-dot-chat'"></div>
            </div>
            <p class="flex-1 text-[15px] font-medium text-gray-600 items-center mt-1">
              {{ chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)?.userName }}
            </p>
            <div class="flex gap-0.5 items-center">
              <span class="material-icons text-gray-400 text-xl">star_border</span>
              <span class="material-icons text-gray-400 text-xl">more_horiz</span>
            </div>
          </div>
          <div class="pr-[7px] h-[373px]">
            <div
              ref="messagesContainer"
              class="space-y-4 max-h-[367px] custom-scrollbar overflow-y-auto pl-4 pt-3"
            >

              <div
                v-if="!chatStore.currentChatId"
                class="flex-1 flex items-center justify-center text-gray-400"
              >
                Изберете чат !
              </div>

              <div v-else class="">
                <div v-for="msg in chatStore.messages" :key="msg.messageId">
                  <MyMessageBubble v-if="msg.fromUserId === currentUserId" :message="msg" />
                  <OtherMessageBubble
                    v-if="
                      msg.fromUserId ===
                      chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)?.userId
                    "
                    :message="msg"
                    :preview="chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 border-t border-gray-200 pt-4 px-6">
            <div class="flex items-center space-x-3">
              <div class="flex-grow relative">
                <textarea
                  v-model="messageText"
                  class="w-full resize-none py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none text-[14px] text-gray-700"
                  placeholder="Съобщение..."
                  type="text"
                  rows="1"
                  @keydown.enter.prevent="sendMessage"
                ></textarea>
              </div>
              <button class="text-gray-500 hover:text-gray-700">
                <span class="material-icons">sentiment_satisfied_alt</span>
              </button>
              <button class="text-gray-500 hover:text-gray-700">
                <span class="material-icons">attach_file</span>
              </button>
              <button @click="sendMessage" class="text-[#5ea480] text-lg pr-2 hover:text-gray-400">
                <span class="material-icons font-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import { getChatPreviews } from '@/api/data'
import type { ChatPreviewType } from '@/types/Types'
import ChatPreviewInboxCard from '@/components/inbox-view/ChatPreviewInboxCard.vue'
import ChatSearchBar from '@/components/inbox-view/ChatSearchBar.vue'
import OtherMessageBubble from '@/components/inbox-view/OtherMessageBubble.vue'
import MyMessageBubble from '@/components/inbox-view/MyMessageBubble.vue'
const route = useRoute()
const id = computed(() => route.query.id as string | undefined)
const messagesContainer = ref<HTMLElement | null>(null)
const chatPreviewsStore = useChatPreviewsStore()
const notificationsStore = useNotificationsStore()
const authStore = useAuthStore()
const chatStore = useChatStore()
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
const onlineStatusStore = useOnlineStatusStore()
const previews = ref<ChatPreviewType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const messageText = ref('')
const currentUserId = computed<number | null>(() => (authStore.user ? authStore.user.userId : null))
watch(
  id,
  (newId) => {
    if (newId) {
      chatStore.openChat(Number(newId))
    }
  },
  { immediate: true },
)
async function onSelectChat(chatId: number) {
  await chatStore.openChat(chatId)
}

onMounted(async () => {
  notificationsStore.setInboxViewOpen(true)
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
})

onUnmounted(() => {
  notificationsStore.setInboxViewOpen(false)
  chatStore.clearChat()
})
async function sendMessage() {
  if (!messageText.value.trim()) return
  await chatStore.sendMessage(messageText.value)
  messageText.value = ''
}
watch(
  () => chatStore.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  },
)
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
