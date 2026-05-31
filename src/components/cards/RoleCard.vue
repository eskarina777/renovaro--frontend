<template>
  <div
    class="mx-auto soft-shadow text-[#3b6751] border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300 relative"
    @click="select"
  >
    <input
      type="checkbox"
      class="absolute accent-[#3b6751] cursor-pointer top-3 right-3 h-5 w-5 text-[#3b6751] opacity-50 border-2 border-gray-400 rounded-sm focus:ring-white"
      :checked="modelValue === data.role"
      @change.stop="select"
    />

    <div
      class="w-16 h-16 sm:w-20 sm:h-20 mb-4 mx-4 bg-[#e7f0eb] flex items-center justify-center opacity-70"
    >
      <span class="material-icons material-icons-outlined text-[#3b6751] opacity-40 text-5xl">{{
        data.icon
      }}</span>
    </div>

    <h3 class="font-medium text-gray-500">{{ data.label }}</h3>
  </div>
</template>

<script setup lang="ts">
import type { RoleCardType, Role } from '@/types/Types'

const props = defineProps<{
  modelValue: Role | null
  data: RoleCardType
}>()

const emit = defineEmits(['update:modelValue'])
function select() {
  emit('update:modelValue', props.data.role)
}
</script>
