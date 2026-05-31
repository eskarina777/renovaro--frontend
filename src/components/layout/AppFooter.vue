<template>
  <FooterLinks v-if="route.meta.hideFooterLinks !== true" />
  <FooterBar v-if="route.meta.hideFooter !== true" />
</template>

<script setup lang="ts">
import FooterBar from './footer/FooterBar.vue'
import FooterLinks from './footer/FooterLinks.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
