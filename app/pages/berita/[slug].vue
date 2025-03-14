<script lang="ts" setup>
const route = useRoute()

const { data: beritaPage } = await useAsyncData(`berita-${route.path}`, () => {
  return queryCollection('berita').path(route.path).first()
})

useHead({
  title: beritaPage?.value?.title,
  titleTemplate: '%s %separator %siteName',
  templateParams: {
    separator: '|',
    siteName: 'SDN TEJA II',
  },
})
useSeoMeta({
  title: beritaPage?.value?.title,
  description: beritaPage?.value?.description,
  twitterTitle: beritaPage?.value?.title,
  twitterDescription: beritaPage?.value?.description,
})

defineOgImageComponent('OgImage', {
  page: 'Berita',
  title: beritaPage?.value?.title,
  description: beritaPage?.value?.description,
})
</script>

<template>
  <div>
    <UContainer>
      <div class="max-w-4xl mx-auto ">
        <div class="mb-4">
          <UiBreadcrumb />
        </div>
        <div data-aos="fade-up" class="py-8 space-y-6 ">
          <h1 class="text-3xl  md:text-4xl font-bold">
            {{ beritaPage?.title }}
          </h1>
          <p>{{ beritaPage?.description }}</p>
          <UBadge>
            {{ beritaPage?.date ? new Date(beritaPage.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}
          </UBadge>
        </div>
        <article data-aos-delay="100" data-aos="fade-up" class="max-w-4xl prose-img:w-full mx-auto prose prose-night dark:prose-invert">
          <ContentRenderer v-if="beritaPage" :value="beritaPage" />
        </article>
      </div>
    </UContainer>
  </div>
</template>
