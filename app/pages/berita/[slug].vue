<script lang="ts" setup>
const route = useRoute()

const { data: beritaPage } = await useAsyncData(`berita-${route.path}`, () => {
  return queryCollection('berita').path(route.path).first()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="max-w-3xl mx-auto ">
        <div data-aos="fade-up" class="py-8 space-y-6 ">
          <h1 class="text-3xl  md:text-4xl font-bold">
            {{ beritaPage?.title }}
          </h1>
          <UBadge>
            {{ beritaPage?.date ? new Date(beritaPage.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}
          </UBadge>
        </div>
        <div data-aos-delay="100" data-aos="fade-up" class="prose dark:prose-dark">
          <ContentRenderer v-if="beritaPage" :value="beritaPage" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
