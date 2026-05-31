<template>
  <div>
    <DropdownMenu v-model:open="isOpen">
      <DropdownMenuTrigger
        class="flex justify-center relative text-gray-600 hover:text-[#77b393] cursor-pointer select-none"
      >
        <div class="flex items-center">
          <img
            alt="User avatar"
            class="w-8 h-8 rounded-full"
            :src="auth.user?.userProfileImage || 'fallback-profileImage.png'"
          />
          <ChevronDown
            class="ml-0.5 h-5 w-5 transition-transform duration-200"
            :class="isOpen ? 'rotate-180' : ''"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="rounded-sm text-gray-600 text-base px-2 pb-2">
        <div class="flex items-center p-3">
          <img
            alt="User avatar"
            class="w-7 h-7 rounded-full"
            :src="auth.user?.userProfileImage || 'fallback-profileImage.png'"
          />
          <p class="ml-2 text-[15px]">{{ auth.user?.userName }}</p>
        </div>
        <RouterLink
          v-if="auth.hasBothTypeRoles()"
          :to="{ name: 'provider-profile' }"
          class="block w-full"
        >
          <button
            v-if="auth.hasBothTypeRoles()"
            class="w-full text-[14px] font-normal px-2 py-1 border-[1px] border-gray-400 text-gray-600 rounded-[4px]"
            @click="auth.switchToOtherRole()"
          >
            Превключете към изпълнител
          </button>
        </RouterLink>
        <button
          v-else
          class="text-[#77b393] hover:text-gray-600 font-medium whitespace-nowrap flex justify-center items-center w-full"
          @click="onBecomeProvider"
        >
          Станете изпълнител
        </button>
        <p class="border my-2"></p>
        <DropdownMenuItem class="md:h-auto md:overflow-visible" @select.prevent>
          <RouterLink
            :to="{ name: 'client-profile' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Профил
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Настройки на акаунт
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'coming-soon' }"
            class="text-gray-600 hover:text-black text-base whitespace-nowrap"
          >
            Фактуриране и плащания
          </RouterLink>
        </DropdownMenuItem>
        <p class="border my-2"></p>
        <div class="px-3">
          <div class="inline-flex items-center gap-1 mb-1.5">
            <div
              class="text-gray-500 hover:text-[#77b393] flex items-center font-medium text-[14px]"
            >
              <span class="text-gray-500 mr-1 text-base">Български</span>
              <span class="material-icons text-gray-400 mr-1 text-[18px]">language</span>
            </div>
          </div>
          <div class="text-gray-500 text-sm whitespace-nowrap font-medium">€ EUR</div>
        </div>
        <p class="border my-2"></p>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ProviderRoleModal
      v-if="showRoleModal"
      @close="showRoleModal = false"
      @submit="onRoleSelected"
    />
  </div>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import LogoutButton from '@/components/auth/LogoutButton.vue'
import { addProviderRoleToClient } from '@/api/data'
import { useRouter } from 'vue-router'
import type { Role } from '@/types/Types'
import ProviderRoleModal from '@/components/profiles/ProviderRoleModal.vue'
const auth = useAuthStore()
const isOpen = ref(false)
const role = ref<Role>()
const router = useRouter()

const showRoleModal = ref(false)

async function onBecomeProvider() {
  if (!auth.user) return
  showRoleModal.value = true
  isOpen.value = false
}
async function onRoleSelected(selectedRole: Role) {
  role.value = selectedRole
  console.log('selected ROLE:', role)
  showRoleModal.value = false

  if (!auth.user || !role.value) return

  try {
    await addProviderRoleToClient(role.value)
    auth.hydrate()
    auth.setActiveRole(role.value)
    router.push('provider-profile')
  } catch (err) {
    console.error(err)
  } finally {
  }
}
</script>
