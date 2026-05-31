<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>
<template>
  <CalendarCellTrigger
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),

        // base: square buttons, allow bleed background
        'relative overflow-visible h-8 w-8 p-0 font-medium rounded-none calendar-day-bleed',

        // ALLOWED & IN CURRENT MONTH (between min/max, not outside-view)
        // '[&:not([data-disabled]):not([data-outside--view])]:bg-[#dcebe3]',
        '[&:not([data-disabled]):not([data-outside--view])]:bg-[#e9f2ed]',
        '[&:not([data-disabled]):not([data-outside-view])]:text-gray-500',

        // ALLOWED & OUTSIDE-VIEW (next/prev month but still in range)
        '[&[data-outside-view]:not([data-disabled])]:bg-[#f5f9f7]',
        '[&[data-outside-view]:not([data-disabled])]:text-gray-300',

        // HOVER: text becomes white (bg stays the same)
        // '[&:not([data-disabled]):not([data-outside-view]):hover]:text-white',
        '[&:not([data-disabled]):not([data-outside-view]):hover]:text-gray-800',

        // SELECTED → keep same bg, force text white
        // 'data-[selected]:!text-white',
        // 'data-[selected]:!text-gray-6-700',
        // 'data-[selected]:!text-[#6ea988]',
        'data-[selected]:!text-gray-500',
        'data-[selected]:!border',
        'data-[selected]:!border-gray-400',

        // TODAY (not selected) → darker number so it stands out
        '[&[data-today]:not([data-selected])]:text-gray-500',
        // '[&[data-today]:not([data-selected])]:rounded-l-[6px]',

        // DISABLED (before min or after max)
        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-40',

        // UNAVAILABLE
        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',

        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>

<style scoped>
.calendar-day-bleed::before {
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  top: 0;
  bottom: 0;
  background-color: #e9f2ed;
  z-index: -1;
}

.calendar-day-bleed[data-disabled]::before,
.calendar-day-bleed[data-outside-view]::before {
  background-color: transparent;
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  top: 0;
  bottom: 0;
  background-color: #f5f9f7;
  z-index: -1;
}
.calendar-day-bleed[data-disabled]::before {
  background-color: transparent;
}

.calendar-day-bleed[data-today]::before {
  left: 0;
  right: -2px;
  border-radius: 6px 0 0 6px !important ;
}
</style>
