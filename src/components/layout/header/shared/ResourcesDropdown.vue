<template>
  <div>
    <DropdownMenu v-model:open="isOpen">
      <DropdownMenuTrigger
        class="flex justify-center relative text-gray-600 hover:text-[#77b393] cursor-pointer select-none"
      >
        <span class="text-base"> Ресурси </span>
        <ChevronDown
          class="h-5 w-5 ml-1.5 mt-1 transition-transform duration-200"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="rounded-sm text-gray-600 text-base">
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Kak работи за специалисти
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Kak работи за клиенти
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Въпроси и отговори
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Контакти
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Полезни статии
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Общност
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
const isOpen = ref(false)
</script>
