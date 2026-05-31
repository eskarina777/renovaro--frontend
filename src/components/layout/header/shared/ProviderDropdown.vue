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
          :to="{ name: 'client-profile' }"
          class="block w-full"
        >
          <button
            v-if="auth.hasBothTypeRoles()"
            class="w-full text-[14px] font-normal px-2 py-1 border-[1px] border-gray-400 text-gray-600 rounded-[4px]"
            @click="auth.switchToOtherRole()"
          >
            Превключете към клиент
          </button>
        </RouterLink>
        <button
          v-else
          class="text-[#77b393] hover:text-gray-600 font-medium whitespace-nowrap flex justify-center items-center w-full"
          @click="onBecomeClient"
        >
          Станете клиент
        </button>
        <p class="border my-2"></p>
        <DropdownMenuItem class="md:h-auto md:overflow-visible">
          <RouterLink
            :to="{ name: 'provider-profile' }"
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
import { addClientRoleToProvider } from '@/api/data'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useAuthStore()
const isOpen = ref(false)

async function onBecomeClient() {
  if (!auth.user) return
  try {
    await addClientRoleToProvider()
    auth.hydrate()
    router.push('client-profile')
  } catch (err) {
    console.error(err)
  } finally {
  }
}
</script>
