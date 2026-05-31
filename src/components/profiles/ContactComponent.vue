<template>
  <div class="space-y-3">
    <p class="text-sm font-normal mb-1 text-[#77b393]">
      Имате възможност да промените телефонния си номер, ако нямате активна резервация към този
      момент
    </p>
    <div class="flex justify-between items-center px-3 py-2 border border-gray-200 rounded-sm">
      <div class="flex items-center">
        <span class="material-icons-outlined text-[#5ea480] text-[18px] mb-3 mr-3"
          >phone_iphone</span
        >
        <div>
          <p class="text-sm font-medium text-gray-500">Телефон</p>
          <p class="text-sm font-medium text-gray-500">{{ props.phone }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button class="text-[#5ea480] hover:text-gray-800">
          <span class="material-symbols-outlined text-[18px]">edit</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ phone: string | null }>()
</script>
