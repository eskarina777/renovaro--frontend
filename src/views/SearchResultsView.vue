<template>
  <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <div class="mt-6 mb-6 text-base text-gray-500">
      <div class="flex flex-col md:flex-row md:items-end mb-1">
        <div class="text-2xl font-medium text-gray-600 mt-2 mb-4">
          <span class="mr-6"> Резултати за </span>
          <span class="text-2xl font-medium text-[#77b393] line-clamp-"> {{ searchInput }}</span>
        </div>
      </div>
      <div class="mt-2 mb-1.5">
        <SelectCity v-model:selectedCity="selectedCity" :cities="cities" />
      </div>
      <div class="text-gray-600 mt-2 mb-2 text-[15px] hidden md:inline">
        <p>Превърнете идеите си в реалност с професионално изпълнение</p>
      </div>
    </div>
    <FilterAds @filters-updated="onFiltersUpdated" />

    <div v-if="isDesktop">
      <div class="flex flex-wrap gap-5 relative mt-10">
        <AdCard v-for="ad in adsCatalogueSubcategory" :key="ad.adId" class="mb-2" :ad="ad" />
      </div>
      <div class="mt-14">
        <PaginationNavigation
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="onPageChange"
        />
      </div>
    </div>
    <div v-if="isTablet || isMobile">
      <div class="relative mt-12">
        <div class="swiper-button-prev nav-round"></div>
        <div class="swiper-button-next nav-round"></div>
        <Swiper
          :modules="[Navigation, Grid]"
          :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
          :space-between="18"
          :breakpoints="{
            0: { slidesPerView: 'auto', spaceBetween: 18, navigation: { enabled: true } },
          }"
          class="mb-12"
        >
          <SwiperSlide
            v-for="ad in adsCatalogueSubcategory"
            :key="ad.adId"
            class="!w-auto flex-shrink-0"
          >
            <div class="mb-2">
              <AdCard :ad="ad" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <PaginationNavigation
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import FilterAds from '@/components/filter/FilterAds.vue'
import { getCities, getSearchResultAds } from '@/api/data'
import type { City, AdCardType } from '@/types/Types'
import { useRoute } from 'vue-router'
import { useFiltersStore } from '@/stores/filterStore'
import { ref, onMounted, watch } from 'vue'
import SelectCity from '@/components/filter/SelectCity.vue'
import AdCard from '@/components/cards/AdCard.vue'
import PaginationNavigation from '@/components/pagination/PaginationNavigation.vue'
import { useBreakpoint } from '@/composables/useBreakpoint'
const { isMobile, isTablet, isDesktop } = useBreakpoint()
const filter = useFiltersStore()
const route = useRoute()
const cities = ref<City[]>([])

const adsCatalogueSubcategory = ref<AdCardType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedCity = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 12
const searchInput = route.query.search

async function loadAll() {
  loading.value = true
  try {
    const params: Record<string, unknown> = {}
    setParams(params)
    const [cit, { ads, total }] = await Promise.all([getCities(), getSearchResultAds(params)])
    cities.value = cit
    adsCatalogueSubcategory.value = ads
    totalPages.value = Math.ceil(total / pageSize)
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
  loadAll()
})

watch(selectedCity, async (newCityName) => {
  const city = cities.value.find((c) => c.cityName === newCityName) || null
  filter.setCity(city)
  await onFiltersUpdated()
})

async function onPageChange(page: number) {
  currentPage.value = page
  await handleFiltersChanged()
}
async function onFiltersUpdated() {
  currentPage.value = 1
  await handleFiltersChanged()
}
async function handleFiltersChanged() {
  loading.value = true
  const params: Record<string, unknown> = {}
  try {
    setParams(params)
    const { ads, total } = await getSearchResultAds(params)
    adsCatalogueSubcategory.value = ads
    totalPages.value = Math.ceil(total / pageSize)
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

function setParams(params: Record<string, unknown>) {
  if (filter.selectedCity != null) {
    params.cityId = filter.selectedCity.cityId
  }

  if (filter.rating != null) {
    params.rating = filter.rating
  }

  if (filter.publishedBy != null) {
    params.publishedBy = filter.publishedBy
  }

  if (filter.budget != null) {
    if (filter.budget.min != null) params.budgetMin = filter.budget.min
    if (filter.budget.max != null) params.budgetMax = filter.budget.max
  }

  if (filter.sortBy) {
    params.sortBy = filter.sortBy
  }

  if (searchInput != null) {
    params.search = searchInput
  }
  params.page = currentPage.value - 1
  params.size = pageSize
}
</script>
<style scoped>
.swiper-button-prev {
  left: -22px;
}

.swiper-button-next {
  right: -22px;
}
:deep(.nav-round) {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  top: 50%;
  transform: translateY(-50%);
  color: #111827 !important;
}

:deep(.swiper-button-prev .swiper-navigation-icon),
:deep(.swiper-button-next .swiper-navigation-icon) {
  width: 16px !important;
  height: 16px !important;
  font-weight: 200;
}
</style>
