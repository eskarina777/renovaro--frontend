<template>
  <button
    type="button"
    class="bg-gray-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    {{ props.label }}
    <span class="material-icons text-sm ml-1 relative top-[2px]">arrow_forward</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
  }>(),
  {
    label: 'Запазете и продължете',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
