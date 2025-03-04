<script lang="ts" setup>
const route = useRoute()

const { data: beritaPage } = await useAsyncData(`berita-${route.path}`, () => {
  return queryCollection('guru').path(route.path).first()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-8">
        <h1 data-aos="fade-up" class="text-5xl text-center md:text-6xl font-bold">
          {{ beritaPage?.title }}
        </h1>
      </div>
      <div class="prose dark:prose-dark">
        <ContentRenderer v-if="beritaPage" :value="beritaPage" />
      </div>
    </UContainer>
  </div>
</template>
