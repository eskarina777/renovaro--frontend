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
                type="email"
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
            </div>
            <p v-if="error" class="mt-2 text-sm text-[#ec9393]" style="white-space: pre-line">
              {{ error }}
            </p>
            <button
              type="submit"
              class="mt-16 w-full bg-[#3b6751] opacity-50 text-base hover:bg-white border border-[#3b6751] hover:text-[#3b6751] text-white font-medium py-2 px-2 rounded-sm focus:outline-none shadow-md"
            >
              Регистрация
            </button>
          </form>
          <div class="flex items-center gap-1 mt-4 text-sm">
            <span>Вече имате регистрация</span>
            <div @click="emit('close')" class="relative inline-block group">
              <LoginButton
                class="border-none hover:border-none hover:bg-transparent hover:text-[#6B7280]"
              />
              <p
                class="absolute inset-0 flex items-center justify-center text-[#77b393] text-[15px] opacity-0 group-hover:opacity-100 pointer-events-none"
              >
                Вход
              </p>
            </div>
          </div>
          <div>
            <UseTerms />
          </div>
        </div>
      </div>
    </div>
    <RoleModal v-if="showRoleModal" @close="showRoleModal = false" />
  </teleport>
</template>
<script setup lang="ts">
import LoginButton from '../buttons/LoginButton.vue'
import ModalCloseButton from '../buttons/ModalCloseButton.vue'
import RegistrationFeatures from './shared/RegistrationFeatures.vue'
import RoleModal from './shared/RoleModal.vue'
import UseTerms from './shared/UseTerms.vue'
import { ref, inject } from 'vue'
import { useRegistrationStore } from '@/stores/registrationStore'
import { validatePassword } from '@/lib/utils'
const registration = useRegistrationStore()
const showRoleModal = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')

async function onSubmit() {
  console.log('submit', email.value, password.value)
  if (!password.value) {
    error.value = 'Моля, попълнете парола'
    return
  } else if (!validatePassword(password.value)) {
    error.value =
      'Паролата трябва да съдържа поне\n8 символа,\n1 главна буква,\n1 малка буква,\n1 цифра и специален символ.'

    return
  }

  registration.setCredentials(email.value, password.value)
  console.log('store', registration.email, registration.password)
  openRoleModal?.()
}
const openRoleModal = inject<() => void>('openRoleModal')
const emit = defineEmits(['close'])
</script>
