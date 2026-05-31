<template>
  <div class="border-t pt-6 sm:pt-6 flex flex-col [@media(min-width:1160px)]:flex-row gap-4 mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-row gap-2 sm:gap-4">
        <DropdownMenu v-model:open="isRatingOpen">
          <DropdownMenuTrigger
            class="flex items-start justify-between text-sm w-[165px] border pl-3 pr-2 py-2 rounded-md text-gray-600 font-normal border-gray-300 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          >
            <span>Рейтинг</span>
            <ChevronDown class="ml-1 mt-0.5 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="text-sm text-gray-700 min-w-[165px]">
            <DropdownMenuItem
              v-for="option in ratingOptions"
              :key="option.value"
              @select="(ev: Event) => handleSelectRating(option.value, ev)"
            >
              <span class="mr-2 w-3 text-xs">
                <span v-if="pendingRating === option.value" class="material-icons text-base"
                  >check</span
                >
              </span>
              <span>{{ option.label }}</span>
            </DropdownMenuItem>
            <div class="mt-3 mb-2 border-t pt-3 px-2 flex flex-row gap-x-3 items-start">
              <button
                class="text-xs font-medium pt-1 text-gray-500 hover:text-gray-800"
                @click="clearRatingInMenu"
              >
                <span class="text-xs text-gray-500 hover:text-gray-800"
                  ><span class="material-symbols-outlined align-middle text-sm mb-0.5 text-gray-500"
                    >replay</span
                  >
                  Изчистете</span
                >
              </button>
              <button
                class="px-3 py-1 text-xs rounded-sm bg-[#3b6751] opacity-50 text-white border border-[#77b393] hover:border-[#77b393] hover:text-[#77b393] hover:bg-white"
                @click="applyRating()"
              >
                Приложете
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu v-model:open="isPublishedByOpen">
          <DropdownMenuTrigger
            class="flex items-start justify-between text-sm w-[165px] border pl-3 pr-2 py-2 rounded-md text-gray-600 font-normal border-gray-300 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          >
            <span>Публикувана от</span>
            <ChevronDown class="ml-1 mt-0.5 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="text-sm text-gray-700 min-w-[165px]">
            <DropdownMenuItem
              v-for="option in publishedByOptions"
              :key="String(option.value)"
              @select="(ev: Event) => handlePublishedBy(option.value, ev)"
            >
              <span class="mr-2 w-3 text-xs">
                <span v-if="pendingPublishedBy === option.value" class="material-icons text-base"
                  >check</span
                >
              </span>
              <span>{{ option.label }}</span>
            </DropdownMenuItem>
            <div class="mt-3 mb-2 border-t pt-3 px-2 flex flex-row gap-x-3 items-start">
              <button
                class="text-xs font-medium pt-1 text-gray-500 hover:text-gray-800"
                @click="clearPublisheByInMenu"
              >
                <span class="text-xs text-gray-500 hover:text-gray-800"
                  ><span class="material-symbols-outlined align-middle text-sm mb-0.5 text-gray-500"
                    >replay</span
                  >
                  Изчистете</span
                >
              </button>
              <button
                class="px-3 py-1 text-xs rounded-sm bg-[#3b6751] opacity-50 text-white border border-[#77b393] hover:border-[#77b393] hover:text-[#77b393] hover:bg-white"
                @click="applyPublishedBy"
              >
                Приложете
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex flex-row gap-2 sm:gap-4">
        <DropdownMenu v-model:open="isBudgetOpen">
          <DropdownMenuTrigger
            class="flex items-start justify-between text-sm w-[165px] border pl-3 pr-2 py-2 rounded-md text-gray-600 font-normal border-gray-300 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          >
            <span>Бюджет</span>
            <ChevronDown class="ml-1 mt-0.5 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="text-sm text-gray-700 min-w-[165px]">
            <DropdownMenuItem
              v-for="option in budgetOptions"
              :key="String(option.value)"
              @select="(ev: Event) => handleBudget(option.value, ev)"
            >
              <span class="mr-2 w-3 text-xs">
                <span
                  v-if="budgetsEqual(pendingBudget, option.value)"
                  class="material-icons text-base"
                  >check</span
                >
              </span>
              <span>{{ option.label }}</span>
            </DropdownMenuItem>
            <div class="mt-3 mb-2 border-t pt-3 px-2 flex flex-row gap-x-3 items-start">
              <button
                class="text-xs font-medium pt-1 text-gray-500 hover:text-gray-800"
                @click="clearBudgetInMenu"
              >
                <span class="text-xs text-gray-500 hover:text-gray-800"
                  ><span class="material-symbols-outlined align-middle text-sm mb-0.5 text-gray-500"
                    >replay</span
                  >
                  Изчистете</span
                >
              </button>
              <button
                class="px-3 py-1 text-xs rounded-sm bg-[#3b6751] opacity-50 text-white border border-[#77b393] hover:border-[#77b393] hover:text-[#77b393] hover:bg-white"
                @click="applyBudget"
              >
                Приложете
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu v-model:open="isSortOpen">
          <DropdownMenuTrigger
            class="flex items-start justify-between text-sm w-[165px] border pl-3 pr-2 py-2 rounded-md text-gray-600 font-normal border-gray-300 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          >
            <span>Сортирайте</span>
            <ChevronDown class="ml-1 mt-0.5 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="text-sm text-gray-700 min-w-[165px]">
            <DropdownMenuItem
              v-for="option in sortOptions"
              :key="String(option.value)"
              @select="(ev: Event) => handleSort(option.value, ev)"
            >
              <span class="mr-2 w-3 text-xs">
                <span v-if="pendingSort === option.value" class="material-icons text-base"
                  >check</span
                >
              </span>
              <span>{{ option.label }}</span>
            </DropdownMenuItem>
            <div class="mt-3 mb-2 border-t pt-3 px-2 flex flex-row gap-x-3 items-start">
              <button
                class="text-xs font-medium pt-1 text-gray-500 hover:text-gray-800"
                @click="clearSortInMenu"
              >
                <span class="text-xs text-gray-500 hover:text-gray-800"
                  ><span class="material-symbols-outlined align-middle text-sm mb-0.5 text-gray-500"
                    >replay</span
                  >
                  Изчистете</span
                >
              </button>
              <button
                class="px-3 py-1 text-xs rounded-sm bg-[#3b6751] opacity-50 text-white border border-[#77b393] hover:border-[#77b393] hover:text-[#77b393] hover:bg-white"
                @click="applySort"
              >
                Приложете
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <div class="flex w-full [@media(min-width:1160px)]:justify-end">
      <button
        @click="clearAllFilters"
        class="sm:mr-11 px-4 py-1.5 h-[38px] text-sm rounded-md bg-[#3b6751] opacity-50 border border-[#77b393] text-white hover:bg-white hover:text-[#2d2d2d] hover:border-gray-600 transition-colors duration-300"
      >
        <span class="material-symbols-outlined align-middle text-base text-white">replay</span>
        Изчистете всички филтри
      </button>
    </div>
  </div>
  <div class="border-b pb-4 flex flex-wrap gap-2">
    <div class="">
      <button
        v-if="ratingLabel"
        class="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700"
        @click="clearRating"
      >
        <span>{{ ratingLabel }}</span>
        <span class="text-xs ml-1">✕</span>
      </button>
    </div>
    <div class="">
      <button
        v-if="publishedByLabel"
        class="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700"
        @click="clearPublishedBy"
      >
        <span>{{ publishedByLabel }}</span>
        <span class="text-xs ml-1">✕</span>
      </button>
    </div>
    <div class="">
      <button
        v-if="budgetLabel"
        class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700"
        @click="clearBudget"
      >
        <span>{{ budgetLabel }}</span>
        <span class="text-xs ml-1">✕</span>
      </button>
    </div>
    <div class="">
      <button
        v-if="sortLabel"
        class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700"
        @click="clearSort"
      >
        <span>{{ sortLabel }}</span>
        <span class="text-xs ml-1">✕</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useFiltersStore } from '@/stores/filterStore'
