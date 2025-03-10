<script lang="ts" setup>
import { useAsyncData } from '#app'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Definisikan tipe data untuk gambar Cloudinary
interface CloudinaryImage {
  asset_id: string
  public_id: string
  secure_url: string
  [key: string]: any // Tambahan untuk properti lainnya
}

// Ambil data halaman berdasarkan route
const route = useRoute()
const { data: kegiatanPage } = await useAsyncData(`kegiatan-${route.path}`, async () => {
  return await queryCollection('kegiatan').path(route.path).first()
})

// Variabel untuk menyimpan gambar dari Cloudinary
const cldImages = ref<CloudinaryImage[]>([]) // Tambahkan tipe array gambar

// Fungsi untuk mengambil gambar berdasarkan tag
async function fetchCldImages(tag: string): Promise<CloudinaryImage[]> {
  try {
    const { data } = await useFetch(`/api/cldimage/${tag}`)
    if (data.value && Array.isArray(data.value)) {
      return data.value as unknown as CloudinaryImage[] // Pastikan respons berupa array gambar
    }
    console.warn(`No images found for tag: ${tag}`)
    return []
  }
  catch (error) {
    console.error('Error fetching images:', error)
    return []
  }
}

// Pantau perubahan pada tag dinamis dan ambil gambar
watch(
  () => kegiatanPage?.value?.tag,
  async (newTag) => {
    if (newTag) {
      cldImages.value = await fetchCldImages(newTag)
    }
  },
  { immediate: true }, // Jalankan langsung saat komponen di-mount
)
async function fetchCldImages2(tag: string) {
  const { data } = await useFetch(`/api/getImagesByTag?tag=${tag}`)
  // Handle the response data here
  return data.value
}

const cldImages2 = await fetchCldImages2(`${kegiatanPage?.value?.tag}`)
</script>

<template>
  <div>
    <UContainer>
      <div>
        ini dari api
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div v-for="image in cldImages2" :key="image.asset_id" class="transition-transform duration-200 ease-in-out transform hover:scale-98">
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
      </div>
      <!-- Tampilkan grid gambar jika ada data -->
      <div v-if="cldImages.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div
          v-for="image in cldImages"
          :key="image.asset_id"
          class="transition-transform duration-200 ease-in-out transform hover:scale-98"
        >
          <NuxtImg
            provider="cloudinary"
            :src="image.secure_url"
            :alt="image.public_id"
            loading="lazy"
            width="500"
            height="300"
            class="rounded-3xl mb-4 aspect-video object-cover object-top h-[250px] w-[600px] transition-all duration-300 ease-in-out"
          />
        </div>
      </div>

      <!-- Pesan fallback jika tidak ada gambar -->
      <p v-else>
        No images available for this tag.
      </p>
    </UContainer>
  </div>
</template>
