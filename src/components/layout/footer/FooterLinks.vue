<template>
  <div
    class="bg-white px-[35px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto border-gray-200"
  >
    <div class="text-gray-800 border-t border-gray-200">
      <div class="pt-9 pb-6">
        <div
          class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-2"
        >
          <div><SectionCategories /></div>
          <div><SectionClients /></div>
          <div><SectionProviders /></div>
          <div><SectionResources /></div>
          <div><SectionAbout /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionAbout from '../footer/footer-sections/SectionAbout.vue'
import SectionCategories from '../footer/footer-sections/SectionCategories.vue'
import SectionClients from '../footer/footer-sections/SectionClients.vue'
import SectionResources from '../footer/footer-sections/SectionResources.vue'
import SectionProviders from '../footer/footer-sections/SectionProviders.vue'
</script>
