<template>
  <Tabs default-value="basic" class="w-full">
    <TabsList class="w-full bg-white px-5 sm:px-0">
      <TabsTrigger
        value="basic"
        :disabled="!packages.basic"
        class="flex-1 text-[16px] sm:text-[18px] py-5 px-3 sm:px-4 border-r shadow-none data-[state=active]:shadow-none text-center font-medium data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-b-gray-800 text-gray-400 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 transition duration-150 rounded-none border-b"
      >
        Основен
      </TabsTrigger>
      <TabsTrigger
        value="standard"
        :disabled="!packages.standard"
        class="flex-1 text-[16px] sm:text-[18px] py-5 px-3 sm:px-4 border-r shadow-none data-[state=active]:shadow-none text-center font-medium data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-b-gray-800 text-gray-400 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 transition duration-150 rounded-none border-b"
      >
        Стандартен
      </TabsTrigger>
      <TabsTrigger
        value="premium"
        :disabled="!packages.premium"
        class="flex-1 text-[16px] sm:text-[18px] py-5 px-3 sm:px-4 shadow-none data-[state=active]:shadow-none text-center font-medium data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-gray-800 text-gray-400 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 transition duration-150 rounded-none border-b"
      >
        Разширен
      </TabsTrigger>
    </TabsList>

    <TabsContent value="basic">
      <FreelancePackageCard :pkg="packages.basic" :unit="pricingUnitLabel" type="basic" />
    </TabsContent>

    <TabsContent value="standard">
      <FreelancePackageCard :pkg="packages.standard" :unit="pricingUnitLabel" type="standard" />
    </TabsContent>
    <TabsContent value="premium">
      <FreelancePackageCard :pkg="packages.premium" :unit="props.pricingUnitLabel" type="premium" />
    </TabsContent>
  </Tabs>
  <div class="text-xs mt-2 sm:px-2 flex flex-col sm:flex-row gap-4 sm:mx-11 mb-7">
    <BookFreelanceService class="w-full" :providerId="providerId" />
    <ContactButton class="w-full" :providerId="providerId" />
  </div>

  <ContactModal
    v-if="showContactModal"
    :providerId="providerId"
    @close="showContactModal = false"
  />
</template>
<script setup lang="ts">
import type { FreelancePackageResponce } from '@/types/Types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import ContactButton from '../ad-view/ContactButton.vue'
import BookFreelanceService from '../publish-ad-view/common/BookFreelanceService.vue'
import FreelancePackageCard from './FreelancePackageCard.vue'
import ContactModal from './ContactModal.vue'
import { ref, provide } from 'vue'

const props = defineProps<{
  packages: FreelancePackageResponce
  pricingUnitLabel: string | null | undefined
  providerId: number
}>()

provide('openContactModal', openContactModal)

const showContactModal = ref(false)

function openContactModal() {
  showContactModal.value = true
}
</script>
<style scoped>
.package-tabs-trigger {
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: 500;
  color: #9ca3af;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease;
}

.package-tabs-trigger:hover {
  color: #374151;
  border-bottom-color: #d1d5db;
}

.package-tabs-trigger[data-state='active'] {
  color: #1f2937;
  border-bottom-color: #1f2937;
}
</style>