import { getLabelFromOptions } from '@/utils/getLabel'
import { ratingOptions, budgetOptions, sortOptions, publishedByOptions } from '@/utils/constants'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-vue-next'
import type { RatingValue, PublishedByValue, BudgetRange, SortValue } from '@/types/Types'

const filter = useFiltersStore()
const isRatingOpen = ref(false)
const isPublishedByOpen = ref(false)
const isBudgetOpen = ref(false)
const isSortOpen = ref(false)

const emit = defineEmits<{
  (e: 'filters-updated'): void
}>()

const ratingLabel = computed(() => getLabelFromOptions(ratingOptions, filter.rating))
const publishedByLabel = computed(() => getLabelFromOptions(publishedByOptions, filter.publishedBy))
const budgetLabel = computed(() => {
  const current = filter.budget
  if (!current) return null

  const found = budgetOptions.find((opt) => budgetsEqual(opt.value, current))
  return found ? found.label : null
})
const sortLabel = computed(() => getLabelFromOptions(sortOptions, filter.sortBy))

function clearAllFilters() {
  filter.clearAllFilters()
  emit('filters-updated')
}
const pendingRating = ref<RatingValue | null>(null)
watch(isRatingOpen, (isDropDownopen) => {
  if (isDropDownopen) {
    pendingRating.value = filter.rating
  }
})
function clearRating() {
  filter.setRating(null)
  emit('filters-updated')
}

