// KegiatanPage.vue

<script setup lang="ts">
const { data: kegiatanSekolah } = await useAsyncData('galeris', () => {
  return queryCollection('kegiatan').all()
})

async function fetchImages(tag: string) {
  const { data } = await useFetch(`/api/getImagesByTag?tag=${tag}`)
  // Handle the response data here
  return data.value
}

const images = await fetchImages('fasilitas')
const img = useImage()
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div v-for="image in images" :key="image.asset_id" class="transition-transform duration-200 ease-in-out transform hover:scale-98">
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

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div v-for="galeri in kegiatanSekolah" :key="galeri.title" class="transition-transform duration-200 ease-in-out transform hover:scale-98 ">
          <NuxtLink data-aos="fade-up" :to="{ path: galeri.path, query: { tag: galeri.tag, title: galeri.title } }" class="shadow-2xl rounded-3xl overflow-hidden">
            <NuxtImg

              :title="galeri.title"
              :alt="galeri.title"
              loading="lazy"
              :src="galeri.cover"
              width="500"
              height="300"
              :placeholder="img(`${galeri.cover}`, { h: 10, f: 'png', blur: 2, q: 50 })"
              class="rounded-3xl mb-4 aspect-video object-cover object-top h-[250px] w-[600px]  transition-all duration-300 ease-in-out"
            />
            <h2 class=" font-bold text-sm text-center">
              {{ galeri.title }}
            </h2>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
