<template>
  <button
    type="button"
    class="flex items-center text-gray-600 hover:text-gray-800"
    @click="emit('click')"
  >
    <span class="material-icons text-sm">arrow_back</span>
    <span class="ml-2 mr-2">{{ props.label }}</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Назад',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
