<template>
  <p class="text-[13px] font-medium text-[#5ea480] mb-2">
    Можете да изберете един от запазените си адреси или да добавите друг
  </p>
  <div
    class="flex flex-wrap items-start gap-x-4 gap-y-4 px-3 py-1.5 border border-gray-200 rounded-sm bg-white"
  >
    <div class="flex flex-col items-start min-w-[210px]">
      <div class="flex items-center">
        <input
          class="mr-1 accent-[#3b6751] cursor-pointer h-[14px] w-[14px] text-[#3b6751] opacity-50 border-2 border-gray-400 rounded-sm focus:ring-white"
          type="checkbox"
        />
        <div class="flex items-center">
          <span class="material-symbols-outlined text-[#5ea480] mr-1 text-base">location_on</span>
          <span class="text-xs font-medium text-gray-600 whitespace-nowrap"
            >Варна, Цветен квартал</span
          >
        </div>
      </div>
      <p class="text-xs text-gray-700 ml-10">ул."Роза" 5</p>
    </div>
    <div class="flex flex-col items-start min-w-[210px]">
      <div class="flex items-center">
        <input
          class="mr-1 accent-[#3b6751] cursor-pointer h-[14px] w-[14px] text-[#3b6751] opacity-50 border-2 border-gray-400 rounded-sm focus:ring-white"
          type="checkbox"
        />
        <div class="flex items-center">
          <span class="material-symbols-outlined text-[#5ea480] mr-1 text-base">location_on</span>
          <span class="text-xs font-medium text-gray-600 whitespace-nowrap">Варна, Център</span>
        </div>
      </div>
      <p class="text-xs text-gray-700 ml-10">ул."Княз Борис" 1</p>
    </div>
  </div>

  <p class="text-[13px] font-medium text-[#5ea480] mb-2 mt-2">
    Изберете запазения си телефонен номер или го променете в личният си профил в случай че нямате
    активна резервация, която го използва
  </p>
  <div
    class="flex flex-wrap items-start gap-x-4 gap-y-4 px-3 py-1.5 border border-gray-200 rounded-sm bg-white"
  >
    <div class="flex flex-col items-start min-w-[210px]">
      <div class="flex items-center">
        <span class="material-icons-outlined text-[#5ea480] mr-1 text-base">phone_iphone</span>
        <span class="text-xs font-medium text-gray-500 whitespace-nowrap">0888 222 222</span>
      </div>
    </div>
  </div>

  <p class="text-[13px] font-medium text-[#5ea480] mb-2 mt-2">
    Добавете телефонен номер за връзка и адрес за извършване на услугата
  </p>

  <div class="gap-y-2 p-2 border border-gray-200 rounded-sm bg-white opacity-60">
    <input
      class="mb-2 text-[13px] w-full block px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
      id="city"
      name="city"
      placeholder="Телефонен номер"
      type="text"
    />

    <div class="flex flex-col md:flex-row gap-2 mb-2 border-gray-200">
      <div class="relative md:w-1/2 flex-1">
        <select
          class="text-[13px] px-3 py-1 shadow-sm border text-gray-400 focus:ring-gray-400 focus:border-transparent block w-full border-gray-300 rounded-sm appearance-none"
          id="occupationFrom"
          name="occupationFrom"
        >
          <option class="text-gray-400" value="" disabled selected hidden>Град</option>
          <option class="text-gray-400">София</option>
          <option class="text-gray-400">Пловдив</option>
          <option class="text-gray-400">Варна</option>
        </select>
      </div>

      <div class="relative flex-1">
        <div class="flex justify-between gap-2">
          <input
            class="text-[13px] text-gray-600 block md:full flex-1 pl-3 py-1 border border-gray-300 focus:outline-none focus:ring-gray-400 focus:border-gray-400 rounded-sm appearance-none"
            id="city"
            name="city"
            placeholder="Квартал"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="relative md:w-1/2 flex-1">
        <input
          class="relative text-[13px] block w-full px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
          id="univerisityName"
          name="univerisityName"
          placeholder="Име на улица"
          type="text"
        />
      </div>

      <div class="relative flex-1">
        <div class="flex justify-between gap-2">
          <input
            class="text-[13px] text-gray-600 block md:full flex-1 pl-3 py-0 border border-gray-300 focus:outline-none focus:ring-gray-400 focus:border-gray-400 rounded-sm appearance-none"
            id="major"
            name="major"
            placeholder="Номер на ул."
            type="text"
          />
          <button
            class="text-[13px] px-3 py-1 border border-gray-300 rounded-sm text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-gray-400"
            type="button"
          >
            Добавете
          </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <p class="mt-2 text-[13px] font-medium text-[#5ea480] mb-2">Консултация/оглед</p>

    <div
      class="flex flex-wrap items-start gap-x-6 gap-y-2 sm:gap-y-4 p-1.5 border border-gray-200 rounded-sm bg-white"
    >
      <div class="flex flex-col items-start min-w-[160px]">
        <div class="flex items-center">
          <span class="mdi mdi-account-hard-hat-outline text-[#5ea480] mr-2 text-[20px]"></span>
          <span class="text-xs font-medium text-gray-700">Иван Иванов</span>
        </div>
        <div class="flex items-center">
          <span class="material-icons-outlined text-[#5ea480] mr-1 text-base">phone_iphone</span>
          <span class="text-xs font-medium text-gray-600 whitespace-nowrap">0888 222 333</span>
        </div>
      </div>
      <div class="flex flex-col items-start min-w-[210px]">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-[#5ea480] mr-1 text-base">location_on</span>
          <span class="text-xs font-medium text-gray-600 whitespace-nowrap"
            >Варна, Цветен квартал</span
          >
        </div>
        <p class="text-xs text-gray-700 ml-6">ул."Роза" 25</p>
        <div class="flex items-center">
          <span class="material-icons-outlined text-[#5ea480] mr-1 text-base">phone_iphone</span>
          <span class="text-xs font-medium text-gray-600 whitespace-nowrap">0888 222 222</span>
        </div>
      </div>

      <div class="flex flex-col items-start min-w-[120px]">
        <div class="flex items-center">
          <span class="material-icons text-[#5ea480] mr-2 text-base">calendar_today</span>
          <span class="text-xs font-medium text-gray-700">12.12.25</span>
        </div>
        <p class="text-xs text-gray-600 ml-6">10:00</p>
      </div>

      <div class="flex flex-col items-start min-w-[120px]">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-[#5ea480] mr-2 text-base">sell</span>
          <span class="text-xs font-medium text-gray-700">Цена</span>
        </div>
        <p class="text-xs text-gray-600 ml-6">20 €</p>
      </div>
    </div>
  </div>
</template>
