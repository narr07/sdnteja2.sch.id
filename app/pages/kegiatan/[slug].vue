<script lang="ts" setup>
// Definisikan tipe data untuk gambar Cloudinary

// Ambil data halaman berdasarkan route
const route = useRoute()
const { data: kegiatanPage } = await useAsyncData(`kegiatan-${route.path}`, async () => {
  return await queryCollection('kegiatan').path(route.path).first()
})

const img = useImage()
</script>

<template>
  <UContainer class="p-6">
    <div class="py-8 max-w-3xl mx-auto">
      <h1 data-aos="fade-up" class="text-2xl text-center md:text-5xl text-balance font-bold">
        {{ kegiatanPage?.title }}
      </h1>
    </div>
    {{ kegiatanPage }}
    <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      <!-- <div v-for="(image, index) in kegiatanPage?.foto" :key="index" class="relative">
        <NuxtImg
          :src="image.url"
          height="auto"
          width="100%"
          class="rounded-lg w-full h-auto"
        />
      </div> -->
    </div>
  </UContainer>
</template>
