<script lang="ts" setup>
const route = useRoute()

const { data: kegiatanPage } = await useAsyncData(`kegiatan-${route.path}`, () => {
  return queryCollection('kegiatan').path(route.path).first()
})

defineOgImageComponent('OgImage', {
  title: kegiatanPage?.value?.title,
  description: kegiatanPage?.value?.description,
})

async function fetchCldImages(tag: string) {
  const { data } = await useFetch(`/api/getImagesByTag?tag=${tag}`)
  // Handle the response data here
  return data.value
}

const cldImages = await fetchCldImages(`${kegiatanPage?.value?.tag}`)
const img = useImage()
</script>

<template>
  <div>
    <UContainer>
      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div v-for="image in cldImages" :key="image.asset_id" class="transition-transform duration-200 ease-in-out transform hover:scale-98">
          <NuxtImg
            :src="image.secure_url"
            :alt="image.public_id"
            loading="lazy"
            width="500"
            height="300"
            class="rounded-3xl mb-4 aspect-video object-cover object-top h-[250px] w-[600px] transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Main Profile Card -->
        <UCard
          data-aos="fade-up"
          variant="soft"
          class="rounded-3xl bg-night-50 shadow-teja dark:bg-night-900 md:col-span-1 row-span-2"
        >
          <div class="flex flex-col items-center justify-center p-4">
            <NuxtImg
              :src="kegiatanPage?.cover"
              :alt="kegiatanPage?.title"
              :title="kegiatanPage?.title"
              loading="lazy"
              height="400"
              width="300"
              :placeholder="img(`${kegiatanPage?.title}`, { h: 10, f: 'png', blur: 2, q: 50 })"
              class="rounded-lg mb-4 h-full w-auto shadow-md bg-cover bg-center object-cover "
            />
            <h2 class="text-lg md:text-xl font-bold mt-2">
              {{ kegiatanPage?.title }}
            </h2>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
