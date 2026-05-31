<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div
        class="bg-white rounded-lg px-0 pt-10 pr-10 pb-6 sm:pl-6 shadow-xl flex max-w-[360px] max-h-screen md:w-auto md:max-w-[800px] relative"
      >
        <ModalCloseButton @click="emit('close')" />
        <div
          class="bg-white rounded-lg max-h-[400px] w-full min-w-[615px] max-w-[620px] overflow-hidden border"
        >
          <div class="px-6 py-[10px] border-b border-gray-200 mb-2 flex items-start">
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
            <div class="flex gap-0.5 items-center mr-5 sm:mr-0">
              <span class="material-icons text-gray-400 text-xl">star_border</span>
              <span class="material-icons text-gray-400 text-xl">more_horiz</span>
            </div>
          </div>
          <div class="pr-[7px] h-[220px]">
            <div
              ref="messagesContainer"
              class="space-y-4 max-h-[200px] custom-scrollbar overflow-y-auto pl-4 pt-3"
            >
              <div
                v-if="
                  !chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)?.lastMessageText
                "
                class="flex-1 flex items-center justify-center text-gray-400 mt-4"
              >
                Тук може да зададате въпрос на
                {{ chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)?.userName }}!
              </div>

              <div v-else class="">
                <div v-for="msg in chatStore.messages" :key="msg.messageId">
                  <MyMessageBubble v-if="msg.fromUserId === currentUserId" :message="msg" />
                  <OtherMessageBubble
                    v-else
                    :message="msg"
                    :preview="chatPreviewsStore.getPreviewByChatId(chatStore.currentChatId)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-3 pl-4 pr-4">
            <div class="flex items-center space-x-1 sm:space-x-3">
              <div class="flex-grow relative">
                <textarea
                  v-model="messageText"
                  class="w-full resize-none mb-2 py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none text-[14px] text-gray-700"
                  placeholder="Съобщение..."
                  type="text"
                  rows="1"
                  @keydown.enter.prevent="sendMessage"
                ></textarea>
              </div>
              <button class="text-gray-500 hover:text-gray-700">
                <span class="material-icons ml-2">sentiment_satisfied_alt</span>
              </button>
              <button class="text-gray-500 hover:text-gray-700">
                <span class="material-icons">attach_file</span>
              </button>
              <button @click="sendMessage" class="text-[#5ea480] text-lg hover:text-gray-400">
                <span class="material-icons sm:font-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch, computed, onUnmounted, onMounted, nextTick } from 'vue'
import { useChatPreviewsStore } from '@/stores/chatPreviewsStore'
import { useChatStore } from '@/stores/chatStore'
import { useAuthStore } from '@/stores/authStore'
import OtherMessageBubble from '@/components/inbox-view/OtherMessageBubble.vue'
import MyMessageBubble from '@/components/inbox-view/MyMessageBubble.vue'
import { getChatPreviews, createChat } from '@/api/data'
import type { ChatPreviewType } from '@/types/Types'
import { useOnlineStatusStore } from '@/stores/onlineUsersStore'
import ModalCloseButton from '../buttons/ModalCloseButton.vue'

const messagesContainer = ref<HTMLElement | null>(null)
const props = defineProps<{
  providerId: number
}>()
const emit = defineEmits(['close'])
const onlineStatusStore = useOnlineStatusStore()
const previews = ref<ChatPreviewType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const chatPreviewsStore = useChatPreviewsStore()
const authStore = useAuthStore()
const chatStore = useChatStore()

const messageText = ref('')
const currentUserId = computed<number | null>(() => (authStore.user ? authStore.user.userId : null))

async function openProviderChat() {
  if (!authStore.user!.userId) return
  const existing = chatPreviewsStore.previews.find((p) => p.userId === props.providerId)
  if (existing) {
    chatStore.openChat(existing.chatId)
  } else {
    const chatId = await createChat(props.providerId)
    chatStore.openChat(chatId)
  }
}
async function getPreviews() {
  try {
    previews.value = await getChatPreviews()
    console.log('preview:', previews.value)
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
}
onMounted(async () => {
  if (!authStore.user?.userId) {
    emit('close')
    authStore.openLoginModal()
    return
  }

  await getPreviews()
  await openProviderChat()
})
onUnmounted(() => {
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
