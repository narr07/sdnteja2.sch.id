// KegiatanPage.vue

<script setup lang="ts">
const { data: kegiatanSekolah } = await useAsyncData('galeris', () => {
  return queryCollection('kegiatan').all()
})

const img = useImage()
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div v-for="galeri in kegiatanSekolah" :key="galeri.title" class="transition-transform duration-200 ease-in-out transform hover:scale-98 ">
          <NuxtLink data-aos="fade-up" :to=" galeri.path " class="shadow-2xl rounded-3xl overflow-hidden">
            <NuxtImg
              format="webp"
              quality="50"
              height="200"
              width="450"
              :title="galeri.title"
              :alt="galeri.title"
              loading="lazy"
              :src="galeri.cover"
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
