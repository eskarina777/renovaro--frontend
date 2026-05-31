<template>
  <div class="relative group">
    <Sheet v-model:open="isOpen">
      <SheetTrigger as-child>
        <button class="text-gray-500 hover:text-[#77b393]">
          <span class="material-symbols-outlined text[16px] mt-1">add_ad</span>
        </button>
      </SheetTrigger>

      <SheetContent class="w-[360px] max-w-none sm:w-[460px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle class="text-lg flex justify-start font-medium text-gray-800 mb-4">
            Заявка за услуга
          </SheetTitle>
        </SheetHeader>

        <div class="flex-grow py-4 px-2 space-y-4 overflow-y-auto">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Изберете категорията на услугата*
            </label>

            <Select v-model="selectedCategoryId">
              <SelectTrigger
                class="bg-white px-2 order border-gray-300 rounded-sm focus:ring-0.5 focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow text-gray-500"
              >
                <SelectValue placeholder="Изберете категория" />
              </SelectTrigger>

              <SelectContent class="max-h-70">
                <SelectItem
                  v-for="cat in categories"
                  :key="cat.categoryId"
                  :value="String(cat.categoryId)"
                  class="text-gray-500"
                >
                  {{ cat.categoryName }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Заглавие, кратко описание на услугата*
            </label>

            <textarea
              v-model="title"
              class="text-xs w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-0.5 focus:ring-gray-500 focus:border-gray-500"
              rows="3"
              maxlength="50"
            ></textarea>

            <div class="text-[13px] text-gray-500 text-right">{{ title.length }} / 50</div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="description-long">
              Опишете услугата от която се нуждаете*
            </label>

            <textarea
              v-model.trim="description"
              class="text-xs w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-0.5 focus:ring-gray-500 focus:border-gray-500"
              rows="6"
            ></textarea>
          </div>

          <div
            class="bg-[#e7f0eb] text-gray-500 px-3 py-3 rounded-sm mb-6 flex items-start soft-shadow"
            role="alert"
          >
            <span class="material-icons mr-2">info_outline</span>
            <p class="sm:text-[14px] text-[14px]">
              Заявката ще бъде изпратена на най-подходящите изпълнители.
              <span class="hidden sm:inline">
                Изпълнителят, който има възможност да Ви помогне, ще се свърже с Вас чрез
                платформата.
              </span>
            </p>
          </div>

          <div
            v-if="error"
            class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
          >
            {{ error }}
          </div>
        </div>

        <SheetFooter>
          <button
            type="button"
            :disabled="isSubmitting"
            class="bg-gray-700 hover:bg-gray-700 text-white font-mediu py-2 px-4 rounded-md items-center justify-center mt-6 mr-2"
            @click="submitRequest"
          >
            {{ isSubmitting ? 'Изпращане...' : 'Изпратете заявка' }}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <div
      class="text-[14px] hidden lg:inline absolute left-0 -bottom-8 whitespace-nowrap rounded-md bg-gray-100 text-gray-500 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
    >
      Заявка за услуга
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, CreateServiceRequestPayload } from '@/types/Types'
import { ref, onMounted, watch } from 'vue'
import { getCategories, createServiceRequest } from '@/api/data'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const isOpen = ref(false)
const loading = ref(true)
const error = ref<string | null>(null)
const submitError = ref<string | null>(null)
const isSubmitting = ref(false)

const categories = ref<Category[]>([])

const selectedCategoryId = ref<number | null>(null)
const title = ref('')
const description = ref('')

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
})
function validate(): boolean {
  if (!selectedCategoryId.value) return false
  if (!title.value?.trim()) return false
  if (!description.value?.trim()) return false
  return true
}

watch([selectedCategoryId, title, description], () => {
  if (validate()) error.value = ''
})

async function submitRequest() {
  error.value = null
  submitError.value = null

  if (!validate()) {
    error.value = 'Моля, попълнете всички полета отбелязани със *.'
    return
  }
  const payload: CreateServiceRequestPayload = {
    categoryId: Number(selectedCategoryId.value),
    title: title.value.trim(),
    description: description.value.trim(),
  }

  isSubmitting.value = true
  try {
    await createServiceRequest(payload)
    isOpen.value = false
    selectedCategoryId.value = null
    title.value = ''
    description.value = ''
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : String(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
