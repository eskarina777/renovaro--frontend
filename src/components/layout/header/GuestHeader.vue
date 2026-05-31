<template>
  <header class="py-4 bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <div v-if="isDesktop" class="container mx-auto flex items-center justify-between">
      <AppLogo />
      <div class="ml-8 w-full hidden [@media(min-width:1240px)]:block">
        <SearchbarHeader @submit-search-input="handleSearch" />
      </div>
      <div class="flex items-center space-x-6 ml-7">
        <ResourcesHeader />
        <LanguageToggle />
        <PublishAd />
        <RegisterButton />
        <LoginButton />
      </div>
    </div>
    <div v-else-if="isTablet" class="container mx-auto flex items-center justify-between">
      <div class="flex items-center gap-x-3">
        <Sheet v-model:open="isOpen">
          <SheetTrigger as-child>
            <MenuIcon class="w-5 h-5 text-gray-500"></MenuIcon>
          </SheetTrigger>
          <SheetContent side="left" class="w-[360px] max-w-none sm:w-[420px] sm:max-w-none">
            <SheetHeader>
              <SheetTitle class="text-lg flex justify-start font-medium text-gray-800 mb-4"
                ><AppLogo
              /></SheetTitle>
            </SheetHeader>
            <div class="flex flex-col gap-y-3 mb-3">
              <SearchbarHeader @submit-search-input="handleSearch" />
              <SheetClose as-child>
                <PublishAd />
              </SheetClose>
              <LanguageToggle />
            </div>
            <SectionResources />
          </SheetContent>
        </Sheet>
        <AppLogo />
      </div>
      <div class="flex items-center space-x-6 ml-7">
        <RegisterButton />
        <LoginButton />
      </div>
    </div>
    <div v-else-if="isMobile" class="container mx-auto flex items-center justify-between">
      <div class="flex items-center gap-x-3">
        <Sheet v-model:open="isOpen">
          <SheetTrigger as-child>
            <MenuIcon class="w-5 h-5 text-gray-500"></MenuIcon>
          </SheetTrigger>
          <SheetContent side="left" class="w-[360px] max-w-none sm:w-[420px] sm:max-w-none">
            <SheetHeader>
              <SheetTitle class="text-lg flex justify-start font-medium text-gray-800 mb-4"
                ><AppLogo
              /></SheetTitle>
            </SheetHeader>

            <div class="flex flex-col justify-start gap-y-3 mb-3">
              <SearchbarHeader @submit-search-input="handleSearch" />
              <SheetClose as-child>
                <RegisterButton />
              </SheetClose>
              <SheetClose as-child>
                <PublishAd />
              </SheetClose>
              <LanguageToggle />
            </div>
            <SectionResources />
          </SheetContent>
        </Sheet>
        <AppLogo />
      </div>
      <div class="flex items-center space-x-6 ml-7">
        <LoginButton />
      </div>
    </div>
  </header>
  <div class="w-full border-b border-gray-200"></div>
  <CategoryNav />
</template>

<script setup lang="ts">
import CategoryNav from '@/components/layout/header/shared/CategoryNav.vue'

import { useRouter } from 'vue-router'
import AppLogo from './shared/AppLogo.vue'
import ResourcesHeader from './shared/ResourcesDropdown.vue'
import LanguageToggle from './shared/LanguageToggle.vue'
import PublishAd from './shared/PublishAd.vue'
import SearchbarHeader from './shared/SearchbarHeader.vue'
import RegisterButton from '@/components/buttons/RegisterButton.vue'
import LoginButton from '@/components/buttons/LoginButton.vue'
import { Menu as MenuIcon } from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import SectionResources from '../footer/footer-sections/SectionResources.vue'
import { useBreakpoint } from '@/composables/useBreakpoint'
import { ref } from 'vue'

const isOpen = ref(false)
const { isMobile, isTablet, isDesktop } = useBreakpoint()
const router = useRouter()
const handleSearch = (query: string) => {
  console.log('Searching for:', query)
  if (!query) {
    alert('Моля, въведете търсената от Вас услуга.')
    return
  }
  router.push({ name: 'search-results', query: { q: query } })
  isOpen.value = false
}
</script>
