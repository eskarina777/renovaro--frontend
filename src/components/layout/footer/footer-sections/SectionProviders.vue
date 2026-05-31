<template>
  <Collapsible v-model:open="isOpen" class="md:contents">
    <CollapsibleTrigger
      class="flex items-center md:pointer-events-none justify-between cursor-pointer select-none w-full mb-2"
    >
      <span class="font-medium text-[17px] text-gray-700"> За специалисти</span>
      <ChevronDown
        class="h-5 w-5 md:hidden transition-transform duration-200 group-data-[state=open]:rotate-180"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </CollapsibleTrigger>
    <CollapsibleContent class="md:h-auto md:overflow-visible mb-2">
      <RouterLink
        :to="{ name: 'coming-soon' }"
        class="text-gray-600 hover:text-black text-base whitespace-nowrap"
      >
        Как работи
      </RouterLink>
    </CollapsibleContent>
    <CollapsibleContent class="md:h-auto md:overflow-visible mb-2">
      <RouterLink
        :to="{ name: 'coming-soon' }"
        class="text-gray-600 hover:text-black text-base whitespace-nowrap"
      >
        Полезни стати
      </RouterLink>
    </CollapsibleContent>
    <CollapsibleContent class="md:h-auto md:overflow-visible mb-2">
      <RouterLink
        :to="{ name: 'coming-soon' }"
        class="text-gray-600 hover:text-black text-base whitespace-nowrap"
      >
        Отговори на въпроси
      </RouterLink>
    </CollapsibleContent>
    <CollapsibleContent class="md:h-auto md:overflow-visible mb-2">
      <RouterLink
        :to="{ name: 'coming-soon' }"
        class="text-gray-600 hover:text-black text-base whitespace-nowrap"
      >
        Рейтинг система
      </RouterLink>
    </CollapsibleContent>
  </Collapsible>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-vue-next'

const isOpen = ref(false)
let mql: MediaQueryList | null = null

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
