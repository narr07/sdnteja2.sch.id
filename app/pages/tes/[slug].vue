<script lang="ts" setup>
// Ambil data berdasarkan slug dari route
const route = useRoute()
const { data: tesPage } = await useAsyncData(`tes-${route.path}`, async () => {
  return await queryCollection('tes').path(route.path).first()
})

// State untuk gambar
interface Image {
  src: string
  alt?: string
}

const images = ref<Image[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Fungsi untuk mengambil gambar berdasarkan tag
async function fetchImages(tag: string) {
  loading.value = true
  error.value = null

  try {
    const res = await $fetch('/api/get-images', {
      params: {
        tag, // Kirim tag ke API
      },
    })
    images.value = res
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {
    error.value = 'Gagal memuat gambar.'
  }
  finally {
    loading.value = false
  }
}

// Panggil fetchImages ketika komponen dimuat
onMounted(() => {
  if (tesPage.value && tesPage.value.tag) {
    fetchImages(tesPage.value.tag) // Ambil gambar berdasarkan tesPage.tag
  }
})

const img = useImage()
</script>

<template>
  <UContainer>
    <h1>{{ tesPage?.title }}</h1>

    <h2>Gambar Berdasarkan Tag: {{ tesPage?.tag }}</h2>

    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        <div v-for="image in images" :key="image.src" class="relative">
          <NuxtImg
            v-if="image"
            format="webp"
            :src="image.src"
            height="auto"
            width="100%"
            quality="50"
            loading="lazy"
            :alt="tesPage?.title"
            class="rounded-lg w-full h-auto cursor-zoom-in"
            :placeholder="img(`${image.src}`, { h: 10, f: 'webp', blur: 1, q: 50 })"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
.image-container {
  margin-bottom: 16px;
}
.image {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}
</style>
