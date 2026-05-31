<template>
  <div class="relative group">
    <RouterLink :to="{ name: 'coming-soon' }">
      <button class="text-gray-500 hover:text-[#77b393]">
        <span
          class="mdi mdi-wallet-bifold-outline text-gray-500 hover:text-[#77b393] text-2xl"
        ></span>
      </button>
    </RouterLink>
    <div
      class="text-[14px] hidden lg:inline absolute left-0 -bottom-8 whitespace-nowrap rounded-md bg-gray-100 text-gray-500 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
    >
      Очаквайте скоро!
    </div>
  </div>
</template>
