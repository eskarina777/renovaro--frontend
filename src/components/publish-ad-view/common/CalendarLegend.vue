<template>
  <div class="grid grid-cols-2 gap-3 mt-4">
    <div
      class="bg-[#abcbbe] border border-gray-400 border-opacity-50 w-full lg:max-w-[155px] min-h-[85px] pt-1 p-2 rounded-[4px] flex flex-col justify-start items-start relative"
    >
      <div class="w-full flex justify-end">
        <span class="material-symbols-outlined text-sm h-[20px] text-gray-500"> today </span>
      </div>
      <p class="text-[11px] leading-[1.2] font-normal text-gray-700 pb-1">
        Избран час за консултация/оглед в текущата обява
      </p>
    </div>
    <div
      class="bg-gray-300 border border-gray-400 border-opacity-50 w-full lg:max-w-[155px] min-h-[85px] pt-1 p-2 rounded-[4px] flex flex-col justify-start items-start relative"
    >
      <div class="w-full flex justify-end">
        <span class="material-symbols-outlined text-sm h-[20px] text-gray-500">
          moved_location
        </span>
      </div>
      <p class="text-[11px] leading-[1.2] font-normal text-gray-700 pb-1">
        Време за транспорт до следващ ангажимент за текущата обява
      </p>
    </div>
    <div
      class="bg-[#dcebe3] border border-gray-400 border-opacity-50 w-full lg:max-w-[155px] min-h-[85px] pt-1 p-2 rounded-[4px] flex flex-col justify-start items-start relative"
    >
      <div class="w-full flex justify-end">
        <span class="material-symbols-outlined text-sm h-[20px] text-gray-500">
          event_available
        </span>
      </div>
      <p class="text-[11px] leading-[1.2] font-normal text-gray-700 pb-1">
        Наличен за добавяне час, увастващ и в друга обява/и
      </p>
    </div>

    <div
      class="bg-gray-200 border border-gray-400 border-opacity-50 w-full lg:max-w-[155px] min-h-[85px] pt-1 px-2 rounded-[4px] flex flex-col justify-start items-start relative"
    >
      <div class="w-full flex justify-end">
        <span class="material-symbols-outlined text-sm h-[20px] text-gray-400"> schedule </span>
      </div>
      <p class="text-[11px] leading-[1.2] font-medium text-gray-500 pb-1">
        Време за транспорт до следващ ангажимент от друга обява
      </p>
    </div>

    <div
      class="bg-white border-[2px] border-[#77b393] w-full lg:max-w-[155px] min-h-[85px] pt-1 p-2 rounded-[4px] flex flex-col justify-start items-start relative"
    >
      <div class="w-full flex justify-end">
        <span class="material-symbols-outlined text-sm h-[20px] text-[#77b393]">
          event_available
        </span>
      </div>
      <p class="text-[11px] leading-[1.2] font-medium text-[#77b393] pb-1">
        Свободни часове - налични за избор в текушата обява
      </p>
    </div>
    <div
      class="bg-gray-100 bg-opacity-70 border border-gray-400 border-opacity-50 w-full lg:max-w-[155px] min-h-[85px] pt-1 p-2 rounded-[4px] flex flex-col justify-start items-start relative"
    >
      <div class="w-full flex justify-end">
        <span class="material-symbols-outlined text-sm h-[20px] text-gray-500"> event_busy </span>
      </div>
      <p class="text-[11px] leading-[1.2] font-normal text-gray-700 pb-1">
        Заети часове - неналични за избор в текущата обява
      </p>
    </div>
  </div>
</template>
