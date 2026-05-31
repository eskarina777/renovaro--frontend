<template>
  <button class="text-gray-600 font-medium text-lg hover:text-[#5ea480]" @click="emit('toggle')">
    <span v-if="!props.expanded" class="flex items-center gap-1 text-lg">
      Вижте повече
      <span class="material-symbols-outlined text-2xl leading-none">expand_more</span>
    </span>
    <span v-else class="flex items-center gap-1 text-lg">
      Вижте по-малко
      <span class="material-symbols-outlined text-2xl leading-none">expand_less</span>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ expanded: boolean }>()
const emit = defineEmits(['toggle'])
</script>
