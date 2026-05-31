<template>
  <StepperNav />
  <AdPricingPlan v-if="currentStep === 1" />
  <GeneralOverview v-if="currentStep === 2" />
  <div v-if="currentStep === 3">
    <ScopeFreelance v-if="serviceTypeCode === 'FREELANCE'" />
    <ScopeLocalFlex v-if="serviceTypeCode === 'LOCAL_FLEX'" />
  </div>
  <CalenderLocal v-if="currentStep === 4" />
  <GalleryStep v-if="currentStep === 5" />
  <PreviewPublishFreelance v-if="currentStep === 6" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePublishAdStore } from '@/stores/publishAdStore'
import StepperNav from '@/components/publish-ad-view/common/StepperNav.vue'
import AdPricingPlan from '@/components/publish-ad-view/AdPricingPlan.vue'
import GeneralOverview from '@/components/publish-ad-view/GeneralOverview.vue'
import ScopeFreelance from '@/components/publish-ad-view/ScopeFreelance.vue'
import ScopeLocalFlex from '@/components/publish-ad-view/ScopeLocalFlex.vue'
import CalenderLocal from '@/components/publish-ad-view/CalenderLocal.vue'
import GalleryStep from '@/components/publish-ad-view/GalleryStep.vue'
import PreviewPublishFreelance from '@/components/publish-ad-view/PreviewPublishFreelance.vue'

const store = usePublishAdStore()
const { currentStep, serviceTypeCode } = storeToRefs(store)
</script>
