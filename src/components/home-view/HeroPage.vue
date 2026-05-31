<template>
  <div class="sm:bg-[#f7f7f0] bg-[#e9f2ed]">
    <div
      class="hero-bg xl:h-[600px] lg:h-[500px] md:h-[400px] h-[300px] bg-cover bg-center bg-no-repeat opacity-70 2xl:px-0 2xl:w-[1400px] 2xl:mx-auto"
    >
      <div class="px-[35px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto pt-12">
        <h2
          class="xl:pt-44 lg:pt-32 md:pt-24 hidden [@media(min-width:914px)]:block [@media(min-width:1480px)]:text-[54px] [@media(min-width:1224px)]:text-[45px] [@media(min-width:1024px)]:text-[35px] text-[30px] font-medium text-gray-700 mb-10 leading-[1.4]"
        >
          Имате нужда от помощ <br />
          за ремонт, поддръжка или дизайн на имот
        </h2>
        <h3
          class="block [@media(min-width:914px)]:hidden [@media(min-width:1024px)]:pt-44 md:pt-16 md:text-[30px] text-[26px] pt-4 font-medium text-gray-700 mb-7 leading-[1.4]"
        >
          Имате нужда от <br />
          помощ за вашия имот
        </h3>
        <div
          class="w-full flex flex-col md:flex-row gap-3 md:gap-4 md:space-y-0 items-stretch text-base @media(min-width:1024px)]:text-[18px]"
        >
          <div class="w-full relative">
            <input
              v-model="localSearch"
              class="hero-input w-full px-6 py-3 border border-gray-300 rounded-md focus:ring-0.5 focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow bg-white placeholder-gray-500 text-gray-700 [@media(min-width:1024px)]:h-14 h-12"
              placeholder="Потърсете услуга..."
              type="text"
              @keyup.enter="onSearch"
            />
            <button @click="onSearch">
              <span
                class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl"
              >
                search</span
              >
            </button>
          </div>
          <Select
            :modelValue="selectedCity"
            @update:modelValue="$emit('update:selectedCity', $event)"
          >
            <SelectTrigger
              class="hero-input text-base md:w-64 bg-white px-4 py-2.5 border border-gray-300 rounded-md focus:ring-0.5 focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow text-gray-500 [@media(min-width:1024px)]:h-14 h-12"
            >
              <SelectValue class="hero-input text-base md:w-64" placeholder="Изберете град" />
            </SelectTrigger>

            <SelectContent class="max-h-56 overflow-y-auto">
              <SelectItem
                v-for="city in cities"
                :key="city.cityId"
                :value="city.cityName"
                class="hero-input text-gray-500"
              >
                {{ city.cityName }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { City } from '@/types/Types'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const localSearch = ref('')
const props = defineProps<{
  cities: City[] | null
  selectedCity?: string | null
}>()

const emit = defineEmits(['update:selectedCity', 'submit-search-input'])
const onSearch = () => {
  emit('submit-search-input', localSearch.value)
}

const value = ref(props.selectedCity)
watch(
  () => props.selectedCity,
  (v) => (value.value = v),
)
watch(value, (v) => emit('update:selectedCity', v))
</script>

<style scoped>
@media (min-width: 1180px) {
  .hero-input {
    font-size: 18px;
    line-height: 18px;
  }
}
@media (min-width: 640px) {
  .hero-bg {
    background-image: url('/hero.jpg');
  }
}
</style>
