<template>
  <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto mb-8">
    <div class="mt-6 mb-6 text-base text-gray-500">
      <div class="flex flex-col md:flex-row md:items-end mb-1">
        <div class="whitespace-nowrap">
          <RouterLink
            v-if="category"
            :to="{ name: 'category', params: { id: category.categoryId } }"
            class="group inline-flex items-center gap-1"
          >
            <span
              class="material-symbols-outlined align-middle text-lg text-gray-500 group-hover:text-[#77b393]"
            >
              {{ category.categoryCode }}
            </span>

            <span class="align-middle text-[17px] text-gray-500 group-hover:text-[#77b393]">
              / {{ category.categoryName }}
            </span>
          </RouterLink>

          <h2 class="text-2xl font-medium text-gray-800 mt-2 whitespace-nowrap">
            {{ subcategory?.subcategoryName }}
          </h2>
        </div>
        <div
          v-if="
            subcategory?.subcategoryId !== undefined &&
            ![17, 18, 19, 20].includes(subcategory.subcategoryId)
          "
          class="md:ml-14 mt-2 mb-1"
        >
          <SelectCity v-model:selectedCity="selectedCity" :cities="cities" />
        </div>
      </div>
      <div class="text-gray-600 mt-2 mb-2 text-[16px] hidden md:inline">
        <p>Превърнете идеите си в реалност с професионално изпълнение</p>
      </div>
    </div>
    <FilterAds @filters-updated="onFiltersUpdated" />
    <div v-if="adsCatalogueSubcategory.length !== 0">
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
        <div class="relative mt-8">
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
        <div v-if="adsCatalogueSubcategory">
          <PaginationNavigation
            :current-page="currentPage"
            :total-pages="totalPages"
            @change="onPageChange"
          />
        </div>
      </div>
    </div>
    <div v-if="adsCatalogueSubcategory.length === 0 && !loading" class="h-[200px]">
      <div class="text-[22px] md:text-[26px] font-normal text-[#a1b1a9] mb-4 mt-14">
        Няма публикувани обяви!
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
import { getCities, getSubcategoryAds, getSubcategoryById, getCategoryById } from '@/api/data'
import type { City, AdCardType, Subcategory, Category } from '@/types/Types'
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
const subcategory = ref<Subcategory | null>()
const category = ref<Category>()
const adsCatalogueSubcategory = ref<AdCardType[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedCity = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 12
const id = Number(route.params.id)

async function loadAll(id: number) {
  loading.value = true
  try {
    const params: Record<string, unknown> = {}
    const sub = await getSubcategoryById(id)
    subcategory.value = sub
    setParams(params)
    const [cit, cat, { ads, total }] = await Promise.all([
      getCities(),
      getCategoryById(subcategory.value?.categoryId),
      getSubcategoryAds(id, params),
    ])
    cities.value = cit
    category.value = cat
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
  loadAll(Number(route.params.id))
})

watch(selectedCity, async (newCityName) => {
  const city = cities.value.find((c) => c.cityName === newCityName) || null
  filter.setCity(city)
  await onFiltersUpdated()
})
watch(
  () => route.params.id,
  (newId) => {
    if (newId != null) {
      loadAll(Number(newId))
    }
  },
)
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
    const { ads, total } = await getSubcategoryAds(id, params)
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
