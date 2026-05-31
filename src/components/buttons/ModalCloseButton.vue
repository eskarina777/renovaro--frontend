<template>
  <button @click="emit('close')" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
    <span class="material-icons text-[20px]">close</span>
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits(['close'])
</script>
