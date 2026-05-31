<template>
  <p
    class="ml-1 text-[14px] font-normal text-[#5ea480] mb-1.5"
    :class="reservation.reStatus === 'COMPLETED' ? 'opacity-60' : ''"
  >
    Консултация/оглед
  </p>
  <div
    class="space-y-3 mb-3 rounded-sm"
    :class="
      reservation.reStatus === 'PENDING'
        ? 'bg-gray-100 '
        : reservation.reStatus === 'COMPLETED'
          ? 'opacity-60 border border-gray-200 '
          : 'border border-gray-200 '
    "
  >
    <div>
      <div class="flex flex-wrap items-start gap-x-6 gap-y-4 p-3 rounded-sm">
        <div class="flex flex-col items-start min-w-[160px]">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-[#5ea480] mr-1 text-lg">person</span>
            <span class="text-[14px] font-medium text-gray-700">{{
              props.reservation.userContactInfo.userName
            }}</span>
          </div>
          <p class="text-[14px] text-gray-600 ml-6">
            {{ reservation.userContactInfo.userPhoneNumber }}
          </p>
        </div>
        <div class="flex flex-col items-start min-w-[210px]">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-[#5ea480] mr-1 text-base">location_on</span>
            <span class="text-[14px] font-medium text-gray-600 whitespace-nowrap"
              >{{ reservation.address.city }},&nbsp;
            </span>
            <span class="text-[14px] font-medium text-gray-600 whitespace-nowrap">
              {{ reservation.address.district }}</span
            >
          </div>
          <div class="flex flex-row">
            <p class="text-[14px] text-gray-700 ml-6">
              ул."{{ reservation.address.street }}" &nbsp;
            </p>
            <p class="text-[14px] text-gray-700">{{ reservation.address.streetNumber }}</p>
          </div>
        </div>

        <div class="flex flex-col items-start min-w-[120px]">
          <div class="flex items-center">
            <span class="material-icons-outlined text-[#5ea480] mr-2 text-base"
              >calendar_today</span
            >
            <span class="text-[14px] font-medium text-gray-700">{{
              formatBgDate(reservation.appointment.date)
            }}</span>
          </div>
          <div class="text-[14px] text-gray-600 ml-6">
            {{ reservation.appointment.startTimeLabel }}
            <span v-if="reservation.appointment.endTimeLabel" class=""> – </span>
            {{ reservation.appointment.endTimeLabel }}
          </div>
        </div>

        <div class="flex flex-rowitems-start min-w-[120px]">
          <div class="flex items-start">
            <span class="material-symbols-outlined text-[#5ea480] mr-2 text-base">sell</span>
          </div>
          <div>
            <span class="text-[14px] font-medium text-gray-700">Цена</span>
            <div class="text-[14px] text-gray-600">
              {{ reservation.consultationPrice.consultationPriceMin }}
              <span
                v-if="
                  reservation.consultationPrice.consultationPriceMin !== null &&
                  reservation.consultationPrice.consultationPriceMax !== null
                "
                class=""
              >
                –
              </span>
              {{ reservation.consultationPrice.consultationPriceMax }}
              <span
                v-if="
                  reservation.consultationPrice.consultationPriceMin !== null ||
                  reservation.consultationPrice.consultationPriceMax !== null
                "
                class=""
              >
                €</span
              >
              <span
                v-if="
                  reservation.consultationPrice.consultationPriceMin == null &&
                  reservation.consultationPrice.consultationPriceMax == null
                "
                >—</span
              >
            </div>
          </div>
        </div>

        <div class="flex items-start ml-auto">
          <div v-if="reservation.reStatus === 'PENDING'" class="flex flex-col gap-y-1.5">
            <button
              class="w-[105px] h-[28px] text-xs font-medium text-[#5ea480] border-[#5ea480] border px-3 py-[5px] rounded-md hover:border-gray-600 hover:text-gray-600"
            >
              Потвърдете
            </button>
            <button
              class="w-[105px] h-[28px] text-xs font-medium text-[#5ea480] border-[#5ea480] border px-3 py-[5px] rounded-md hover:border-gray-600 hover:text-gray-600"
            >
              Откажете
            </button>
          </div>
          <button
            v-if="reservation.reStatus === 'CONFIRMED'"
            class="w-[105px] h-[28px] text-xs font-medium text-[#5ea480] border-[#5ea480] border px-3 py-[5px] rounded-md hover:border-gray-600 hover:text-gray-600"
          >
            Отменете
          </button>
          <button
            v-if="reservation.reStatus === 'COMPLETED'"
            class="w-[105px] h-[28px] text-xs font-medium text-[#5ea480] border-[#5ea480] border px-1 py-[5px] rounded-md hover:border-gray-600 hover:text-gray-600"
          >
            Архивирайте
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatBgDate } from '@/utils/date'
import type { ConsultationReservationType } from '@/types/Types'
const props = defineProps<{
  reservation: ConsultationReservationType
}>()
</script>
<style scoped></style>
