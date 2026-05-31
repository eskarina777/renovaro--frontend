<template>
  <div class="container mx-auto">
    <div class="relative flex flex-col xl:flex-row sm:gap-y-6 gap-y-6 items-centerborder">
      <div class="order-2 xl:order-1 xl:w-1/2 space-y-6 md:space-y-8">
        <h1 class="text-xl md:text-3xl font-medium text-[#5ea480] ml-2 sm:ml-6 sm:mb-8">
          Имате нужда от съдействие с услуга или проект
        </h1>
        <div class="hidden sm:block">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-0">
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
              <div :class="['flex items-start space-x-3', expanded ? 'flex' : 'hidden sm:flex']">
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
              <div :class="['flex items-start space-x-3', expanded ? 'flex' : 'hidden sm:flex']">
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
        <div class="sm:ml-10 flex justify-center sm:justify-start">
          <TryNowButton />
        </div>
      </div>

      <div class="order-1 xl:order-2 xl:w-1/2 md:mt-0 p-2 md:p-12 md:pl-12">
        <div class="">
          <img
            class="opacity-70 rounded-lg shadow-xl w-full h-auto object-cover"
            src="/need-assistance.png"
          />
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
