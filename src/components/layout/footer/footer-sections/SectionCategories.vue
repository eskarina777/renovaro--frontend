<template>
  <Collapsible v-model:open="isOpen" class="md:contents">
    <CollapsibleTrigger
      class="flex items-center md:pointer-events-none justify-between cursor-pointer select-none w-full mb-2"
    >
      <span class="font-medium text-[17px] text-gray-700"> Категории</span>
      <ChevronDown
        class="h-5 w-5 md:hidden transition-transform duration-200 group-data-[state=open]:rotate-180"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </CollapsibleTrigger>
    <ul class="space-y-2 text-base">
      <li v-for="cat in categories" :key="cat.categoryId" class="break-inside-avoid mb-2">
        <CollapsibleContent class="md:h-auto md:overflow-visible mb-2">
          <RouterLink
            class="text-gray-600 hover:text-black whitespace-nowrap"
            :to="{ name: 'category', params: { id: cat.categoryId } }"
          >
            {{ cat.categoryName }}
          </RouterLink>
        </CollapsibleContent>
      </li>
    </ul>
  </Collapsible>
</template>
<script setup lang="ts">
import { getCategories } from '@/api/data'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Category } from '@/types/Types'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-vue-next'

const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const isOpen = ref(false)
let mql: MediaQueryList | null = null

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

function applyByBreakpoint() {
  const md = mql?.matches ?? false
  isOpen.value = md ? true : false
}

function handleMqlChange() {
  applyByBreakpoint()
}

onMounted(() => {
  mql = window.matchMedia('(min-width: 768px)')
  applyByBreakpoint()
  mql.addEventListener('change', handleMqlChange)
})

onBeforeUnmount(() => {
  mql?.removeEventListener('change', handleMqlChange)
})
</script>
