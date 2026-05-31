<template>
  <div class="bg-[#e7f0eb] p-6 rounded-lg shadow-lg min-w-[295px] max-w-[300px]">
    <div class="flex items-center mb-3">
      <span class="material-symbols-outlined text-gray-500 text-xl mr-1 p-1">animated_images</span>
      <h3 class="text-sm font-medium text-gray-500">Изисквания за изображения</h3>
    </div>
    <div class="aspect-w-16 aspect-h-9 mb-4 rounded-md overflow-hidden">
      <img
        alt=""
        class="object-cover w-full h-36 opacity-50"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuALDMKwEDikkTVqpMXtQbmkyvxrdivOhmRMkhcPU27R8vpYX5nk15lMZPsHW6D1Jd5IMUrt3I0kKg2AkgSi9kHIlvCJEb9yXQUA-XRZBIAPhqhiuakyVEvU6CJkpDdljQS_TYnihzxA-5OLovrgOxh3Qd0QXLdYztjvw4DQACxKB6qhaE_DNdz8R9ACgbHMrODjEPOZS-CPsvUsxxgnkCgq59RDzZiqWDr3L98Hnkn59h1WxSReWJf8ZWIS0igO2bdGNy3YdwRQslE"
      />
    </div>
    <p class="text-[14px] text-gray-500 space-y-1">
      Добавете изображенията, които най-добре представят услугата
    </p>
    <p class="text-[14px] text-gray-500 space-y-1 my-2">Най-подходящ размер</p>
    <ul class="list-disc list-inside text-[12px] text-gray-500 space-y-1">
      <li>Препоръчителен размер 1024 x 615</li>
      <li>Минимален размер 800 x 480 px</li>
      <li>Максимален размер на файла 5 MB</li>
    </ul>
    <div class="mt-4 pt-2 border-t border-gray-300">
      <a class="flex items-center text-[#77b393] hover:text-[#417458] text-xs font-medium" href="#">
        <span class="material-icons mr-1">rule</span>
        Указания за изображенията
      </a>
    </div>
  </div>
</template>
