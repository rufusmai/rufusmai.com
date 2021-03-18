<template>
  <div class="hidden md:block fixed z-40 uppercase inset-y-0 right-0 text-gray-500 dark:text-gray-300 pointer-events-none">
    <div class="flex pt-10 w-screenh justify-between p-3 transform origin-bottom-right pointer-events-auto -rotate-90 -translate-y-full translate-x-10 hover:translate-x-0 transition-transform ease-in-out duration-300">
      <p>
        {{ $t('avatarFrom') }} <a href="https://bitmoji.com" target="_blank" rel="noopener" class="text-black dark:text-white underline">Bitmoji</a>
      </p>
      <p>
        {{ $t('iconsFrom') }} <a href="https://heroicons.com" target="_blank" rel="noopener" class="text-black dark:text-white underline">heroicons.com</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoverCredits'
}
</script>
