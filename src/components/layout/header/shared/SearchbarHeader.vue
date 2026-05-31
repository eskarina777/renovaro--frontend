<template>
  <div class="relative w-full max-w-xl">
    <input
      v-model="localSearch"
      class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-transparent focus:ring-gray-400 text-sm"
      placeholder="Потърсете услуга..."
      type="text"
    />

    <button @click="onSearch">
      <span
        class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
      >
        search</span
      >
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const localSearch = ref('')

const emit = defineEmits(['submit-search-input'])
const onSearch = () => {
  emit('submit-search-input', localSearch.value)
  localSearch.value = ''
}
</script>
