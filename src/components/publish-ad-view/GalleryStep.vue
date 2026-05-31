<template>
  <div class="bg-[#f6f7f8]">
    <div
      class="bg-gray-100px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1126px] 2xl:mx-auto pb-4 sm:pb-6"
    >
      <div class="flex flex-col sm:flex-row items-start gap-y-6">
        <div class="p-6">
          <div>
            <h1 class="text-lg font-medium text-gray-700 mb-1 sm:mt-6">
              Покажете Вашата услуга <span class="hidden sm:inline"> в галерията</span>
            </h1>
            <p class="text-sm text-gray-500 mb-8">
              Насърчете клиентите да изберат Вашата обява, като представите своята работа
            </p>
          </div>
          <div class="flex items-start bg-gray-200 p-4 rounded-sm mb-8">
            <span class="material-icons-outlined text-gray-500 mr-3">info</span>
            <p class="text-xs text-gray-700">
              За да спазите Общите условия, качвайте само собствено съдържание или такова за което
              имате разрешение или лиценз.
            </p>
          </div>
          <h2 class="text-md font-medium mb-5 sm:mb-1">Изображения (до 5)</h2>
          <p class="text-gray-600 sm:mb-6 text-sm hidden sm:block">
            Привлечете вниманието на точните клиенти с визуални примери на Вашите услуги
          </p>

          <input
            ref="fileInputRef"
            type="file"
            accept="image/jpeg,image/png"
            class="hidden"
            @change="onFilesSelected"
          />
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 px-5 sm:px-0">
            <template v-for="slotIndex in 5" :key="slotIndex">
              <div
                v-if="images[slotIndex - 1]"
                class="h-[170px] border-2 border-dashed border-gray-300 bg-white relative overflow-hidden group"
              >
                <span
                  v-if="slotIndex === 1"
                  class="absolute bottom-0 left-1 z-20 opacity-100 material-icons text-white text-xl mb-1"
                >
                  star
                </span>

                <img
                  :src="images[slotIndex - 1]?.previewUrl"
                  class="w-full h-full object-cover opacity-70"
                />

                <button
                  type="button"
                  class="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition"
                  @click.stop="openFilePicker(slotIndex - 1)"
                >
                  <span class="material-icons-outlined text-white text-xl mb-1">edit</span>
                </button>
              </div>

              <div
                v-else-if="slotIndex - 1 === images.length && images.length < 5"
                class="h-[170px] border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                @click="openFilePicker(slotIndex - 1)"
              >
                <span class="material-icons text-gray-300 text-4xl mb-1">photo_camera</span>
                <span class="text-[14px] text-gray-500 font-normal hover:underline">
                  Прикачете снимка
                </span>
              </div>
              <div v-else class="h-[170px] border-2 border-dashed border-gray-300 bg-white"></div>
              <div
                v-if="slotIndex === 5"
                class="h-[170px] border-2 border-dashed border-gray-300 hidden sm:inline"
              ></div>
            </template>
          </div>

          <div class="flex items-start sm:mt-10 ml-1">
            <input
              v-model="imagesTermsAccepted"
              class="h-4 w-4 scale-150 origin-top-left mt-0.5 mr-1 accent-gray-600 cursor-pointer border-2 border-gray-400 rounded-sm"
              type="checkbox"
            />

            <label class="text-sm text-gray-600 ml-3" for="declaration">
              Декларирам, че тези материали са създадени от мен или от моят екип и не нарушават
              права на трети страни. Разбирам, че неправомерната употреба на дигитални ресурси е в
              противоречие с Общите условия.
            </label>
          </div>
        </div>

        <div class="max-w-[320px] pl-12 sm:pl-6 pb-8 mt-1 sm:mt-20">
          <GalleryInstructions />
        </div>
      </div>

      <div class="flex flex-col items-end mt-12 mb-8 space-y-3 relative">
        <div
          v-if="touchedStep && !isStepValid()"
          class="px-5 py-4 opacity-60 max-w-[400px] w-full bg-[#ec9393] text-white text-sm font-medium rounded-sm shadow-lg animate-fade-in text-center"
        >
          Моля прикачете най-малко една снимка и декларирайте произхода на материалите, за да
          продължите.
        </div>
        <StepperNextButton @click="onNext" class="mr-8 sm:mr-0" />
        <StepperBackButton @click="onBack" class="mr-8 sm:mr-0" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePublishAdStore } from '@/stores/publishAdStore'
import GalleryInstructions from './common/GalleryInstructions.vue'
import StepperNextButton from './common/StepperNextButton.vue'
import StepperBackButton from './common/StepperBackButton.vue'
const publishAdStore = usePublishAdStore()
const { currentStep, hasCalendar } = storeToRefs(publishAdStore)
const touchedStep = ref(false)
const { images, imagesTermsAccepted } = storeToRefs(publishAdStore)
const fileInputRef = ref<HTMLInputElement | null>(null)
const replaceTargetIndex = ref<number | null>(null)
function openFilePicker(index: number) {
  fileInputRef.value?.click()
  replaceTargetIndex.value = index
}
function onFilesSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (replaceTargetIndex.value !== null) {
    publishAdStore.replaceImage(replaceTargetIndex.value, file)
  }

  replaceTargetIndex.value = null
  target.value = ''
}

function onBack() {
  if (hasCalendar.value === true) publishAdStore.goToStep(currentStep.value - 1)
  else publishAdStore.goToStep(currentStep.value - 2)
}
function isStepValid(): boolean {
  const hasImage = publishAdStore.images.length > 0
  const termsAccepted = publishAdStore.imagesTermsAccepted === true

  return hasImage && termsAccepted
}

function onNext() {
  touchedStep.value = true

  if (!isStepValid()) {
    return
  }
  publishAdStore.markStepSaved(currentStep.value)
  publishAdStore.goToStep(currentStep.value + 1)
  touchedStep.value = false
}
watch(
  () => publishAdStore.images,
  (val) => console.log('IMAGES CHANGED:', val),
  { deep: true },
)
</script>
