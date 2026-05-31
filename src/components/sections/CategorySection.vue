<template>
  <div class="bg-[#e7f0eb] rounded-lg p-8 sm:pt-9">
    <div class="flex flex-col">
      <div class="flex justify-center">
        <h1 class="text-[22px] sm:text-[32px] font-medium text-[#3b6751] mb-6 sm:mb-4">
          {{ category?.categoryName }}
        </h1>
      </div>
      <div class="hidden sm:flex justify-center">
        <h2 class="text-xl font-medium text-[#3b6751] mb-4">От идеята до реализацията</h2>
      </div>
      <div v-if="categoryId !== 6" class="flex justify-center">
        <Select
          :modelValue="selectedCity"
          @update:modelValue="$emit('update:selectedCity', $event)"
        >
          <SelectTrigger
            class="w-[210px] bg-[#e7f0eb] px-4 py-1 border border-gray-300 rounded-md focus:ring-0.5 focus:ring-gray-400 focus:border-gray-400 outline-none soft-shadow text-gray-500 h-12"
          >
            <SelectValue
              class="hero-input text-[18px] font-medium text-base md:w-64"
              :placeholder="filter.selectedCity ? filter.selectedCity.cityName : 'Изберете град'"
            />
          </SelectTrigger>
          <SelectContent class="max-h-56 font-medium text-base overflow-y-auto">
            <SelectItem
              v-for="city in cities"
              :key="city.cityId"
              :value="city.cityName"
              class="text-gray-500"
            >
              {{ city.cityName }}
            </SelectItem>
            <SelectItem :value="all" class="text-gray-500"> {{ all }} </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
  <div
    v-if="showCityWarning && !filter.selectedCity && selectedCity != all"
    class="flex justify-center mt-4"
  >
    <div
      class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-base font-medium rounded-sm shadow-lg animate-fade-in text-center"
    >
      Моля изберете град за да продължите!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { City, Category } from '@/types/Types'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { getCategoryById } from '@/api/data'
import { useRoute } from 'vue-router'
import { useFiltersStore } from '@/stores/filterStore'
const filter = useFiltersStore()

const category = ref<Category | null | undefined>()
const route = useRoute()
const categoryId = Number(route.params.id)

const loading = ref(true)
const error = ref<string | null>(null)
const all = ref('Цялата страна')
const emit = defineEmits(['update:selectedCity'])
const props = defineProps<{
  cities: City[] | null
  selectedCity?: string | null
  showCityWarning?: boolean
}>()
const value = ref(props.selectedCity)

async function loadCategory(id: number) {
  try {
    loading.value = true
    category.value = await getCategoryById(id)
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
  loadCategory(Number(route.params.id))
})

watch(
  () => route.params.id,
  (newId) => {
    loadCategory(Number(newId))
  },
)
watch(
  () => props.selectedCity,
  (v) => (value.value = v),
)
watch(value, (v) => emit('update:selectedCity', v))
</script>

<style scoped></style>
