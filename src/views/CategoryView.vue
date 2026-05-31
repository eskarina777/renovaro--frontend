<template>
  <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <div ref="categoryTop" class="mt-12">
      <CategorySection
        v-model:selectedCity="selectedCity"
        :cities="cities"
        :showCityWarning="showCityWarning"
      />
    </div>
    <h2 class="text-2xl font-medium text-gray-700 mb-10 sm:mb-12 mt-12">Подкатегории</h2>
    <div v-if="subcategories.length > 0">
      <div class="flex flex-wrap gap-x-4 gap-y-6 mb-8">
        <SubcategoryCard
          v-for="(sub, index) in subcategories"
          :key="sub.subcategoryId"
          :sub="sub"
          :class="[!expanded && index >= 6 ? 'hidden md:block' : '']"
          @click="(navigate) => handleSubcategoryClick(sub, navigate)"
        />
      </div>
      <div class="border-t w-full mt-8 md:hidden"></div>
      <div v-if="subcategories.length > 6" class="flex justify-center mt-4 md:hidden">
        <ToggleExpandButton :expanded="expanded" @toggle="expanded = !expanded" />
      </div>
    </div>
    <div v-else>
      <div class="text-[22px] md:text-[26px] font-normal text-[#a1b1a9] mb-4">
        <span class="text-[35px] md:text-4xl"> Очаквайте скоро</span>
        подкатегории в категория
        <span class="text-[#3b6751] whitespace-nowrap">{{ category?.categoryName }}!</span>
      </div>
      <div class="text-lg sm:text-xl font-normal text-gray-400 mb-12">
        Междувременно можете да разгледате предложенията ни в категория
        <RouterLink
          to="/category/1"
          class="text-[#a1b1a9] hover:text-gray-600 underline whitespace-nowrap"
        >
          Въртрешни ремонти
        </RouterLink>
      </div>
    </div>
    <div v-if="subcategories.length > 6" class="mt-16">
      <h1 class="sm:text-2xl font-medium text-gray-900 mb-6 sm:mb-10 hidden sm:inline">
        Публикувано в RENOVARO
      </h1>
      <h2 class="mb-5 sm:mt-5 text-xl font-medium text-gray-800">
        Най-популярните ни услуги в категория {{ category?.categoryName }}
      </h2>
    </div>
    <div v-if="subcategories.length > 0">
      <div class="relative mt-8 sm:mt-8">
        <div class="swiper-button-prev nav-round"></div>
        <div class="swiper-button-next nav-round"></div>
        <Swiper
          :modules="[Navigation, Grid]"
          :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
          :space-between="18"
          :breakpoints="{
            0: { slidesPerView: 'auto', spaceBetween: 18, navigation: { enabled: true } },
          }"
          class="mb-8 sm:mb-12 ad-swiper"
        >
          <SwiperSlide
            v-for="ad in adsCatalogueCategory"
            :key="ad.adId"
            class="!w-auto flex-shrink-0"
          >
            <div class="mb-2">
              <AdCard :ad="ad" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <TrustSection />
  </div>
</template>

<script setup lang="ts">
import CategorySection from '@/components/sections/CategorySection.vue'
import TrustSection from '@/components/sections/TrustSection.vue'
import type { City, AdCardType, Subcategory, Category } from '@/types/Types'
import {
  getMostViewedAdsCategory,
  getCities,
  getSubcategoriesCategory,
  getCategoryById,
} from '@/api/data'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SubcategoryCard from '@/components/cards/SubcategoryCard.vue'
import ToggleExpandButton from '@/components/buttons/ToggleExpandButton.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import AdCard from '@/components/cards/AdCard.vue'
import { useFiltersStore } from '@/stores/filterStore'
const route = useRoute()
const showCityWarning = ref(false)
const filter = useFiltersStore()
const adsCatalogueCategory = ref<AdCardType[]>([])
const subcategories = ref<Subcategory[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedCity = ref<string | null>(null)
const cities = ref<City[]>([])
const category = ref<Category | null | undefined>()
const expanded = ref(false)
const categoryTop = ref<HTMLElement | null>(null)

async function loadAll(id: number) {
  loading.value = true
  try {
    const [cat, cit, sub, ads] = await Promise.all([
      getCategoryById(id),
      getCities(),
      getSubcategoriesCategory(id),
      getMostViewedAdsCategory(id),
    ])

    category.value = cat
    cities.value = cit
    subcategories.value = sub
    adsCatalogueCategory.value = ads
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

function handleSubcategoryClick(sub: Subcategory, navigate: () => void) {
  if (category.value?.categoryId === 6) navigate()
  if (!filter.selectedCity && selectedCity.value !== 'Цялата страна') {
    showCityWarning.value = true
    categoryTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  showCityWarning.value = false
  navigate()
}
onMounted(() => loadAll(Number(route.params.id)))

watch(
  () => route.params.id,
  (newId) => loadAll(Number(newId)),
)
watch(
  () => route.params.id,
  () => {
    showCityWarning.value = false
    if (selectedCity.value === 'Цялата страна') selectedCity.value = null
  },
)
watch(selectedCity, (newCityName) => {
  const city = cities.value.find((c) => c.cityName === newCityName) || null
  filter.setCity(city)
})
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
:deep(.ad-swiper .swiper-wrapper) {
  padding-top: 12px !important;
}
</style>