function handleSelectRating(value: RatingValue, ev?: Event) {
  ev?.preventDefault()
  pendingRating.value = value
}

function applyRating() {
  filter.setRating(pendingRating.value)
  emit('filters-updated')
  isRatingOpen.value = false
}

function clearRatingInMenu() {
  filter.setRating(null)
  emit('filters-updated')
  isRatingOpen.value = false
}
const pendingPublishedBy = ref<PublishedByValue | null>(null)
watch(isPublishedByOpen, (isDropDownopen) => {
  if (isDropDownopen) {
    pendingPublishedBy.value = filter.publishedBy
  }
})
function clearPublishedBy() {
  filter.setPublishedBy(null)
  emit('filters-updated')
}
function handlePublishedBy(value: PublishedByValue, ev?: Event) {
  ev?.preventDefault()
  pendingPublishedBy.value = value
}
function applyPublishedBy() {
  filter.setPublishedBy(pendingPublishedBy.value)
  emit('filters-updated')
  isPublishedByOpen.value = false
}

function clearPublisheByInMenu() {
  filter.setPublishedBy(null)
  emit('filters-updated')
  isPublishedByOpen.value = false
}
const pendingBudget = ref<BudgetRange | null>(null)
watch(isBudgetOpen, (isDropdownOpen) => {
  if (isDropdownOpen) {
    pendingBudget.value = filter.budget
  }
})
function clearBudget() {
  filter.setBudget(null)
  emit('filters-updated')
}
function handleBudget(value: BudgetRange, ev?: Event) {
  ev?.preventDefault()
  pendingBudget.value = value
}
function applyBudget() {
  filter.setBudget(pendingBudget.value)
  emit('filters-updated')
  isBudgetOpen.value = false
}

function clearBudgetInMenu() {
  filter.setBudget(null)
  emit('filters-updated')
  isBudgetOpen.value = false
}
function budgetsEqual(a: BudgetRange | null, b: BudgetRange | null) {
  if (!a || !b) return false
  return a.min === b.min && a.max === b.max
}
const pendingSort = ref<SortValue | null>(null)
watch(isSortOpen, (isDropDownopen) => {
  if (isDropDownopen) {
    pendingSort.value = filter.sortBy
  }
})
function clearSort() {
  filter.setSort(null)
  emit('filters-updated')
}
function handleSort(value: SortValue, ev?: Event) {
  ev?.preventDefault()
  pendingSort.value = value
}
function applySort() {
  filter.setSort(pendingSort.value)
  emit('filters-updated')
  isSortOpen.value = false
}

function clearSortInMenu() {
  filter.setSort(null)
  emit('filters-updated')
  isSortOpen.value = false
}
</script>
