<template>
  <section>
    <div class="pb-4 mx-auto text-center relative">
      <Switch
        :model-value="currentPackage.isEnabled"
        @update:model-value="(val: any) => (currentPackage.isEnabled = val)"
        class="data-[state=checked]:bg-[#77b393] mt-1 absolute right-1"
        :disabled="props.packageType.packageTypeCode === 'basic'"
      />
      <h3 class="font-medium text-xl text-[#77b393]">{{ props.packageType.packageTypeLabel }}</h3>
    </div>

    <div :class="!currentPackage.isEnabled ? 'opacity-40 blur-[0.5px] pointer-events-none' : ''">
      <div class="mb-2">
        <h2 class="text-[17px] font-medium text-gray-700 mb-1">Заглавие на пакета*</h2>
        <p class="text-gray-500 text-[14px] leading-[1.2] mb-3">
          Напишете кратко и конкретно заглавие, което да привлича вниманието.
        </p>
        <textarea
          class="mt-2 block w-full px-3 leading-snug text-gray-500 text-[14px] py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          v-model="packageTitle"
          rows="1"
          maxlength="30"
        ></textarea>
        <div class="mt-1 text-[13px] text-gray-500 text-right">
          <span>{{ packageTitle?.length ?? 0 }}</span> / 30
        </div>
      </div>
      <div class="mb-6">
        <h2 class="text-[17px] font-medium text-gray-700 mb-1">Описание на услугата*</h2>
        <p class="text-gray-500 text-[14px] leading-[1.2] mb-3">
          Опишете съдъжанието и обхавата на предлаганата в Вас услуга.
        </p>
        <div class="mce-editor">
          <Editor
            :api-key="mce_key"
            v-model="packageDescription"
            :init="{
              menubar: false,
              selector: '#textarea',
              plugins: 'lists advlist',
              toolbar: ' fontsize | bold italic | bullist numlist | undo redo ',
              height: 200,
              font_size_formats: '12px 14px 16px',
              highlight_on_focus: false,
              content_style: `body {font-family: 'Montserrat';}`,
            }"
          />
        </div>
      </div>
      <div class="mb-6">
        <label class="block text-[17px] font-medium text-gray-700 mb-2">Ценoобразуване*</label>
        <div class="flex space-x-3">
          <div class="flex flex-col justify-start w-1/2">
            <p class="text-gray-500 text-[14px] leading-[1.2] mb-1">Цена</p>
            <input
              class="w-full text-[14px] mt-1 block px-3 h-[36px] bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              v-model="currentPackage.packagePrice"
              type="number"
              min="0"
            />
          </div>
          <div class="flex flex-col justify-start w-1/2">
            <p class="text-gray-500 text-[14px] leading-[1.2] mb-1">Ценoобраз. единица</p>
            <Select
              :modelValue="pricingUnit"
              @update:modelValue="(value: any) => onSelectPricingUnit(value)"
            >
              <SelectTrigger
                class="flex justify-start w-full text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              >
                <SelectValue
                  class="text-gray-500 text-[14px] w-full"
                  :placeholder="
                    pricingUnit?.pricingUnitLabel ? pricingUnit.pricingUnitLabel : 'Изберете'
                  "
                />
              </SelectTrigger>
              <SelectContent class="max-h-56 font-normal text-[14px] overflow-y-auto">
                <SelectItem
                  v-for="pricingUnit in pricingUnits"
                  :key="pricingUnit.pricingUnitId"
                  :value="pricingUnit"
                  class="text-gray-500 text-[14px]"
                >
                  {{ pricingUnit.pricingUnitLabel }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <label class="block text-[17px] font-medium text-gray-700 mb-3">Условия за изпълнение*</label>
      <div class="flex space-x-3 mb-6">
        <div class="flex flex-col justify-start w-1/2">
          <p class="text-gray-500 text-[14px] leading-[1.2] mb-1">Време за изработка</p>
          <Select
            :modelValue="currentPackage.deliveryDays"
            @update:modelValue="(value: any) => onSelect('deliveryDays', value)"
          >
            <SelectTrigger
              class="flex justify-start w-full text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
            >
              <SelectValue
                class="text-gray-500 text-[14px] w-full"
                :placeholder="
                  currentPackage.deliveryDays ? String(currentPackage.deliveryDays) : 'Изберете'
                "
              />
            </SelectTrigger>
            <SelectContent class="max-h-56 font-normal text-[14px] overflow-y-auto">
              <SelectItem
                v-for="option in deliveryDaysOptions"
                :key="option.value"
                :value="option.value"
                class="text-gray-500 text-[14px]"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-col justify-start w-1/2">
          <p class="text-gray-500 text-[14px] leading-[1.2] mb-1">Ревизии</p>
          <Select
            :modelValue="currentPackage.revisionCount"
            @update:modelValue="(value: any) => onSelect('revisionCount', value)"
          >
            <SelectTrigger
              class="flex justify-start w-full text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
            >
              <SelectValue
                class="text-gray-500 text-[14px] w-full"
                :placeholder="
                  currentPackage.revisionCount ? String(currentPackage.revisionCount) : 'Изберете'
                "
              />
            </SelectTrigger>
            <SelectContent class="max-h-56 font-normal text-[14px] overflow-y-auto">
              <SelectItem
                v-for="option in revisionCountOptions"
                :key="option.value"
                :value="option.value"
                class="text-gray-500 text-[14px]"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <label class="block text-[17px] font-medium text-gray-700 mb-3">Обхват на услугата</label>
      <div class="flex space-x-3 mb-6">
        <div class="flex flex-col justify-start w-1/2">
          <p class="text-gray-500 text-[14px] leading-[1.2] mb-1">Визуализации</p>
          <Select
            :modelValue="currentPackage.renderCount"
            @update:modelValue="(value: any) => onSelect('renderCount', value)"
          >
            <SelectTrigger
              class="flex justify-start w-full text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
            >
              <SelectValue
                class="text-gray-500 text-[14px] w-full"
                :placeholder="
                  currentPackage.renderCount ? String(currentPackage.renderCount) : 'Изберете'
                "
              />
            </SelectTrigger>
            <SelectContent class="max-h-56 font-normal text-[14px] overflow-y-auto">
              <SelectItem
                v-for="option in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="option"
                :value="option"
                class="text-gray-500 text-[14px]"
              >
                {{ option }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-col justify-start w-1/2">
          <p class="text-gray-500 text-[14px] leading-[1.2] mb-1">Детайли</p>
          <Select
            :modelValue="currentPackage.detailDrawingCount"
            @update:modelValue="(value: any) => onSelect('detailDrawingCount', value)"
          >
            <SelectTrigger
              class="flex justify-start w-full text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
            >
              <SelectValue
                class="text-gray-500 text-[14px] w-full"
                :placeholder="
                  currentPackage.detailDrawingCount
                    ? String(currentPackage.detailDrawingCount)
                    : 'Изберете'
                "
              />
            </SelectTrigger>
            <SelectContent class="max-h-56 font-normal text-[14px] overflow-y-auto">
              <SelectItem
                v-for="option in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="option"
                :value="option"
                class="text-gray-500 text-[14px]"
              >
                {{ option }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="mb-6">
        <p class="text-[17px] font-medium text-gray-700 mb-4">Пакета включва</p>
        <div class="flex gap-2 mb-2">
          <input
            v-model="currentPackage.has3DModel"
            class="accent-[#68967e] opacity-80 cursor-pointer h-4 w-4 text-[#77b393] border-2 border-[#77b393] rounded-sm focus:ring-white"
            type="checkbox"
          />
          <p class="text-sm sm:text-[16px] font-medium text-[#77b393]">3D модел</p>
        </div>
        <div class="flex gap-2 mb-2">
          <input
            v-model="currentPackage.has2DDrawings"
            class="accent-[#68967e] opacity-80 cursor-pointer h-4 w-4 text-[#77b393] border-2 border-[#77b393] rounded-sm focus:ring-white"
            type="checkbox"
          />
          <p class="text-sm sm:text-[16px] font-medium text-[#77b393]">2D чертежи</p>
        </div>
        <div class="flex gap-2 mb-2">
          <input
            v-model="currentPackage.hasSourceFile"
            class="accent-[#68967e] opacity-80 cursor-pointer h-4 w-4 text-[#77b393] border-2 border-[#77b393] rounded-sm focus:ring-white"
            type="checkbox"
          />
          <p class="text-sm sm:text-[16px] font-medium text-[#77b393]">Изходен файл</p>
        </div>
      </div>
      <div class="flex items-start gap-2 text-gray-600">
        <span class="material-icons-outlined text-sm align-middle">info</span>
        <div>
          <p class="font-medium text-[17px]">Важна информация</p>
        </div>
      </div>
      <div class="">
        <textarea
          class="mb-1 mt-1 block w-full px-3 leading-[1.2] text-gray-500 text-xs py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          v-model="currentPackage.packageInfo"
          rows="2"
          maxlength="120"
        ></textarea>
        <div class="mt-1 text-[13px] text-gray-500 text-right">
          <span>{{ currentPackage.packageInfo?.length ?? 0 }}</span> / 120
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { usePublishAdStore } from '@/stores/publishAdStore'
import type { PackageFieldKey, PackageType } from '@/stores/freelanceStore'
import { useFreelanceStore } from '@/stores/freelanceStore'
import { storeToRefs } from 'pinia'
import { TYNI_MCE_KEY } from '@/utils/constants'
import Editor from '@tinymce/tinymce-vue'
import { bus } from '@/events/bus'
import { deliveryDaysOptions, revisionCountOptions } from '@/utils/constants'
import type { PackageTypeResponse, PricingUnitType } from '@/types/Types'
import { Switch } from '@/components/ui/switch'
import { getPricingUnits } from '@/api/data'
const mce_key = ref(TYNI_MCE_KEY)
const STEP_NUMBER = 3

const props = defineProps<{ packageType: PackageTypeResponse }>()
const emit = defineEmits<{
  (e: 'state-change', payload: { code: PackageType; isValid: boolean }): void
}>()

const publishAdStore = usePublishAdStore()
const { currentStep, pricingUnit } = storeToRefs(publishAdStore)
const freelanceStore = useFreelanceStore()
const pkg = props.packageType.packageTypeCode
const currentPackage = computed(() => freelanceStore[pkg])
const packageTitle = ref(freelanceStore[pkg].packageTitle ?? null)
const packageDescription = ref(freelanceStore[pkg].packageDescription ?? null)
const packageInfo = ref(freelanceStore[pkg].packageInfo ?? null)
const loading = ref(true)
const error = ref<string | null>(null)
const pricingUnits = ref<PricingUnitType[]>([])

function onSelectPricingUnit(value: PricingUnitType | null) {
  publishAdStore.setPricingUnit(value)
}

function onSelect(key: PackageFieldKey, value: number | boolean | string | null) {
  freelanceStore.setField(pkg, key, value)
}
async function loadAll() {
  loading.value = true
  try {
    const [units] = await Promise.all([getPricingUnits()])
    pricingUnits.value = units
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

function handleSaveEvent() {
  if (currentStep.value !== STEP_NUMBER) return

  freelanceStore.setPackageTitle(pkg, packageTitle.value)
  freelanceStore.setPackageDescription(pkg, packageDescription.value)
  freelanceStore.setPackageInfo(pkg, packageInfo.value)
}

onMounted(() => {
  bus.on('save-current-state-event', handleSaveEvent)
  loadAll()
})
onUnmounted(() => bus.off('save-current-state-event', handleSaveEvent))

function isLocalValid(): boolean {
  const hasTitle = packageTitle.value !== null && packageTitle.value.trim().length > 0

  const hasDescription =
    packageDescription.value !== null && packageDescription.value.trim().length > 0

  return hasTitle && hasDescription
}
watch(
  [packageTitle, packageDescription, packageInfo],
  () => {
    emit('state-change', { code: pkg, isValid: isLocalValid() })
  },
  { immediate: true },
)
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
