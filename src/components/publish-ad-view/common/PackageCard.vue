<template>
  <div class="sm:px-12 py-6">
    <div class="flex justify-between items-start mb-5">
      <h2 class="text-lg font-medium text-gray-700">
        {{ pkg.packageTitle }}
      </h2>

      <div class="flex items-center">
        <p class="text-lg font-medium text-gray-700 whitespace-nowrap">
          <AdPrice :priceMin="pkg.packagePrice" :priceMax="null" :pricingUnit="unit" />
        </p>
        <span class="material-icons text-gray-500 ml-1 text-base cursor-pointer">
          info_outline
        </span>
      </div>
    </div>
    <div class="text-gray-600 mb-8 mt-3" v-html="pkg.packageDescription"></div>
    <div class="space-y-1.5 text-base text-gray-700 mt-5 mb-5 font-medium">
      <div class="flex flex-col sm:flex-row gap-y-2 gap-x-4 font-medium">
        <div class="whitespace-nowrap items-center">
          <span class="material-icons align-middle text-gray-500 mr-[4px] mb-0.5 text-[18px]">
            schedule
          </span>
          <span> {{ pkg.deliveryDays ? pkg.deliveryDays : '' }}-дни за изработка</span>
        </div>
        <div class="whitespace-nowrap items-center">
          <span class="material-icons align-middle text-gray-500 mr-1 mb-0.5 text-[20px]">
            sync
          </span>
          <span class="mr-1.5">{{ pkg.revisionCount ? pkg.revisionCount : '0' }}</span
          ><span>{{ pkg.revisionCount === 1 ? 'ревизия' : 'ревизии' }}</span>
        </div>
      </div>

      <div class="flex items-center">
        <span
          class="material-icons font-bold mr-2 text-base"
          :class="pkg.has3DModel ? 'text-gray-800' : 'text-gray-400'"
        >
          check
        </span>
        <span class="text-gray-400 text-sm">3D модел</span>
      </div>

      <div class="flex items-center">
        <span
          class="material-icons font-bold mr-2 text-base"
          :class="pkg.has2DDrawings ? 'text-gray-800' : 'text-gray-400'"
        >
          check
        </span>
        <span class="text-gray-400 text-sm">2D чертежи</span>
      </div>

      <div class="flex items-center">
        <span
          class="material-icons font-bold mr-2 text-base"
          :class="
            pkg.renderCount === null || pkg.renderCount === 0 ? 'text-gray-400' : 'text-gray-800'
          "
        >
          check
        </span>

        <span class="text-gray-400 text-sm"
          >{{ pkg.renderCount ? pkg.renderCount : '0' }}
          {{ pkg.renderCount === 1 ? 'визуализация' : 'визуализации' }}</span
        >
      </div>

      <div class="flex items-center">
        <span
          class="material-icons font-bold mr-2 text-base"
          :class="
            pkg.detailDrawingCount === null || pkg.detailDrawingCount === 0
              ? 'text-gray-400'
              : 'text-gray-800'
          "
        >
          check
        </span>
        <span class="text-gray-400 text-sm"
          >{{ pkg.detailDrawingCount ? pkg.detailDrawingCount : '0' }}
          {{ pkg.detailDrawingCount === 1 ? 'детайл' : 'детайли' }}</span
        >
      </div>
      <div class="flex items-center">
        <span
          class="material-icons font-bold mr-2 text-base"
          :class="pkg.hasSourceFile ? 'text-gray-800' : 'text-gray-400'"
        >
          check
        </span>
        <span class="text-gray-400 text-sm">изходен файл</span>
      </div>
    </div>

    <div class="bg-gray-100 text-gray-500 rounded-sm p-2 text-sm mt-4 mx-1">
      <div class="flex items-start gap-2">
        <span class="material-icons-outlined text-xs align-middle"> info </span>

        <div>
          <p class="font-medium text-xs">Важна информация</p>
          <p class="font-normal text-xs">
            {{ pkg.packageInfo }}Цените са определени с официалният тарифен калкулатор на Камарата
            на архитектите в България (КАБ)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FreelancePackage, PackageType } from '@/stores/freelanceStore'
import AdPrice from './AdPrice.vue'

defineProps<{
  pkg: FreelancePackage
  type: PackageType
  unit: string | null | undefined
}>()
</script>
