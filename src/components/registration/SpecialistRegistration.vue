<template>
  <div class="bg-gray-50 h-full">
    <div
      class="py-8 px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto flex justify-center"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="w-full 2xl:max-w-1/2 bg-white px-6 sm:px-8 pt-6 pb-4 rounded-sm border">
          <h2 class="text-[17px] font-medium text-gray-800 mb-2">Лична информация</h2>
          <p class="text-xs leading-[1.3] text-gray-600 mb-4">
            Тази информация ще бъде публикувана във Вашия публичен профил, за да могат потенциални
            клиенти да Ви опознаят по-добре.
          </p>

          <div>
            <label class="block text-[15px] font-medium text-gray-900 mb-1.5" for="fullName">
              Пълно име*
            </label>
            <p class="text-xs leading-[1.3] text-gray-600 mb-3">
              В платформата ще бъдете представени с реалните си имена, за да имате възможност да
              изградите надеждни и автентични връзки с клиенти.
            </p>

            <div class="flex flex-col md:flex-row gap-3">
              <input
                class="text-[13px] block relative flex-1 md:w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id="firstName"
                name="firstName"
                placeholder="Име"
                type="text"
                v-model.trim="profile.firstName"
              />

              <input
                class="text-[13px] block relative flex-1 md:w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id="lastName"
                name="lastName"
                placeholder="Фамилия"
                type="text"
                v-model.trim="profile.lastName"
              />
            </div>
          </div>

          <div class="mt-5">
            <label class="block text-[15px] font-medium text-gray-900 mb-2">Профилна снимка*</label>
            <p class="text-xs leading-[1.3] text-gray-600 mb-3">
              Добавeте своя снимка, за да могат клиентите да виждат точно с кого ще работят. Това
              създава доверие и прави профила Ви по-личен и достъпен.
            </p>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileChange"
            />

            <div class="mt-2 flex items-center gap-4">
              <button
                type="button"
                class="relative group h-[80px] w-[80px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
                @click="openFilePicker"
              >
                <img
                  v-if="imagePreviewUrl"
                  :src="imagePreviewUrl"
                  alt="Profile preview"
                  class="h-full w-full object-cover"
                />

                <span v-else class="material-icons text-gray-300 text-4xl"> photo_camera </span>

                <div
                  class="absolute inset-0 bg-gray-400 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span class="material-icons text-gray-200 text-4xl">photo_camera</span>
                </div>
              </button>
            </div>
          </div>

          <div class="mt-6">
            <label class="block text-[15px] font-medium text-gray-900 mb-2" for="description">
              Повече за Вас*
            </label>
            <textarea
              class="mb-4 mt-1 block w-full px-3 leading-snug text-[13px] py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              id="description"
              name="description"
              placeholder="Разкажете накратко за опита си, проекти по които сте работили и своята специализация."
              rows="4"
              v-model.trim="profile.description"
            ></textarea>
          </div>
        </div>

        <div class="w-full 2xl:max-w-1/2 bg-white px-6 sm:px-8 pt-6 pb-4 rounded-sm border">
          <div class="flex flex-col justify-between h-full">
            <div>
              <h2 class="text-[17px] font-medium text-gray-800 mb-2">Сигурност на профила</h2>
              <p class="text-xs leading-[1.3] text-gray-600">
                Сигурността на профила Ви е важна за нас. Моля, потвърдете имейл и телефон, за да
                защитим достъпа до Вашият акаунт.
              </p>

              <div class="mt-3">
                <div
                  class="flex flex-col sm:flex-row justify-between gap-y-3 pb-2 border-b border-gray-200"
                >
                  <div class="flex items-center">
                    <span class="material-icons-outlined text-gray-500 mr-3">email</span>
                    <div>
                      <span class="text-sm font-medium text-gray-900">Е-mail</span>
                      <span class="text-sm text-gray-500 font-normal italic ml-1">Поверителен</span>
                    </div>
                  </div>
                  <button
                    class="px-3 py-1.5 text-sm text-[#3b6751] bg-[#e7f0eb] border border-gray-300 rounded-sm hover:bg-[#c3dacd] focus:outline-none hover:text-[#e7f0eb]"
                    type="button"
                  >
                    Непотвърден
                  </button>
                </div>

                <div class="mb-4">
                  <div class="flex items-center justify-between pb-1 pt-4">
                    <div class="flex items-center">
                      <span class="material-icons-outlined text-base text-gray-500 mr-2">
                        phone_iphone
                      </span>
                      <div>
                        <div>
                          <span class="text-[15px] font-medium text-gray-900 whitespace-nowrap">
                            Телефонен номер*
                          </span>
                          <span
                            class="text-xs sm:text-[15px] text-gray-500 font-normal italic ml-3"
                          >
                            Поверителен
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p class="text-[13px] leading-[1.3] text-gray-600 mb-3">
                    Телефонът Ви ще бъде споделян само с клиентите на които сте потвърдили
                    резервация.
                  </p>

                  <div class="flex w-full gap-3 border border-gray-300 p-1">
                    <input
                      class="text-[13px] w-full block px-3 py-1.5 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                      id="phone"
                      name="phone"
                      placeholder="Телефонен номер"
                      type="text"
                      v-model.trim="profile.phone"
                    />
                  </div>
                </div>

                <div class="mt-4 border-t border-gray-200">
                  <div class="mt-4 flex items-start gap-2">
                    <input
                      class="accent-[#3b6751] cursor-pointer mt-1 h-4 w-4 border-gray-400 opacity-50 border-2 rounded-sm focus:ring-white"
                      type="checkbox"
                      v-model="profile.publishPhone"
                    />
                    <p class="text-sm text-gray-800 font-medium">
                      Изберете, ако желаете телефонът Ви да бъде публикуван към обява в сайта, за
                      възможност за директна връзка на клиенти.
                    </p>
                  </div>

                  <div class="mt-4 border-t border-gray-200"></div>

                  <div class="mt-4">
                    <label class="block text-[15px] font-medium text-gray-900 mb-2" for="website">
                      Личен сайт
                    </label>
                    <p class="text-[13px] text-gray-600 mb-2">
                      По желание можете да включете линк към личен уебсайт с портфолио.
                    </p>
                    <input
                      class="mb-6 w-full text-xs block px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                      id="website"
                      name="website"
                      placeholder="Линк към личен сайт"
                      type="text"
                      v-model.trim="profile.website"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="error"
              class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
            >
              {{ error }}
            </div>
            <div class="mb-4 flex justify-end">
              <button
                class="py-2 px-4 bg-[#3b6751] opacity-50 text-base hover:bg-white border border-[#3b6751] hover:text-[#3b6751] text-white font-normal rounded-sm focus:outline-none shadow-md mr-1"
                type="button"
                @click="onSubmit"
              >
                Запазете
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRegistrationStore } from '@/stores/registrationStore'
import { registerSpecialist } from '@/api/authApi'
import type { RegisterRequest } from '@/types/Types'
import { useRouter } from 'vue-router'
const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreviewUrl = ref<string | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}
const registration = useRegistrationStore()
const { specialistProfile } = storeToRefs(registration)

const error = ref('')

const profile = specialistProfile

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  profile.value.profileImage = file
  imagePreviewUrl.value = file ? URL.createObjectURL(file) : null
  input.value = ''
}

function validate(): boolean {
  if (!profile.value?.firstName) return false
  if (!profile.value.lastName) return false
  if (!profile.value.description) return false
  if (!profile.value.phone) return false
  if (!registration.email || !registration.password || !registration.role) return false

  return true
}
watch(
  () => profile.value,
  () => {
    if (validate()) {
      error.value = ''
    }
  },
  { deep: true },
)
async function onSubmit() {
  if (!validate()) {
    error.value = 'Моля, попълнете всички полета отбелязани със * за да продължите'
    return
  }
  error.value = ''

  const payload: RegisterRequest = {
    email: registration.email!,
    password: registration.password!,
    role: registration.role!,
    specialistProfile: registration.specialistProfile!,
  }

  try {
    await registerSpecialist(payload)
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  }
}
</script>
