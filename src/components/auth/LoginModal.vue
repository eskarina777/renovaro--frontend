<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div
        class="bg-white mx-4 rounded-lg shadow-xl flex max-w-[360px] max-h-screen md:w-auto md:max-w-[840px]"
      >
        <div class="hidden w-1/2 md:block">
          <RegistrationFeatures />
        </div>
        <div class="md:w-1/2 p-10 bg-white md:rounded-r-lg md:rounded-l-none rounded-lg relative">
          <ModalCloseButton @click="emit('close')" />
          <form @submit.prevent="onSubmit" class="mt-6">
            <div class="mb-4">
              <label class="block text-base font-medium text-gray-700 mb-1" for="email"
                >E-mail</label
              >
              <input
                class="w-full h-10 px-2 border text-[15px] border-gray-300 rounded-sm focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow shadow-sm"
                id="email"
                v-model="email"
                placeholder="name@email.com"
                type="text"
                required
              />
            </div>
            <div class="mb-6">
              <label class="block text-base font-medium text-gray-700 mb-1" for="password"
                >Парола</label
              >
              <div class="relative">
                <input
                  class="w-full h-10 px-2 border border-gray-300 rounded-sm focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow shadow-sm"
                  id="password"
                  v-model="password"
                  type="password"
                />
                <p class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                  <span class="material-icons text-xs">visibility_off</span>
                </p>
              </div>
              <p v-if="error" class="mt-2 text-sm text-[#ec9393]" style="white-space: pre-line">
                {{ error }}
              </p>
              <a class="text-gray-900 hover:text-gray-500 flex justify-end mt-2 text-sm"
                >Забравена парола?</a
              >
            </div>

            <button
              class="mt-16 w-full bg-[#3b6751] text-base opacity-50 hover:bg-white border border-[#3b6751] hover:text-[#3b6751] text-white font-medium py-2 px-2 rounded-sm focus:outline-none shadow-md flex items-center justify-center"
              type="submit"
              :disabled="isSubmitting"
            >
              <Loader2 v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
              <p>Вход</p>
            </button>
          </form>
          <p v-if="error" class="mt-2 text-sm text-[#ec9393]">
            {{ errorSubmit }}
          </p>
          <div class="flex items-center gap-1 mt-4">
            <span class="text-sm">Все още нямате профил</span>
            <div @click="emit('close')">
              <RegisterButton />
            </div>
          </div>
          <div>
            <div>
              <UseTerms />
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import ModalCloseButton from '../buttons/ModalCloseButton.vue'
import RegisterButton from '../buttons/RegisterButton.vue'
import RegistrationFeatures from './shared/RegistrationFeatures.vue'
import UseTerms from './shared/UseTerms.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { Loader2 } from 'lucide-vue-next'
import { openSocket } from '@/lib/websocketService'
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const error = ref('')
const errorSubmit = ref('')

async function onSubmit() {
  error.value = ''
  isSubmitting.value = true

  if (!password.value) {
    errorSubmit.value = 'Моля, въведете парола'
    isSubmitting.value = false
    return
  }
  try {
    await authStore.login(email.value, password.value)
    if (authStore.accessToken) {
      openSocket(authStore.accessToken)
    }
    emit('close')
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
    error.value = '! Грешно потребителско име или парола'
  } finally {
    isSubmitting.value = false
  }
}

const emit = defineEmits(['close'])
</script>
