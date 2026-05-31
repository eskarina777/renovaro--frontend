<template>
  <div v-if="payload">
    <div
      class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto mb-12 mt-5"
    >
      <div class="mb-6 mt-6">
        <AdSubgategoryPath
          :category="publishAdStore.category"
          :subcategory="publishAdStore.subcategory"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div
          class="order-2 lg:order-1 2xl:max-w-1/2 w-full bg-white sm:p-6 rounded-md sm:soft-shadow"
        >
          <h1 class="text-base sm:text-lg mb-8 font-medium text-gray-600">
            {{ payload.ad.title }}
          </h1>
          <div class="grid grid-cols-[auto_1fr] gap-x-2">
            <div class="w-14 h-14 col-span-1">
              <img class="w-14 h-14 rounded-full mr-2" :src="authStore.user?.userProfileImage" />
            </div>
            <div class="col-span-1">
              <div class="flex items-center">
                <span class="text-sm sm:text-[17px] font-medium text-gray-500">{{
                  authStore.user?.userName
                }}</span>
                <span class="ml-2 material-icons text-gray-400 text-sm sm:text-lg">{{
                  authStore.user?.userRole.includes('COMPANY') ? 'groups' : 'person'
                }}</span>
                <div
                  v-if="payload.ad.serviceTypeCode === 'LOCAL_FLEX'"
                  class="ml-auto flex items-center"
                >
                  <span class="material-icons-outlined text-gray-500 text-sm sm:text-lg"
                    >location_on</span
                  >
                  <span class="text-sm sm:text-base font-medium text-gray-500 ml-1">
                    {{
                      localFlexStore.city?.cityId === payload.ad?.cityId
                        ? localFlexStore.city?.cityName
                        : ''
                    }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col md:flex-row mt-1 gap-1 sm:gap-2">
                <div class="flex w-full items-center gap-2">
                  <StarRating :value="userRating?.ratingAverage ?? 0" />
                  <span class="ml-1 text-sm text-gray-500 whitespace-nowrap">
                    ({{ userRating?.ratingCount ?? 0 }} оценки)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-7">
            <AdThumbsGallery :images="thumbImages" />
          </div>
          <h2 class="text-lg font-medium text-gray-600 mt-10 mb-4">Повече за обявата</h2>

          <div class="text-gray-600" v-html="payload.ad.description"></div>
          <div
            v-if="payload.ad.importantInfo !== null && payload.ad.importantInfo !== ''"
            class="bg-gray-50 p-5 text-xs rounded-sm border border-gray-200"
          >
            <div class="flex items-center mb-2">
              <span class="material-icons text-gray-500 mr-2">info_outline</span>
              <h4 class="text-gray-600 font-medium">Изисквания за изпълнение</h4>
            </div>
            <p class="text-xs text-gray-600">
              {{ payload.ad.importantInfo }}
            </p>
          </div>
        </div>
        <div
          v-if="publishAdStore.serviceTypeCode === 'FREELANCE'"
          class="order-1 lg:order-2 px-5 sm:px-0 w-full 2xl:max-w-1/2 bg-white rounded-md sm:soft-shadow"
        >
          <Tabs default-value="basic" class="w-full">
            <TabsList class="w-full bg-white px-5 sm:px-0">
              <TabsTrigger
                value="basic"
                class="flex-1 text-[16px] sm:text-[18px] py-5 px-3 sm:px-4 border-r shadow-none data-[state=active]:shadow-none text-center font-medium data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-b-gray-800 text-gray-400 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 transition duration-150 rounded-none border-b"
              >
                Основен
              </TabsTrigger>
              <TabsTrigger
                value="standard"
                class="flex-1 text-[16px] sm:text-[18px] py-5 px-3 sm:px-4 border-r shadow-none data-[state=active]:shadow-none text-center font-medium data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-b-gray-800 text-gray-400 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 transition duration-150 rounded-none border-b"
              >
                Стандартен
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                class="flex-1 text-[16px] sm:text-[18px] py-5 px-3 sm:px-4 shadow-none data-[state=active]:shadow-none text-center font-medium data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-gray-800 text-gray-400 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 transition duration-150 rounded-none border-b"
              >
                Разширен
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <PackageCard
                :pkg="freelanceStore.basic"
                :unit="publishAdStore.pricingUnit?.pricingUnitLabel"
                type="basic"
              />
            </TabsContent>

            <TabsContent value="standard">
              <PackageCard
                :pkg="freelanceStore.standard"
                :unit="publishAdStore.pricingUnit?.pricingUnitLabel"
                type="standard"
              />
            </TabsContent>

            <TabsContent value="premium">
              <PackageCard
                :pkg="freelanceStore.premium"
                :unit="publishAdStore.pricingUnit?.pricingUnitLabel"
                type="premium"
              />
            </TabsContent>
          </Tabs>
          <div class="text-xs mt-2 sm:px-2 flex flex-col sm:flex-row gap-4 sm:mx-11 mb-6">
            <BookFreelanceService class="w-full" :providerId="authStore.user!.userId" />
            <ContactButton class="w-full" :providerId="authStore.user!.userId" />
          </div>
        </div>
        <div
          v-else
          class="h-[400px] order-1 lg:order-2 px-5 sm:px-0 w-full 2xl:max-w-1/2 bg-white rounded-md sm:soft-shadow"
        ></div>
      </div>
      <div class="flex flex-col items-end mt-12 mb-8 space-y-3 relative">
        <StepperNextButton label="Публикувайте" @click="onSubmit" />
        <StepperBackButton @click="onBack" />
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>

  <div v-else class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    Page not found
  </div>
</template>

<script setup lang="ts">
import { publishAd, getProviderInfo } from '@/api/data'
import type { ProviderProfileType, AdImageUrlType } from '@/types/Types'
import { ref, onMounted, computed } from 'vue'
import StarRating from '@/components/ad-view/StarRating.vue'
import AdThumbsGallery from '@/components/ad-view/AdThumbsGallery.vue'
import AdSubgategoryPath from './common/AdSubgategoryPath.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useFreelanceStore } from '@/stores/freelanceStore'
import PackageCard from './common/PackageCard.vue'
import { buildPublishAdPayload } from '@/utils/buildPublishAdPayload'
import { usePublishAdStore } from '@/stores/publishAdStore'
import { useLocalFlexStore } from '@/stores/localFlexStore'
import { useAuthStore } from '@/stores/authStore'
import StepperBackButton from './common/StepperBackButton.vue'
import StepperNextButton from './common/StepperNextButton.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ContactButton from '../ad-view/ContactButton.vue'
import BookFreelanceService from './common/BookFreelanceService.vue'
const router = useRouter()
const publishAdStore = usePublishAdStore()
const localFlexStore = useLocalFlexStore()
const authStore = useAuthStore()
const { currentStep } = storeToRefs(publishAdStore)
const loading = ref(false)
const error = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const adId = ref<number | null>(null)

const payload = computed(() => buildPublishAdPayload())

async function onSubmit() {
  try {
    loading.value = true
    errorMessage.value = null
    const adIdRes: number = await publishAd(payload.value)
    adId.value = adIdRes
    router.push({ name: 'ad', params: { id: adId.value } })
  } catch (err) {
    if (err instanceof Error) {
      errorMessage.value = 'Неуспешно публикуване.'
    }
  } finally {
    loading.value = false
  }
}

const freelanceStore = useFreelanceStore()
const userRating = ref<ProviderProfileType | null>()
async function loadProviderRating() {
  loading.value = true
  try {
    const rating = await getProviderInfo()
    userRating.value = rating
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
const thumbImages = computed<AdImageUrlType[]>(() =>
  publishAdStore.images.map((img, index) => ({
    adImageId: index,
    isPrimary: index === 0,
    adImageUrl: img.previewUrl,
  })),
)
function onBack() {
  publishAdStore.goToStep(currentStep.value - 1)
}
onMounted(() => {
  loadProviderRating()
})
</script>
<style scoped>
.package-tabs-trigger {
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: 500;
  color: #9ca3af;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease;
}

.package-tabs-trigger:hover {
  color: #374151;
  border-bottom-color: #d1d5db;
}

.package-tabs-trigger[data-state='active'] {
  color: #1f2937;
  border-bottom-color: #1f2937;
}
</style>
