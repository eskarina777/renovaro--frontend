<template>
  <ClientHeader v-if="auth.activeRole === 'CLIENT'" />
  <ProviderHeader v-else-if="auth.activeRole === 'SPECIALIST' || auth.activeRole === 'COMPANY'" />
  <GuestHeader v-else />
  <RegistrationModal v-if="showRegistrationModal" @close="showRegistrationModal = false" />
  <RoleModal v-if="showRoleModal" @close="showRoleModal = false" />
  <LoginModal v-if="auth.showLoginModal" @close="auth.closeLoginModal" />
</template>

<script setup lang="ts">
import RegistrationModal from '@/components/auth/RegistrationModal.vue'
import LoginModal from '@/components/auth/LoginModal.vue'
import { ref, provide } from 'vue'
import GuestHeader from './header/GuestHeader.vue'
import ClientHeader from './header/ClientHeader.vue'
import ProviderHeader from './header/ProviderHeader.vue'
import { useAuthStore } from '@/stores/authStore'
import RoleModal from '../auth/shared/RoleModal.vue'

const auth = useAuthStore()
const showRegistrationModal = ref(false)
const showRoleModal = ref(false)

const openRegistrationModal = () => {
  showRegistrationModal.value = true
}

const openRoleModal = () => {
  showRegistrationModal.value = false
  showRoleModal.value = true
}
function openLoginModal() {
  auth.openLoginModal()
}
provide('openLoginModal', openLoginModal)

provide('openRegistrationModal', openRegistrationModal)
provide('openRoleModal', openRoleModal)
</script>
