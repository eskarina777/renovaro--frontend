<template>
  <button
    class="text-base font-normal px-10 py-2 border-[1px] border-gray-600 bg-gray-700 opacity-80 text-white rounded-[6px] hover:bg-transparent hover:opacity-100 hover:text-gray-600 transition duration-300"
    @click="postFreelanceBookingRequest(props.providerId)"
  >
    Резервирайте
  </button>
</template>

<script setup lang="ts">
function postFreelanceBookingRequest(providerId: number) {
  const sent = providerId
  return sent
}
const props = defineProps<{
  providerId: number
}>()
</script>
