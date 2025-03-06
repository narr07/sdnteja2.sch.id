<script setup lang="ts">
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
  <UApp>
    <NuxtRouteAnnouncer />

    <UiNav />
    <div class="py-22  md:py-26">
      <NuxtPage />
    </div>
  </UApp>
</template>
