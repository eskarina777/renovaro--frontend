<template>
  <main>
    <HeroPage
      @submit-search-input="handleSearch"
      v-model:selectedCity="selectedCity"
      :cities="cities"
    />

    <div class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
      <div
        class="mt-16 grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1000px)]:grid-cols-3 [@media(min-width:1280px)]:grid-cols-4 gap-x-7 gap-y-10"
      >
        <CategoryCard
          v-for="(category, index) in categories"
          :key="category.categoryId"
          :cat="category"
          :class="[!expanded && index >= 2 ? 'hidden md:block' : '']"
        />
      </div>
      <div class="border-t w-full mt-8 md:hidden"></div>
      <div v-if="categories.length > 2" class="flex justify-center mt-4 md:hidden">
        <ToggleExpandButton :expanded="expanded" @toggle="expanded = !expanded" />
      </div>

      <div class="mt-12 sm:mt-20 sm:mb-16">
        <ClientFeatures />
      </div>

      <div class="mt-10 mb-12">
        <ProviderFeatures />
      </div>

      <h2 class="text-3xl md:text-4xl font-medium text-gray-700 mt-6 mb-10 sm:mt-16 sm:mb-12">
        Популярни услуги
      </h2>

      <div class="flex flex-wrap gap-x-4 gap-y-6 mb-6">
        <SubcategoryCard
          v-for="(sub, index) in subcategories"
          :key="sub.subcategoryId"
          :sub="sub"
          :class="[!expanded && index >= 4 ? 'hidden md:block' : '']"
          @click="(navigate) => navigate()"
        />
      </div>
      <div class="border-t w-full mt-8 md:hidden"></div>
      <div v-if="subcategories.length > 4" class="flex justify-center mt-4 md:hidden">
        <ToggleExpandButton :expanded="expanded" @toggle="expanded = !expanded" />
      </div>

      <div class="sm:mb-16 mt-6 sm:mt-20">
        <h2 class="text-3xl md:text-4xl font-medium text-gray-900 hidden sm:inline">
          Удобен, лесен, бърз и точен избор
        </h2>
        <div class="hidden sm:block mb-8 sm:mb-20 sm:mt-12">
          <ClientPrompts />
        </div>
      </div>
      <h1 class="text-3xl md:text-4xl font-medium text-gray-900 mb-6 sm:mb-10 hidden sm:inline">
        Публикувано в RENOVARO
      </h1>
      <div class="mb-4 sm:mb-10 mt-10">
        <div class="flex justify-between items-center mb-2 sm:mt-6">
          <h2 class="text-xl sm:text-2xl font-medium text-gray-800">
            Ново в категория Архитектура и дизайн
          </h2>
          <div class="hidden [@media(min-width:1240px)]:block">
            <RouterLink :to="{ name: 'category', params: { id: 6 } }">
              <span
                class="text-lg font-medium text-[#abcbbe] hover:text-[#41735a] flex items-center mr-12"
              >
                Покажи всички
                <span class="material-icons text-sm ml-1">chevron_right</span>
              </span></RouterLink
            >
          </div>
        </div>
        <div class="hidden md:block">
          <p class="text-xl text-gray-500">
            Тук ще намерите специалисти, готови да помогнат веднага
          </p>
        </div>
      </div>
      <div v-if="isDesktop">
        <div class="flex flex-wrap gap-5 relative mt-10">
          <AdCard v-for="ad in adsCatalogueHome" :key="ad.adId" class="mb-2" :ad="ad" />
        </div>
      </div>
      <div v-if="isTablet || isMobile">
        <div class="relative mt-6">
          <div class="swiper-button-prev nav-round galery-home-prev"></div>
          <div class="swiper-button-next nav-round galery-home-next"></div>
          <Swiper
            :modules="[Navigation, Grid]"
            :navigation="{ prevEl: '.galery-home-prev', nextEl: '.galery-home-next' }"
            :space-between="18"
            :breakpoints="{
              0: { slidesPerView: 'auto', spaceBetween: 18, navigation: { enabled: true } },
            }"
            class="mb-12 ad-swiper"
          >
            <SwiperSlide
              v-for="ad in adsCatalogueHome"
              :key="ad.adId"
              class="!w-auto flex-shrink-0 pt6"
            >
              <div class="mb-2">
                <AdCard :ad="ad" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div class="sm:my-10">
        <TrustSection />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CategoryCard from '@/components/cards/CategoryCard.vue'
import ClientFeatures from '@/components/home-view/ClientFeatures.vue'
import ProviderFeatures from '@/components/home-view/ProviderFeatures.vue'
import ClientPrompts from '@/components/home-view/ClientPrompts.vue'
import AdCard from '@/components/cards/AdCard.vue'
import TrustSection from '@/components/sections/TrustSection.vue'
import ToggleExpandButton from '@/components/buttons/ToggleExpandButton.vue'
import HeroPage from '@/components/home-view/HeroPage.vue'
import type { AdCardType, Category, Subcategory, City } from '@/types/Types'
import { ref, onMounted, watch } from 'vue'
import { getAdsHome, getCategories, getSubcategoriesHome, getCities } from '@/api/data'
import SubcategoryCard from '@/components/cards/SubcategoryCard.vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import { useFiltersStore } from '@/stores/filterStore'
import { useBreakpoint } from '@/composables/useBreakpoint'
const { isMobile, isTablet, isDesktop } = useBreakpoint()

const filter = useFiltersStore()
const router = useRouter()
const adsCatalogueHome = ref<AdCardType[]>([])
const categories = ref<Category[]>([])
const subcategories = ref<Subcategory[]>([])
const cities = ref<City[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedCity = ref<string | null>(null)
const expanded = ref(false)

onMounted(async () => {
  try {
    const [cats, cit, ads, sub] = await Promise.all([
      getCategories(),
      getCities(),
      getAdsHome(),
      getSubcategoriesHome(),
    ])
    categories.value = cats
    cities.value = cit
    adsCatalogueHome.value = ads
    subcategories.value = sub
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
const handleSearch = (search: string) => {
  console.log('Searching for:', search)
  if (!search) {
    alert('Моля, въведете търсената от Вас услуга.')
    return
  }
  router.push({ name: 'search-results', query: { search: search } })
}
watch(selectedCity, async (newCityName) => {
  const city = cities.value.find((c) => c.cityName === newCityName) || null
  filter.setCity(city)
})
</script>

<style scoped>
@media (min-width: 1340px) {
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    display: none !important;
  }
}
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
