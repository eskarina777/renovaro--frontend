<template>
  <div class="bg-white px-[25px] md:px-[105px] md:max-w-[1370px] xl:mx-auto">
    <h2 class="text-lg md:text-xl font-medium text-gray-600 mb-10 mt-8">
      Изберете продължителност на обявата
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <AdPricingPlanCard
        v-for="plan in plans"
        :key="plan.adPricingPlanId"
        :plan="plan"
        :selected="plan.adPricingPlanId === selectedPlanId"
        @select="selectPlan"
      />
    </div>

    <div class="flex flex-col items-end mt-20 mb-16 space-y-3 relative">
      <div
        v-if="touchedStep && !isStepValid()"
        class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
      >
        Моля изберете план, за да продължите.
      </div>
      <StepperNextButton @click="onNext" />
      <StepperBackButton @click="goToHomePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { AdPricingPlan, PricingCodeType } from '@/types/Types'
import { getAdPricingPlans } from '@/api/data'
import { usePublishAdStore } from '@/stores/publishAdStore'
import { storeToRefs } from 'pinia'
import StepperNextButton from './common/StepperNextButton.vue'
import AdPricingPlanCard from './common/AdPricingPlanCard.vue'
import { bus } from '@/events/bus'
import StepperBackButton from './common/StepperBackButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const STEP_NUMBER = 1
const loading = ref(true)
const error = ref<string | null>(null)
const plans = ref<AdPricingPlan[]>([])

const publishAdStore = usePublishAdStore()
const { currentStep } = storeToRefs(publishAdStore)
const selectedPlanId = computed(() => publishAdStore.adPricingPlan?.adPricingPlanId ?? null)
const touchedStep = ref(false)

function isStepValid(): boolean {
  const hasPlan = publishAdStore.adPricingPlan !== null
  return hasPlan
}

function goToHomePage() {
  router.push('/')
}

function onNext() {
  touchedStep.value = true
  if (!isStepValid()) {
    return
  }
  publishAdStore.markStepSaved(currentStep.value)
  publishAdStore.goToStep(currentStep.value + 1)
}
async function load() {
  try {
    plans.value = await getAdPricingPlans()
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

function selectPlan(id: number) {
  const plan = plans.value.find((p) => p.adPricingPlanId === id)
  if (!plan) return

  publishAdStore.setPricingPlan(plan)
  publishAdStore.setAdExpirationDateFromPricing(plan.planCode as PricingCodeType)
}

function handleSaveEvent() {
  const plan = publishAdStore.adPricingPlan
  if (!plan) return
  if (currentStep.value === STEP_NUMBER) {
    publishAdStore.setPricingPlan(plan)
    console.log('saved to store', plan)
  }
}
onMounted(() => {
  load()
  bus.on('save-current-state-event', handleSaveEvent)
})

onUnmounted(() => {
  bus.off('save-current-state-event', handleSaveEvent)
})
</script>
