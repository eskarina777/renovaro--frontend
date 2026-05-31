<template>
  <div class="px-4 pt-4 pb-[17px] border-b border-gray-200 mb-2">
    <div class="flex items-center justify-between gap-1">
      <button disabled class="flex items-center text-gray-700 text-[14px] font-medium">
        Всички
        <span class="material-icons text-gray-500 text-base ml-1">expand_more</span>
      </button>
      <div class="relative ml-3 flex-grow">
        <input
          disabled
          class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-граъ-500 focus:border-transparent text-xs"
          placeholder="Потърсете съобщение"
          type="text"
        />
        <span
          class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
        >
          search</span
        >
      </div>
    </div>
  </div>
</template>
