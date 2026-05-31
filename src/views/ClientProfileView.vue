<template>
  <div>
    <div
      class="bg-white px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto mb-12 mt-10"
    >
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <div class="w-[335px]">
          <div class="bg-white pb-5 p-6 rounded-[6px] soft-shadow">
            <div class="flex flex-col items-center mb-3">
              <img
                alt="User avatar"
                class="w-24 h-24 rounded-full"
                :src="auth.user?.userProfileImage"
              />
              <h1 class="mt-4 mb-3 text-[19px] font-medium text-gray-600">
                {{ auth.user?.userName }}
              </h1>
            </div>
          </div>
        </div>
        <div class="w-full max-w-[950px]">
          <h2 class="text-[19px] font-medium text-gray-600 mb-4">Моят профил</h2>
          <div
            v-if="auth.hasBothTypeRoles()"
            class="bg-[#e7f0eb] text-gray-500 px-4 py-3 rounded-[6px] mb-6 flex items-start soft-shadow"
            role="alert"
          >
            <span class="material-icons mr-3">info_outline</span>
            <p class="text-sm">
              В момента сте в профила си на клиент. Ако желаете да превключите към профилa си на
              изпълнител, можете да го направите
              <span
                class="font-semibold underline hover:text-gray-800"
                @click="auth.switchToOtherRole()"
              >
                <RouterLink :to="{ name: 'provider-profile' }"> оттук </RouterLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
</script>
>
