<template>
  <div class="bg-gray-50 h-full">
    <div
      class="py-8 px-[25px] md:px-[105px] 2xl:px-0 2xl:max-w-[1326px] 2xl:mx-auto flex justify-center"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="w-full 2xl:max-w-1/2 bg-white p-6 sm:p-8 rounded-sm border">
          <h2 class="text-lg font-medium text-gray-800 mb-3">Информация за компанията</h2>
          <p class="text-[15px] leading-[1.3] text-gray-600 mb-4">
            Попълнете следната информация за компанията. Тя ще бъде публикувана във Вашия публичен
            профил, за да могат потенциални клиенти да Ви опознаят по-добре.
          </p>
          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-900 mb-1.5" for="fullName"
              >Лице за контакт*</label
            >
            <p class="text-[15px] text-gray-600 mb-3">
              Тези данни няма да са публично достъпни и ще бъдат използвани единствено за
              верификация и контакт с платформата.
            </p>
            <div class="flex flex-col md:flex-row gap-3">
              <input
                class="text-[15px] block relative flex-1 md:w-1/2 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id="firstName"
                name="firstName"
                placeholder="Име"
                type="text"
              />

              <input
                class="text-[15px] block relative flex-1 md:w-1/2 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id="lastName"
                name="lastName"
                placeholder="Фамилия"
                type="text"
              />
            </div>
          </div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="fullName"
            >Допълнителна информация</label
          >

          <div class="border border-gray-300 p-2 mt-3">
            <div class="flex flex-col md:flex-row justify-between gap-2 mb-1">
              <input
                class="text-[15px] block relative flex-1 md:w-full px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id="city"
                name="city"
                placeholder="Име на компанията*"
                type="text"
              />
              <div class="relative flex-1">
                <input
                  class="text-[15px] block relative flex-1 md:w-full px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                  id="year"
                  name="year"
                  placeholder=" Основана през"
                  type="text"
                />
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
              <input
                class="text-[15px] mt-1 block w-full px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id=""
                name=""
                placeholder="Дейност (напр. Строителна фирма)"
                type="text"
              />
              <input
                class="text-[15px] md:max-w-[120px] mt-1 px-3 py-1 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                id=""
                name=""
                placeholder="Брой служ."
                type="text"
              />
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2 mt-6"
              >Профилна снимка / Лого*</label
            >
            <p class="text-[15px] text-gray-600 mb-6">
              Добавите лого или изображение, с което клиентите да разпознават Вашата компания.
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
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2" for="description"
              >Повече за компанията*</label
            >
            <textarea
              class="mt-1 block w-full px-3 leading-snug text-[14px] py-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              id="description"
              name="description"
              placeholder="Опишете дейността на компанията, ключови проекти и специфични области, в които имате опит или предимство."
              rows="4"
            ></textarea>
          </div>
        </div>
        <div class="w-full 2xl:max-w-1/2 bg-white p-6 sm:p-8 rounded-sm border">
          <div class="flex flex-col justify-between h-full">
            <div>
              <h2 class="text-lg font-medium text-gray-800 mb-3">Сигурност на профила</h2>
              <p class="text-[15px] leading-[1.3] text-gray-600 mb-8">
                Сигурността на профила Ви е важна за нас. Моля, потвърдете имейл и телефон, за да
                защитим достъпа до Вашият акаунт.
              </p>
              <div class="">
                <div
                  class="flex flex-col sm:flex-row justify-between gap-y-3 pb-4 border-b border-gray-200"
                >
                  <div class="flex items-center">
                    <span class="material-icons-outlined text-gray-500 mr-3">email</span>
                    <div>
                      <span class="text-sm font-medium text-gray-900">Е-mail</span>
                      <span class="text-sm text-gray-500 font-normal italic ml-1">Поверителен</span>
                    </div>
                  </div>
                  <button
                    class="px-4 py-2 text-sm text-[#3b6751] bg-[#e7f0eb] border border-gray-300 rounded-sm hover:bg-[#c3dacd] focus:outline-none hover:text-[#e7f0eb]"
                  >
                    Непотвърден
                  </button>
                </div>
                <div class="mb-4">
                  <div class="flex items-center justify-between pb-1 pt-4">
                    <div class="flex items-center">
                      <span class="material-icons text-gray-500 mr-3">call</span>
                      <div>
                        <div>
                          <span class="text-base font-medium text-gray-900">Телефонен номер</span>
                          <span class="text-base text-gray-500 font-normal italic ml-1"
                            >Поверителен</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <p class="text-[15px] leading-[1.3] text-gray-600 mb-4">
                    Телефонът Ви ще бъде споделян само с клиентите на които сте потвърдили
                    резервация.
                  </p>
                  <div class="flex w-full gap-3 border border-gray-300 p-1.5">
                    <input
                      class="text-[14px] w-full block px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                      id="city"
                      name="city"
                      placeholder="Телефонен номер"
                      type="text"
                    />
                  </div>
                </div>
                <div class="mt-4 border-t border-gray-200">
                  <div class="mt-6">
                    <input
                      class="absolute accent-[#3b6751] cursor-pointer mt-1 h-5 w-5 text-gray-500 border-gray-400 opacity-50 border-2 rounded-sm focus:ring-white"
                      type="checkbox"
                    />
                    <p class="text-md text-gray-800 font-medium pl-8">
                      Изберете, ако желаете телефонът Ви да бъде публикуван в към обява в сайта, за
                      възможност за директна връзка на клиенти.
                    </p>
                  </div>
                  <div class="mt-5 border-t border-gray-200"></div>
                  <div class="mt-5">
                    <label
                      class="block text-base font-medium !text-gray-900 mb-2"
                      for="personalSite"
                      >Уебсайт</label
                    >
                    <p class="text-[15px] text-gray-600 mb-2">
                      По желание можете да включете линк към уебсайта на компанията.
                    </p>
                    <input
                      class="mb-6 w-full text-[15px] block px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                      id="website"
                      name="website"
                      placeholder="Уебсайт на компанията"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-12 flex justify-end">
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
    </div>
  </div>
</template>
