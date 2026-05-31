<template>
  <div>
    <Select :modelValue="selectedCity" @update:modelValue="$emit('update:selectedCity', $event)">
      <SelectTrigger
        class="text-[22px] h-10 focus:ring-0.5 text-gray-800 w-full sm:w-[345px] md:w-[200px] border pl-3 rounded-md border-gray-500 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
      >
        <SelectValue
          class="text-[16px] font-normal text-gray-800 md:w-64"
          :placeholder="filter.selectedCity ? filter.selectedCity.cityName : 'Изберете град'"
        />
      </SelectTrigger>
      <SelectContent class="max-h-56 font-normal text-base overflow-y-auto">
        <SelectItem :value="all" class="text-gray-500 text-[16px]"> {{ all }} </SelectItem>
        <SelectItem
          v-for="city in cities"
          :key="city.cityId"
          :value="city.cityName"
          class="text-gray-500 text-[16px]"
        >
          {{ city.cityName }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useFiltersStore } from '@/stores/filterStore'
import type { City } from '@/types/Types'
import { ref } from 'vue'
const filter = useFiltersStore()
const all = ref('Цялата страна')
defineProps<{
  cities: City[] | null
  selectedCity?: string | null
}>()
</script>
