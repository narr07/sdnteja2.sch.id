<script lang="ts" setup>
const route = useRoute()

const { data: artikelPage } = await useAsyncData(`artikel-${route.path}`, () => {
  return queryCollection('artikel').path(route.path).first()
})

useHead({
  title: artikelPage?.value?.title,
  titleTemplate: '%s %separator %siteName',
  templateParams: {
    separator: '|',
    siteName: 'SDN TEJA II',
  },
})
useSeoMeta({
  title: artikelPage?.value?.title,
  description: artikelPage?.value?.description,
  twitterTitle: artikelPage?.value?.title,
  twitterDescription: artikelPage?.value?.description,
})

defineOgImageComponent('OgImage', {
  page: 'Artikel',
  title: artikelPage?.value?.title,
  description: artikelPage?.value?.description,
})

useSchemaOrg([
  defineArticle({
    headline: artikelPage?.value?.title,
    description: artikelPage?.value?.description,
    // attaching an author when the identity is an organization
    author: {
      name: artikelPage?.value?.author,
    },
  }),
])
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
            {{ artikelPage?.title }}
          </h1>
          <p>{{ artikelPage?.description }}</p>
          <UBadge>
            {{ artikelPage?.date ? new Date(artikelPage.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}
          </UBadge>
        </div>
        <article data-aos-delay="100" data-aos="fade-up" class="max-w-4xl prose-img:w-full mx-auto prose prose-night dark:prose-invert">
          <ContentRenderer v-if="artikelPage" :value="artikelPage" />
        </article>
      </div>
    </UContainer>
  </div>
</template>
