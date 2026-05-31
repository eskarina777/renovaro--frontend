<template>
  <header class="py-4 bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto">
    <div v-if="isDesktop" class="container mx-auto flex items-center justify-between">
      <AppLogo />
      <div class="flex items-center space-x-6 ml-7">
        <ResourcesHeader />
        <LanguageToggle />
        <PublishAd />
        <div class="flex items-center space-x-4">
          <CalendarIcon />
          <WalletIcon />
          <MessageIcon />
          <NotificationIcon />
          <ProviderDropdown />
        </div>
      </div>
    </div>
    <div
      v-else-if="isTablet || isMobile"
      class="container mx-auto flex items-center justify-between"
    >
      <div class="flex items-center gap-x-3">
        <Sheet>
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
              <SheetClose as-child>
                <div class="flex items-center gap-x-2">
                  <CalendarIcon />
                  <p class="text-gray-500">Управление на календар</p>
                </div>
              </SheetClose>
              <SheetClose as-child>
                <div class="flex items-center gap-x-2">
                  <WalletIcon />
                  <p class="text-gray-500">Управление на кредити</p>
                </div>
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
      <div class="flex items-center sm:space-x-4 space-x-3">
        <MessageIcon />
        <NotificationIcon />
        <ProviderDropdown />
      </div>
    </div>
  </header>
  <div class="w-full border-b border-gray-200"></div>
  <CategoryNav />
</template>

<script setup lang="ts">
import CategoryNav from '@/components/layout/header/shared/CategoryNav.vue'
import AppLogo from './shared/AppLogo.vue'
import ResourcesHeader from './shared/ResourcesDropdown.vue'
import LanguageToggle from './shared/LanguageToggle.vue'
import MessageIcon from '@/components/layout/header/shared/MessageIcon.vue'
import NotificationIcon from './shared/NotificationIcon.vue'
import PublishAd from './shared/PublishAd.vue'
import ProviderDropdown from './shared/ProviderDropdown.vue'
import WalletIcon from './shared/WalletIcon.vue'
import CalendarIcon from './shared/CalendarIcon.vue'
import { Menu as MenuIcon } from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { useBreakpoint } from '@/composables/useBreakpoint'
import SectionResources from '../footer/footer-sections/SectionResources.vue'

const { isMobile, isTablet, isDesktop } = useBreakpoint()
</script>
<style></style>
