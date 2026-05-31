<template>
  <div class="bg-white px-[25px] md:px-[105px] md:max-w-[1226px] xl:mx-auto">
    <div class="py-8 flex flex-col lg:flex-row gap-8">
      <div class="order-2 lg:order-1">
        <div class="flex-1 bg-white p-2 sm:p-8 sm:rounded-md sm:soft-shadow">
          <div class="mb-1">
            <h2 class="text-[18px] font-medium text-gray-700 mb-2">Заглавие на обявата*</h2>
            <p class="text-gray-500 text-sm mb-3">
              Напишете ясно и конкретно заглавие за обявата, което да привлича вниманието. Думите
              които включва ще се използват при търсене на услуги чрез търсачката.
            </p>
            <textarea
              class="mt-2 block w-full px-3 leading-snug text-gray-500 text-[14px] py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              v-model="title"
              rows="2"
              maxlength="150"
            ></textarea>
            <div class="mt-1 text-[13px] text-gray-500 text-right">
              <span>{{ title?.length ?? 0 }}</span> / 150
            </div>
          </div>

          <div class="mb-6">
            <h2 class="text-[18px] font-medium text-gray-700 mb-2">Описание на услугата*</h2>
            <p class="text-gray-500 text-sm mb-3">
              Опишете обявата със съдържателен текст, който да помогне на клиентите да се запознаят
              с всички аспекти на предлаганата от Вас услуга.
            </p>
            <div class="mce-editor">
              <Editor
                :api-key="mce_key"
                v-model="description"
                :init="{
                  menubar: false,
                  selector: '#textarea',
                  plugins: 'lists advlist',
                  toolbar: ' fontsize  | bold italic | bullist numlist | undo redo ',
                  height: 200,
                  font_size_formats: '12px 14px 16px',
                  highlight_on_focus: false,
                  content_style: `body {font-family: 'Montserrat';} `,
                }"
              />
            </div>
          </div>
          <div class="mb-6">
            <h2 class="text-[18px] font-medium text-gray-700 mb-2">Категория и подкатегория*</h2>
            <p class="text-gray-500 text-sm mb-3">
              Изберете в коя категория и подкатегория попада услугата, която предлагате.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="relative flex-1">
                <Select
                  :modelValue="category ? category.categoryId : null"
                  @update:modelValue="onCategoryChange"
                >
                  <SelectTrigger
                    class="text-base bg-white px-4 h-11 border border-gray-300 rounded-sm focus:ring-0.5 focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow text-gray-500"
                  >
                    <SelectValue class="text-[14p]" placeholder="Категория" />
                  </SelectTrigger>

                  <SelectContent class="max-h-56 overflow-y-auto">
                    <SelectItem
                      v-for="cat in categories"
                      :key="cat.categoryId"
                      :value="cat.categoryId"
                      class="text-gray-500"
                    >
                      {{ cat.categoryName }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="relative flex-1">
                <Select
                  :modelValue="subcategory ? subcategory.subcategoryId : null"
                  @update:modelValue="onSubcategoryChange"
                >
                  <SelectTrigger
                    class="text-base bg-white px-4 h-11 border border-gray-300 rounded-sm focus:ring-0.5 focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow text-gray-500"
                  >
                    <SelectValue class="text-[14p]" placeholder="Подкатегория" />
                  </SelectTrigger>

                  <SelectContent class="max-h-56 overflow-y-auto">
                    <SelectItem
                      v-for="sub in subcategories"
                      :key="sub.subcategoryId"
                      :value="sub.subcategoryId"
                      class="text-gray-500"
                    >
                      {{ sub.subcategoryName }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div class="flex items-start gap-2 text-gray-600 mt-4">
            <span class="material-icons-outlined text-sm flex mt-0.5">info</span>
            <div>
              <p class="font-medium text-[17px]">Изисквания за изпълнение</p>
            </div>
          </div>
          <div class="">
            <textarea
              class="mb-1 mt-1 block w-full px-3 leading-[1.2] text-gray-500 text-xs py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              v-model="info"
              rows="2"
              maxlength="120"
            ></textarea>
            <div class="mt-1 text-[13px] text-gray-500 text-right">
              <span>{{ info?.length ?? 0 }}</span> / 120
            </div>
          </div>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <GeneralOrviewInstructions />
      </div>
    </div>
    <div class="flex flex-col items-end mt-12 mb-8 space-y-3 relative">
      <div
        v-if="touchedStep && !isStepValid()"
        class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
      >
        Моля попълнете всички полета отбелязани отбелязани със * за да продължите.
      </div>
      <StepperNextButton @click="onNext" />
      <StepperBackButton @click="onBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GeneralOrviewInstructions from './common/GeneralOrviewInstructions.vue'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import type { Category, Subcategory } from '@/types/Types'
import { getCategories, getSubcategoriesCategory } from '@/api/data'
import { usePublishAdStore } from '@/stores/publishAdStore'
import { storeToRefs } from 'pinia'
import StepperNextButton from './common/StepperNextButton.vue'
import StepperBackButton from './common/StepperBackButton.vue'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { bus } from '@/events/bus'
import Editor from '@tinymce/tinymce-vue'
import { TYNI_MCE_KEY } from '@/utils/constants'

const STEP_NUMBER = 2
const loading = ref(true)
const error = ref<string | null>(null)
const categories = ref<Category[]>([])
const subcategories = ref<Subcategory[]>([])
const publishAdStore = usePublishAdStore()
const { currentStep } = storeToRefs(publishAdStore)
const { category } = storeToRefs(publishAdStore)
const { subcategory } = storeToRefs(publishAdStore)

const title = ref(publishAdStore.adTitle ?? null)
const description = ref(publishAdStore.adDescription ?? null)
const info = ref(publishAdStore.adInfo ?? null)
const mce_key = ref(TYNI_MCE_KEY)
const touchedStep = ref(false)

function isStepValid(): boolean {
  const hasTitle = title.value !== null && title.value.trim().length > 0
  const hasDescription = description.value !== null && description.value.trim().length > 0
  const hasCategory = category.value !== null
  const hasSubcategory = subcategory.value !== null

  return hasTitle && hasDescription && hasCategory && hasSubcategory
}
function onNext() {
  touchedStep.value = true

  if (!isStepValid()) {
    return
  }

  publishAdStore.setAdTitle(title.value)
  publishAdStore.setAdDescription(description.value)
  publishAdStore.setAdInfo(info.value)
  publishAdStore.markStepSaved(currentStep.value)
  publishAdStore.goToStep(currentStep.value + 1)

  touchedStep.value = false
}

function handleSaveEvent() {
  if (currentStep.value === STEP_NUMBER) {
    publishAdStore.setAdTitle(title.value)
    publishAdStore.setAdDescription(description.value)
    publishAdStore.setAdInfo(info.value)
  }
}

function onCategoryChange(value: unknown) {
  if (value === null || value === '') {
    category.value = null
    return
  }

  const id = typeof value === 'number' ? value : Number(value)
  const selected = categories.value.find((cat) => cat.categoryId === id) || null

  category.value = selected

  if (selected) {
    publishAdStore.setServiceType(selected.categoryId)
  }
}

function onSubcategoryChange(value: unknown) {
  if (value === null || value === '') {
    subcategory.value = null
    return
  }

  const id = typeof value === 'number' ? value : Number(value)
  const selected = subcategories.value.find((sub) => sub.subcategoryId === id) || null

  subcategory.value = selected
}

async function load() {
  try {
    categories.value = await getCategories()
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
const categoryId = computed(() => (category.value ? category.value.categoryId : null))
watch(categoryId, async (newCategoryId) => {
  if (newCategoryId !== null) getSubcategoriesByCategoryId(newCategoryId)
})

async function getSubcategoriesByCategoryId(id: number) {
  try {
    subcategories.value = await getSubcategoriesCategory(id)
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
onMounted(() => {
  if (categoryId.value !== null) {
    getSubcategoriesByCategoryId(categoryId.value)
  }
  load()
  bus.on('save-current-state-event', handleSaveEvent)
})

onUnmounted(() => {
  bus.off('save-current-state-event', handleSaveEvent)
})

function onBack() {
  publishAdStore.goToStep(currentStep.value - 1)
}
</script>
<style>
.mce-editor .tox-tinymce {
  border-radius: 4px !important;
}

.mce-editor .tox-tbtn--enabled,
.mce-editor .tox-tbtn--enabled:hover {
  background-color: #e5e7eb !important;
  box-shadow: none !important;
}
</style>
