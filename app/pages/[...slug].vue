<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`halaman-${route.path}`, () => {
  return queryCollection('content').path(route.path).first()
})
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  // twitterTitle: page.value.title,
  // twitterDescription: page.value.description,
})
defineOgImageComponent('OgImage', {
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
