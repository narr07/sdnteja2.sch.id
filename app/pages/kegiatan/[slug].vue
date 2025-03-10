<script lang="ts" setup>
// Definisikan tipe data untuk gambar Cloudinary

// Ambil data halaman berdasarkan route
const route = useRoute()
const { data: kegiatanPage } = await useAsyncData(`kegiatan-${route.path}`, async () => {
  return await queryCollection('kegiatan').path(route.path).first()
})

const img = useImage()

// State untuk menampilkan gambar dalam mode fullscreen
const showFullscreen = ref(false)
const selectedImage = ref('')
const currentImageIndex = ref(0)

// Fungsi untuk menampilkan gambar dalam mode fullscreen
function openFullscreen(image: string) {
  selectedImage.value = image
  showFullscreen.value = true
  document.body.style.overflow = 'hidden' // Mencegah scroll pada body

  // Dapatkan indeks gambar yang sedang ditampilkan
  currentImageIndex.value = kegiatanPage.value?.foto.findIndex(img => img === image) || 0
}

// Fungsi untuk menutup gambar fullscreen
function closeFullscreen() {
  showFullscreen.value = false
  document.body.style.overflow = 'auto' // Mengembalikan scroll pada body
}

// Fungsi untuk navigasi ke gambar sebelumnya
function navigatePrev() {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    selectedImage.value = kegiatanPage.value?.foto[currentImageIndex.value] || ''
  }
}

// Fungsi untuk navigasi ke gambar berikutnya
function navigateNext() {
  if (kegiatanPage.value?.foto && currentImageIndex.value < kegiatanPage.value.foto.length - 1) {
    currentImageIndex.value++
    selectedImage.value = kegiatanPage.value?.foto[currentImageIndex.value] || ''
  }
}

// Computed properties untuk memeriksa apakah tombol navigasi harus dinonaktifkan
const isPrevDisabled = computed(() => currentImageIndex.value <= 0)
const isNextDisabled = computed(() => {
  if (!kegiatanPage.value?.foto)
    return true
  return currentImageIndex.value >= kegiatanPage.value.foto.length - 1
})

defineOgImageComponent('OgImage', {
  page: 'Kegiatan',
  title: kegiatanPage?.value?.title,
  description: kegiatanPage?.value?.description,
})
</script>

<template>
  <UContainer class="p-6">
    <div class="py-8 max-w-3xl mx-auto">
      <h1 data-aos="fade-up" class="text-2xl text-center md:text-5xl text-balance font-bold">
        {{ kegiatanPage?.title }}
      </h1>
    </div>
    <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      <div v-for="image in kegiatanPage?.foto" :key="image" class="relative">
        <NuxtImg
          v-if="image"

          :src="image"
          height="auto"
          width="100%"
          loading="lazy"
          :alt="kegiatanPage?.title"
          class="rounded-lg w-full h-auto cursor-zoom-in"
          :placeholder="img(`${image}`, { h: 10, f: 'png', blur: 1, q: 50 })"
          @click="openFullscreen(image)"
        />
      </div>
    </div>

    <!-- Overlay untuk menampilkan gambar fullscreen dengan transisi -->
    <Transition
      name="fade"
      appear
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showFullscreen"
        class="fixed inset-0 bg-night-900/90 z-50 flex items-center justify-center p-4"
        @click="closeFullscreen"
      >
        <button
          class="absolute top-4 right-4 z-50 text-white text-3xl focus:outline-none"
          @click.stop="closeFullscreen"
        >
          &times;
        </button>
        <button
          class="absolute left-4 z-50 text-white text-3xl focus:outline-none"
          :disabled="isPrevDisabled"
          @click.stop="navigatePrev"
        >
          &larr;
        </button>
        <button
          class="absolute right-4 z-50 text-white text-3xl focus:outline-none"
          :disabled="isNextDisabled"
          @click.stop="navigateNext"
        >
          &rarr;
        </button>
        <div class="relative max-h-screen cursor-zoom-out max-w-full w-full h-full" @click.stop="closeFullscreen">
          <NuxtImg
            v-if="selectedImage"
            :src="selectedImage"
            class="w-full h-full object-contain"
            :alt="kegiatanPage?.title"
            loading="eager"
          />
        </div>
      </div>
    </Transition>
  </UContainer>
</template>
