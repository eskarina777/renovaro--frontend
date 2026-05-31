<template>
  <div class="bg-gray-50 h-full">
    <div
      class="py-8 px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto flex justify-center"
    >
      <div class="w-full lg:max-w-[800px] bg-white p-6 sm:p-8 rounded-sm border justify-center">
        <div class="flex flex-col sm:flex-row sm:justify-between mb-4">
          <h2 class="text-lg font-medium text-gray-800 mb-3">Лична информация</h2>
          <p class="text-sm text-gray-500 flex sm:justify-start">* Задължителни полета</p>
        </div>
        <p class="text-[15px] leading-[1.3] text-gray-600 mb-4">
          Попълнете своите лични данни. Тази информация няма да бъде достъпна за никой, освен за
          изпълнителя с когото желаете да се свържете чрез платформата.
        </p>
        <div class="mb-8">
          <label class="block text-base font-medium text-gray-900 mb-1.5" for="fullName"
            >Пълно име*</label
          >
          <p class="text-[15px] leading-[1.3] text-gray-600 mb-3">
            В комуникацията с изълнители ще бъдете представени с реалните си имена, за да имате
            възможност да изградите надеждни и автентични връзки.
          </p>
          <div class="flex flex-col md:flex-row gap-3">
            <input
              class="text-[14px] block relative flex-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              id="firstName"
              name="firstName"
              placeholder="Име"
              type="text"
            />

            <input
              class="text-[14px] block relative flex-1 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              id="lastName"
              name="lastName"
              placeholder="Фамилия*"
              type="text"
            />
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-base font-medium text-gray-900 mb-1.5">Профилна снимка</label>
          <p class="text-[15px] leading-[1.3] text-gray-600 mb-6">
            При желание добавете своя снимка, за да могат изпълнителите да виждат точно с кого ще
            работят. Това насърчава взаимното доверие и създава по-голямо чувство за сигурност.
          </p>
          <div class="mt-2 flex items-center">
            <span
              class="relative group h-32 w-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
            >
              <span class="text-4xl font-medium text-gray-500 group-hover:opacity-0">E</span>

              <div
                class="absolute inset-0 bg-gray-400 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span class="material-icons text-gray-200 text-4xl">photo_camera</span>
              </div>
            </span>
          </div>
        </div>
        <div class="mt-12 flex justify-end">
          <button
            class="py-2 px-4 bg-[#3b6751] opacity-50 text-base hover:bg-white border border-[#3b6751] hover:text-[#3b6751] text-white font-normal rounded-sm focus:outline-none shadow-md mr-1"
            type="submit"
          >
            Запазете
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
