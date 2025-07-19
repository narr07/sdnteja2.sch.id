<script setup lang="ts">
import { id } from '@nuxt/ui/locale'

useHead({
  meta: [
    { name: 'theme-color', content: '#F22727', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#F22727', media: '(prefers-color-scheme: light)' },
    { name: 'msapplication-TileColor', content: '#F22727' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  ],
})
</script>

<template>
  <div>
    <UApp :locale="id">
      <NuxtRouteAnnouncer />
      <UiNav />

      <ClientOnly>
        <UiChat />
      </ClientOnly>

      <div class="py-22  md:py-26">
        <NuxtPage />
      </div>
      <UiFooter />
    </UApp>

    <div class="utility">
      <ClientOnly>
        <GoogleTranslate />
      </ClientOnly>
    </div>
  </div>
</template>

<!-- <style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style> -->
