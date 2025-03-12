// app/pages/tes/[slug].vue
<script lang="ts" setup>
const route = useRoute()

// Ambil data halaman dari Nuxt Content berdasarkan slug route
const { data: tesPage } = await useAsyncData(`tes-${route.path}`, async () => {
  return await queryCollection('tes').path(route.path).first()
})

// Ambil daftar gambar dari API endpoint dinamis berdasarkan nama folder yang ada di YAML (field "fotoFolder")
const { data: images } = await useFetch<string[]>(() => tesPage.value && (tesPage.value as any).foto ? `/api/images/${(tesPage.value as any).foto}` : '')

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
  currentImageIndex.value = images.value?.findIndex(img => img === image) || 0
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
    selectedImage.value = images.value?.[currentImageIndex.value] || ''
  }
}

// Fungsi untuk navigasi ke gambar berikutnya
function navigateNext() {
  if (images.value && currentImageIndex.value < images.value.length - 1) {
    currentImageIndex.value++
    selectedImage.value = images.value?.[currentImageIndex.value] || ''
  }
}

// Computed properties untuk memeriksa apakah tombol navigasi harus dinonaktifkan
const isPrevDisabled = computed(() => currentImageIndex.value <= 0)
const isNextDisabled = computed(() => {
  if (!images.value)
    return true
  return currentImageIndex.value >= images.value.length - 1
})
</script>

<template>
  <UContainer class="p-6">
    <h1>{{ tesPage?.title }}</h1>

    <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      <div v-for="image in images" :key="image" class="relative">
        <NuxtImg
          :src="image"
          format="webp"
          quality="50"
          loading="lazy"
          class="rounded-lg cursor-zoom-in"
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
        <UButton
          class="absolute top-4 right-4 z-50 focus:outline-none"
          size="lg"
          icon="solar:close-square-linear"
          @click.stop="closeFullscreen"
        />
        <UButton
          class="absolute left-4 z-50 focus:outline-none"
          :disabled="isPrevDisabled"
          size="lg"
          icon="solar:arrow-left-linear"
          @click.stop="navigatePrev"
        />
        <UButton
          class="absolute right-4 z-50 focus:outline-none"
          :disabled="isNextDisabled"
          size="lg"
          icon="solar:arrow-right-linear"
          @click.stop="navigateNext"
        />
        <div class="relative max-h-screen cursor-zoom-out max-w-full w-full h-full" @click.stop="closeFullscreen">
          <NuxtImg
            v-if="selectedImage"
            format="webp"
            :src="selectedImage"
            class="w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>
    </Transition>
  </UContainer>
</template>
