<template>
  <div class="relative group">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="inline-flex items-center h-9 gap-1">
          <div class="text-gray-500 hover:text-[#77b393] flex items-center font-medium text-sm">
            <span class="material-icons text-gray-500 mr-1">language</span>
            <span class="text-gray-500 mr-1">{{ isTablet || isMobile ? 'Български' : 'BG' }}</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem as-child>
          <div class="text-gray-600 hover:text-800 flex items-center text-sm">English</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <div
      class="text-[14px] absolute left-0 -bottom-8 whitespace-nowrap rounded-md bg-gray-100 text-gray-500 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
    >
      Очаквайте скоро!
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useBreakpoint } from '@/composables/useBreakpoint'

const { isMobile, isTablet } = useBreakpoint()
</script>
