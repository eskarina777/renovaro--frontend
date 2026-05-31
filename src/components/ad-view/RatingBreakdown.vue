<template>
  <div v-if="ratingCount" class="container mx-auto py-8">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full space-y-6">
        <h2 class="text-lg font-medium text-gray-700 mt-4 mb-6">Рейтинг</h2>
        <div class="flex justify-between items-center space-x-2">
          <div class="">
            <span class="ml-1 text-sm sm:text:lg font-medium text-gray-500 whitespace-nowrap">
              {{ ratingCount ?? 0 }} оценки
            </span>
          </div>
          <StarRating :value="ratingAverage ?? 0" />
        </div>
        <div class="flex flex-col md:flex-row md:space-x-8">
          <div class="w-full flex-[4] space-y-2 px-2">
            <RatingBreakdownBars :stars="userRating.stars" />
          </div>
          <div class="w-full md:flex-[3] mt-6 md:mt-0 px-2">
            <RatingCriteriaList :criteria="props.userRating.criteria" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserRatingType } from '@/types/Types'
import StarRating from '@/components/ad-view/StarRating.vue'
import RatingBreakdownBars from './RatingBreakdownBars.vue'
import RatingCriteriaList from './RatingCriteriaList.vue'

const props = defineProps<{
  userRating: UserRatingType
  ratingCount: number
  ratingAverage: number
}>()
</script>
<style scoped></style>
