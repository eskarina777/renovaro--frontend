<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-[388px] max-h-[620px] overflow-y-auto px-7 pb-8 pt-5 w-full relative"
      >
        <ModalCloseButton @click="emit('close')" />

        <div class="text-center mb-3 sm:mb-4">
          <h2 class="text-sm font-medium text-gray-500 mt-4">
            Ще персонализираме преживяването Ви според Вашите нужди
          </h2>
        </div>
        <div class="flex justify-center flex-col sm:flex-row gap-4 py-2 mb-8">
          <RoleCard v-for="r in roles" :key="r.role" v-model="selectedRole" :data="r" />
        </div>
        <div class="flex justify-end relative">
          <button
            class="shadow-md py-2 px-4 bg-[#3b6751] opacity-50 text-sm hover:bg-white border border-[#3b6751] hover:text-[#3b6751] text-white font-normal rounded-sm focus:outline-none"
            type="submit"
            @click="onSubmit"
          >
            Продължете
          </button>
          <p
            v-if="error"
            class="absolute -top-8 right-0 px-6 py-4 text-[#ec9393] text-sm bg-red-50 border border-red-200 rounded shadow-md"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import ModalCloseButton from '@/components/buttons/ModalCloseButton.vue'
import RoleCard from '@/components/cards/RoleCard.vue'
import type { RoleCardType, Role } from '@/types/Types'
import { ref } from 'vue'
import { watch } from 'vue'
const error = ref('')
const selectedRole = ref<Role | null>(null)
watch(selectedRole, (val) => {
  if (val) {
    error.value = ''
  }
})

const roles: RoleCardType[] = [
  { role: 'SPECIALIST', label: 'Специалист', icon: 'engineering' },
  { role: 'COMPANY', label: 'Фирма', icon: 'groups' },
]
async function onSubmit() {
  if (!selectedRole.value) {
    error.value = 'Моля, изберете роля.'
    return
  }
  emit('submit', selectedRole.value)
}
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', role: Role): void
}>()
</script>
