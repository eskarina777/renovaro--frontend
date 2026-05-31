<template>
  <div>
    <SearchbarReview />
    <div>
      <div class="container mx-auto pt-3">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="w-full space-y-3">
            <div class="flex items-center space-x-2">
              <DropdownMenu v-model:open="isSortOpen">
                <DropdownMenuTrigger
                  class="flex items-start justify-between text-sm w-full sm:w-[295px] text-gray-600 py-2 font-normal"
                >
                  <span>Сортирайте оценките </span>
                  <ChevronDown class="ml-1 mt-0.5 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" class="text-sm text-gray-700 min-w-[285px]">
                  <DropdownMenuItem
                    v-for="option in sortReviewOptions"
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
                  <div class="mt-3 mb-2 border-t pt-3 px-2 flex flex-row gap-x-3 justify-between">
                    <button
                      class="text-xs font-medium pt-1 text-gray-500 hover:text-gray-800"
                      @click="clearSortInMenu"
                    >
                      <span class="text-xs text-gray-500 hover:text-gray-800"
                        ><span
                          class="material-symbols-outlined align-middle text-sm mb-0.5 text-gray-500"
                          >replay</span
                        >
                        Изчистете</span
                      >
                    </button>
                    <button
                      class="px-3 py-1 text-xs rounded-sm bg-[#77b393] text-white border border-[#77b393] hover:border-[#77b393] hover:text-[#77b393] hover:bg-white"
                      @click="applySort"
                    >
                      Приложете
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div class="flex items-center">
              <input
                class="h-4 w-4 accent-[#3b6751] cursor-pointer text-[#3b6751] opacity-50 border-2 border-gray-400 rounded-sm focus:ring-white"
                type="checkbox"
              />
              <label class="ml-2 text-sm text-gray-700" for="show-reviews-files"
                >Показване на оценки със снимки (10)</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-vue-next'
import type { SortReviewValue } from '@/types/Types'
import { sortReviewOptions } from '@/utils/constants'
import SearchbarReview from '@/components/ad-view/SearchbarReview.vue'

const isSortOpen = ref(false)

const emit = defineEmits<{
  (e: 'filters-updated'): void
}>()
const pendingSort = ref<SortReviewValue | null>(null)

function handleSort(value: SortReviewValue, ev?: Event) {
  ev?.preventDefault()
  pendingSort.value = value
}
function applySort() {
  emit('filters-updated')
  isSortOpen.value = false
}

function clearSortInMenu() {
  emit('filters-updated')
  isSortOpen.value = false
}
</script>
