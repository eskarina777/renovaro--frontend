<template>
  <div class="">
    <div class="container mx-auto px-[20px] sm:px-[40px] rounded-lg pt-[20px] sm:pt-[40px] pb-12">
      <div class="relative">
        <div class="relative flex flex-col xl:flex-row sm:gap-y-16 gap-y-6 items-center">
          <div class="md:w-1/2 sm:mt-4 md:mt-0 md:pr-3 order-first flex justify-center">
            <img
              class="opacity-70 rounded-lg shadow-xl h-auto object-cover"
              src="/reach-clients.png"
            />
          </div>
          <div class="xl:w-1/2 space-y-8 md:pl-3 order-last">
            <h1 class="text-xl md:text-3xl font-medium text-[#5ea480] ml-2 sm:ml-6 sm:mb-9">
              Искате да достигнете до повече клиенти
            </h1>
            <div class="hidden sm:block">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="flex items-start space-x-3">
                    <span class="material-icons font-bold text-[#5ea480] mt-1">check</span>
                    <div>
                      <h3 class="font-semibold text-gray-600">Lorem ipsum dolor sit</h3>
                      <p class="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
                        incididunt
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex items-start space-x-3">
                    <span class="material-icons font-bold text-[#5ea480] mt-1">check</span>
                    <div>
                      <h3 class="font-semibold text-gray-600">Lorem ipsum dolor sit</h3>
                      <p class="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
                        incididunt
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    :class="['flex items-start space-x-3', expanded ? 'flex' : 'hidden sm:flex']"
                  >
                    <span class="material-icons font-bold text-[#5ea480] mt-1">check</span>
                    <div>
                      <h3 class="font-semibold text-gray-600">Lorem ipsum dolor sit</h3>
                      <p class="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
                        incididunt
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    :class="['flex items-start space-x-3', expanded ? 'flex' : 'hidden sm:flex']"
                  >
                    <span class="material-icons font-bold text-[#5ea480] mt-1">check</span>
                    <div>
                      <h3 class="font-semibold text-gray-600">Lorem ipsum dolor sit</h3>
                      <p class="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
                        incididunt
                      </p>
                    </div>
                  </div>
                </div>

                <div class="border-t w-full sm:hidden"></div>
                <div class="flex justify-center sm:hidden">
                  <ToggleExpandButton :expanded="expanded" @toggle="expanded = !expanded" />
                </div>
              </div>
            </div>
            <div class="flex justify-center sm:justify-end">
              <TryNowButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RegistrationModal v-if="showRegistrationModal" @close="showRegistrationModal = false" />
</template>
<script setup lang="ts">
import TryNowButton from '../buttons/TryNowButton.vue'
import ToggleExpandButton from '@/components/buttons/ToggleExpandButton.vue'
import { ref, provide } from 'vue'
import RegistrationModal from '../auth/RegistrationModal.vue'
const expanded = ref(false)
const showRegistrationModal = ref(false)
const openRegistrationModal = () => {
  showRegistrationModal.value = true
}
provide('openRegistrationModal', openRegistrationModal)
</script>
