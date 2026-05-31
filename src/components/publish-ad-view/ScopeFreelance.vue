<template>
  <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <h2 class="text-[18px] font-medium text-gray-700 mb-2"></h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-start">
      <FreelancePackageCard
        class="2xl:max-w-1/3 bg-white pt-4 p-3 sm:p-6 rounded-sm border"
        v-for="packageType in packageTypes"
        :key="packageType.packageTypeId"
        :packageType="packageType"
        @state-change="onCardStateChange"
      />
    </div>
    <div class="flex flex-col items-end mt-12 mb-8 space-y-3 relative">
      <div
        v-if="touchedStep && !isStepValid()"
        class="px-5 py-4 opacity-60 max-w-[450px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
      >
        Моля попълнете всички полета отбелязани отбелязани със * за да продължите.
      </div>
      <StepperNextButton @click="onNext" />
      <StepperBackButton @click="onBack" />
    </div>
  </div>
</template>
<script setup lang="ts">
import FreelancePackageCard from './common/FreelancePackageCard.vue'
import { ref, onMounted } from 'vue'
import type { PackageTypeResponse, PricingUnitType } from '@/types/Types'
import { getPricingUnits, getPackageTypes } from '@/api/data'
import { usePublishAdStore } from '@/stores/publishAdStore'
import { storeToRefs } from 'pinia'
import StepperNextButton from './common/StepperNextButton.vue'
import StepperBackButton from './common/StepperBackButton.vue'
import { useFreelanceStore } from '@/stores/freelanceStore'
import type { PackageType } from '@/stores/freelanceStore'
import { bus } from '@/events/bus'
const touchedStep = ref(false)
const loading = ref(true)
const error = ref<string | null>(null)
const publishAdStore = usePublishAdStore()
const { currentStep } = storeToRefs(publishAdStore)
const freelanceStore = useFreelanceStore()
const store = freelanceStore
const types: PackageType[] = ['basic', 'standard', 'premium']
const pricingUnits = ref<PricingUnitType[]>([])
const packageTypes = ref<PackageTypeResponse[]>([])

onMounted(async () => {
  try {
    const [types, units] = await Promise.all([getPricingUnits(), getPackageTypes()])
    pricingUnits.value = types
    packageTypes.value = units.map((u) => ({
      ...u,
      packageTypeCode: u.packageTypeCode.toLowerCase() as PackageType,
    }))
    console.log(pricingUnits)
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

function onBack() {
  publishAdStore.goToStep(currentStep.value - 1)
}
async function onNext() {
  touchedStep.value = true
  if (!isStepValid()) return

  bus.emit('save-current-state-event')

  publishAdStore.markStepSaved(currentStep.value)
  publishAdStore.goToStep(currentStep.value + 2)
  touchedStep.value = false
}
const packageValidity = ref<Record<PackageType, boolean>>({
  basic: false,
  standard: false,
  premium: false,
})
function onCardStateChange(payload: { code: PackageType; isValid: boolean }) {
  packageValidity.value[payload.code] = payload.isValid
}

function isStepValid(): boolean {
  return types
    .filter((t) => store[t].isEnabled)
    .every((t) => {
      const pkg = store[t]
      const fieldIsValid = packageValidity.value[t] === true
      const hasPrice = pkg.packagePrice !== null
      const hasDeliveryDays = pkg.deliveryDays !== null
      const hasRevisionCount = pkg.revisionCount !== null

      return fieldIsValid && hasPrice && hasDeliveryDays && hasRevisionCount
    })
}
</script>
