<template>
  <div>
    <ClientRegistration v-if="role === 'CLIENT'" />
    <SpecialistRegistration v-if="role === 'SPECIALIST'" />
    <CompanyRegistration v-if="role === 'COMPANY'" />
  </div>
</template>
<script setup lang="ts">
import ClientRegistration from '@/components/registration/ClientRegistration.vue'
import CompanyRegistration from '@/components/registration/CompanyRegistration.vue'
import SpecialistRegistration from '@/components/registration/SpecialistRegistration.vue'
import { computed } from 'vue'
import { useRegistrationStore } from '@/stores/registrationStore'

const registration = useRegistrationStore()
const role = computed(() => registration.role)
</script>
