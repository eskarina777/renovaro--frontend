<template>
  <button
    class="w-full text-xs sm:text-[12px] py-2 border border-gray-400 rounded-[4px] text-gray-600"
    @click="emit('toggle')"
  >
    {{ !props.expanded ? ' Вижте повече' : 'Вижте по-малко' }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ expanded: boolean }>()
const emit = defineEmits(['toggle'])
</script>
