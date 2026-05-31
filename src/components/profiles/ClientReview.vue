<template>
  <div>
    <div class="bg-white pt-[10px] px-6 rounded-sm border border-gray-200">
      <div class="flex items-center mb-2">
        <img
          v-if="review.reviewerProfileImageUrl && review.reviewerProfileImageUrl.length > 2"
          class="w-11 h-11 rounded-full opacity-90 object-cover mr-2"
          :src="review.reviewerProfileImageUrl"
        />

        <div
          v-else
          class="w-[56px] h-[56px] rounded-full bg-[#e7f0eb] flex items-center justify-center text-[#3b6751] font-xl opacity-60 mr-4"
        >
          {{ review.reviewerProfileImageUrl }}
        </div>

        <div class="items-center">
          <div class="flex items-center mt-1">
            <span class="text-gray-800 text-[15px] ml-[3px]">{{ review.reviewerName }}</span>
          </div>

          <div v-if="review.serviceCity" class="text-gray-500 flex items-center">
            <span class="material-icons-outlined text-gray-400 align-middle mr-0.5 text-[17px]"
              >location_on</span
            >
            <span class="text-[13px]">{{ review.serviceCity }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-between my-3 pt-3 border-t border-gray-200 text-xs">
        <StarRating
          :value="review.ratingGeneral"
          star-class="text-[14px]"
          value-class="text-[14px]"
          outer-gap-class="gap-1"
          inner-gap-class="gap-0.5"
        />
        <div>
          <span class="text-xs font-medium text-gray-500 ml-2">{{
            formatDate(review.createdAt)
          }}</span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 mb-3">
        <div v-if="review.userReviewContent" class="w-full order-2 sm:order-1">
          <p
            class="text-[13px] text-gray-700 hover:text-black overflow-hidden leading-[1.45]"
            :class="!shouldClamp || isReviewTextExpanded ? '' : 'line-clamp-2'"
          >
            {{ review.userReviewContent }}
          </p>

          <button
            v-if="shouldClamp"
            class="flex w-full justify-end hover:underline text-xs text-[#3b6751] opacity-80 mr-1"
            @click="isReviewTextExpanded = !isReviewTextExpanded"
          >
            {{ isReviewTextExpanded ? 'Скрийте' : 'Вижте повече' }}
          </button>
        </div>
        <div v-if="review.reviewImageUrl" class="order-1 sm:order-2">
          <img
            alt="Interior design rendering"
            class="w-full h-[200px] sm:w-[112px] sm:h-[60px] object-cover rounded-sm opacity-60"
            :src="review.reviewImageUrl ? review.reviewImageUrl : '-'"
          />
        </div>
      </div>
      <div
        v-if="review.serviceDurationDays && review.servicePrice"
        class="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 ml-1 mb-1.5"
      >
        <div>
          <p class="text-xs text-gray-500 mb-1">Цена</p>
          <p class="text-xs font-medium text-gray-700">{{ review.servicePrice }} €</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Време за изпълнение</p>
          <p v-if="props.review.serviceDurationDays" class="text-xs font-medium text-gray-500 mb-1">
            {{ formatBgDuration(props.review.serviceDurationDays) }}
          </p>
          <p v-else class="text-xs text-gray-700">—</p>
        </div>
      </div>
      <div
        v-if="review.providerAnswer"
        class="flex justify-between items-center mt-2 pt-1 border-t border-gray-200"
      >
        <Collapsible v-model:open="isAnswerOpen" class="w-full">
          <CollapsibleTrigger
            class="flex justify-between text-sm w-full text-gray-600 pl-3 pr-2 py-2 font-normal"
          >
            <div class="flex items-center">
              <div class="w-9 h-9 mr-4">
                <img class="w-8 h-8 rounded-full mr-2" :src="review.providerProfileImageUrl" />
              </div>
              <div class="flex mt-1">
                <span class="text-gray-500 text-[13px]"
                  >Отговор от
                  <span class="text-gray-800 text-[14px]"> {{ review.providerName }}</span>
                </span>
              </div>
            </div>
            <div class="flex items-center">
              <ChevronDown
                class="ml-1 mt-0.5 h-4 w-4 flex items-center"
                :class="isAnswerOpen ? 'rotate-180' : ''"
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent align="start" class="text-sm text-gray-700 w-full">
            <p
              class="text-[13px] text-gray-800 hover:text-black overflow-hidden pb-2 ml-16 mb-2"
              :class="!shouldClamp2 || isAnswerTextExpanded ? '' : 'line-clamp-3'"
            >
              {{ review.providerAnswer }}
            </p>

            <button
              v-if="shouldClamp2"
              class="flex w-full justify-end hover:underline text-xs text-[#3b6751] opacity-80 mr-1"
              @click="isAnswerTextExpanded = !isAnswerTextExpanded"
            >
              {{ isAnswerTextExpanded ? 'Скрийте' : 'Вижте повече' }}
            </button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ReviewType } from '@/types/Types'
import { formatDate } from '@/composables/useFormatDate'
import { formatBgDuration } from '@/composables/useFormatBgDuration'
import { ref, computed } from 'vue'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-vue-next'
import StarRating from '@/components/ad-view/StarRating.vue'
const isAnswerOpen = ref(false)
const isReviewTextExpanded = ref(false)
const isAnswerTextExpanded = ref(false)
const shouldClamp = computed(() => props.review.userReviewContent.length > 180)
const shouldClamp2 = computed(() =>
  props.review.providerAnswer?.length ? props.review.providerAnswer?.length > 180 : false,
)

const props = defineProps<{
  review: ReviewType
}>()
</script>
<style>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
