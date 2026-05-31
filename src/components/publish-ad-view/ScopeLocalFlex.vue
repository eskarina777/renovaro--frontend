<template>
  <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:pt-4 items-start">
      <div class="w-full 2xl:max-w-1/2 bg-white p-4 sm:p-6 rounded-sm border">
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <div class="relative w-full sm:w-1/2">
            <label class="block text-[17px] font-medium text-gray-700 mb-3">Град*</label>
            <Select :modelValue="city" @update:modelValue="(value: any) => onSelect('city', value)">
              <SelectTrigger
                class="flex justify-start w-full h-10 text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              >
                <SelectValue
                  class="text-gray-500 text-[15px] w-full"
                  :placeholder="city ? city.cityName : 'Изберете град'"
                />
              </SelectTrigger>
              <SelectContent class="max-h-56 overflow-y-auto">
                <SelectItem
                  v-for="city in cities"
                  :key="city.cityId"
                  :value="city"
                  class="text-gray-500"
                >
                  {{ city.cityName }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div></div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 mb-5">
          <div class="relative flex-1 w-full sm:w-1/2">
            <label class="block text-[17px] font-medium text-gray-700 mb-3">Цена</label>
            <div class="flex items-center gap-2">
              <div class="relative w-1/2">
                <input
                  class="w-full text-[14px] block px-3 h-[36px] bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                  v-model="localFlexStore.servicePriceMin"
                  placeholder="от*"
                  type="number"
                  min="0"
                />
              </div>
              <div class="relative w-1/2">
                <input
                  class="w-full text-[14px] block px-3 h-[36px] bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                  v-model="localFlexStore.servicePriceMax"
                  placeholder="до"
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div class="relative flex-1 w-full sm:w-1/2">
            <label class="block text-[17px] font-medium text-gray-700 mb-3">Ценообразуване*</label>
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
        <p class="text-xs sm:text-[13px] leading-[1.3] text-gray-600 mb-3">
          Ако не желаете да определяте ценови диапазон,моля попълнете единствено oт* <br />
          Изберете "крайна цена" ако не желаете да използвате ценообр. единица.
        </p>
        <div class="flex gap-2 mt-8">
          <Switch
            :model-value="hasCalendar"
            @update:model-value="(val) => (hasCalendar = val)"
            class="data-[state=checked]:bg-[#77b393] mt-1"
          />
          <p class="text-xs sm:text-base font-medium text-[#77b393] mb-2">
            Отбележете, ако имате желание да предоставите налични свободни часове за за резервация
            на консултация/оглед чрез платформата в календара ни, като вида на консултацията може да
            бъде безплатна или платена
          </p>
        </div>
      </div>
      <div :class="hasCalendar === false ? 'opacity-40 blur-[0.5px] pointer-events-none' : ''">
        <div class="w-full 2xl:max-w-1/2 bg-white p-6 rounded-sm border">
          <div class="flex flex-col sm:flex-row gap-3 mb-5">
            <div class="relative flex-1 w-full sm:w-1/2">
              <label class="block text-[17px] font-medium text-gray-700 mb-3"
                >Вид на консултацията</label
              >
              <Select
                :modelValue="consultationType"
                @update:modelValue="(value: any) => onSelect('consultationType', value)"
              >
                <SelectTrigger
                  class="flex justify-start w-full text-[15px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                >
                  <SelectValue
                    class="text-gray-500 text-[14px] w-full"
                    :placeholder="consultationType ? consultationType : 'Изберете'"
                  />
                </SelectTrigger>

                <SelectContent class="max-h-56 font-normal text-[14px] overflow-y-auto">
                  <SelectItem
                    v-for="(type, index) in ['безплатна', 'платена']"
                    :key="index"
                    :value="type"
                    class="text-gray-500 text-[14px]"
                  >
                    {{ type }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="relative flex-1 w-full sm:w-1/2">
              <div
                :class="
                  consultationType === 'безплатна'
                    ? 'opacity-40 blur-[0.5px] pointer-events-none'
                    : ''
                "
              >
                <label class="block text-[17px] font-medium text-gray-700 mb-3">Цена</label>
                <div class="flex items-center gap-2">
                  <div class="relative w-1/2">
                    <input
                      class="w-full text-[14px] block px-3 h-[36px] bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                      v-model="localFlexStore.consultationPriceMin"
                      placeholder="от"
                      type="number"
                    />
                  </div>
                  <div class="relative w-1/2">
                    <input
                      class="w-full text-[14px] block px-3 h-[36px] bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                      v-model="localFlexStore.consultationPriceMax"
                      placeholder="до"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <label class="block text-[16px] font-medium text-gray-700 mb-1.5" for="fullName"
              >Добавете въпрос към клиента</label
            >
            <p class="text-xs sm:text-[13px] leading-[1.3] text-gray-600 mb-3">
              По желание добавете въпрос към клиента, като отговорите биха помогнали в решението
              дали да потвърдите резервацията.
            </p>
            <textarea
              class="mb-1 mt-1 block w-full px-3 leading-[1.2] text-gray-500 text-xs py-1 sm:py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              v-model="providerQuestion"
              rows="1"
              placeholder="Имате ли възможност да осигурите паркинг?"
              maxlength="400"
            ></textarea>
          </div>
          <div class="mt-1 text-[12px] text-gray-500 text-right">
            <span>{{ providerQuestion?.length ?? 0 }}</span> / 400
          </div>
          <div class="flex items-start gap-2 text-gray-600">
            <span class="material-icons-outlined text-sm align-middle mt-1">info</span>
            <div>
              <p class="font-medium text-[16px]">Важна информация</p>
            </div>
          </div>
          <div class="">
            <textarea
              class="mb-1 mt-1 block w-full px-3 leading-[1.2] text-gray-500 text-xs py-1 sm:py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              v-model="localServiceInfo"
              rows="3"
              placeholder="Поради естеството на работата е възможно изоставане в графика – предварително благодарим за разбирането! Очаквана продължителност на консултацията 15-60 мин."
              maxlength="160"
            ></textarea>
            <div class="mt-1 text-[12px] text-gray-500 text-right">
              <span>{{ localServiceInfo?.length ?? 0 }}</span> / 160
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end mt-12 mb-8 space-y-3 relative">
      <div
        v-if="touchedStep && !isStepValid()"
        class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
      >
        Моля попълнете всички полета със &nbsp;*&nbsp; <br />за да продължите.
      </div>
      <StepperNextButton @click="onNext" />
      <StepperBackButton @click="onBack" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { City, PricingUnitType } from '@/types/Types'
import type { LocalFlexFieldKey, LocalFlexState } from '@/stores/localFlexStore'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import StepperNextButton from './common/StepperNextButton.vue'
import StepperBackButton from './common/StepperBackButton.vue'
import { useLocalFlexStore } from '@/stores/localFlexStore'
import { usePublishAdStore } from '@/stores/publishAdStore'
import { getCities, getPricingUnits } from '@/api/data'
import { storeToRefs } from 'pinia'
import { bus } from '@/events/bus'
import { Switch } from '@/components/ui/switch'
const publishAdStore = usePublishAdStore()
const { currentStep, hasCalendar, pricingUnit } = storeToRefs(publishAdStore)
const STEP_NUMBER = 3
const touchedStep = ref(false)
const localFlexStore = useLocalFlexStore()

const { city, consultationPriceMin, consultationPriceMax, consultationType } =
  storeToRefs(localFlexStore)
const providerQuestion = ref(localFlexStore.providerQuestion ?? null)
const localServiceInfo = ref(localFlexStore.localServiceInfo ?? null)

const loading = ref(true)
const error = ref<string | null>(null)
const cities = ref<City[]>([])
const pricingUnits = ref<PricingUnitType[]>([])

async function loadAll() {
  loading.value = true
  try {
    const [cit, units] = await Promise.all([getCities(), getPricingUnits()])
    cities.value = cit
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

function onSelectPricingUnit(value: PricingUnitType | null) {
  publishAdStore.setPricingUnit(value)
}

function onSelect<K extends LocalFlexFieldKey>(key: K, value: LocalFlexState[K] | null) {
  localFlexStore.setField(key, value as LocalFlexState[K])
}

function handleSaveEvent() {
  if (currentStep.value !== STEP_NUMBER) return

  if (!hasCalendar) {
    localFlexStore.setConsultationPriceMin(consultationPriceMin.value)
    localFlexStore.setConsultationPriceMax(consultationPriceMax.value)
    localFlexStore.setProviderQuestion(providerQuestion.value)
    localFlexStore.setLocalServiceInfo(localServiceInfo.value)
  }
}

function isStepValid(): boolean {
  const hasCity = city.value !== null
  const hasPricingUnit = pricingUnit.value !== null

  return hasCity && hasPricingUnit
}

function onNext() {
  touchedStep.value = true
  if (!isStepValid()) {
    return
  }
  handleSaveEvent()
  publishAdStore.markStepSaved(currentStep.value)
  if (hasCalendar.value === true) publishAdStore.goToStep(currentStep.value + 1)
  else publishAdStore.goToStep(currentStep.value + 2)

  touchedStep.value = false
}
function onBack() {
  publishAdStore.goToStep(currentStep.value - 1)
}

onMounted(() => {
  bus.on('save-current-state-event', handleSaveEvent)
  loadAll()
})
onUnmounted(() => bus.off('save-current-state-event', handleSaveEvent))
</script>
