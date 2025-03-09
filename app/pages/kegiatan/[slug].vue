<!-- eslint-disable no-console -->
<script setup lang="ts">
interface Image {
  public_id: string
  secure_url: string
}

interface ApiResponse {
  success: boolean
  resources?: Image[]
  message?: string
}

const img = useImage()
const images = ref<Image[]>([])

// Ambil query parameter dari URL
const route = useRoute()
const tagOrFolder = computed(() => route.query.tag || 'default-tag') // Key unik berdasarkan tag
const title = computed(() => route.query.title || 'default-title')

// Fetch data dengan caching
const { status, data, error, refresh } = useLazyFetch<ApiResponse>('/api/getImages', {
  method: 'POST',
  body: { tag: tagOrFolder.value },
  key: `get-images-${tagOrFolder.value}`, // Key unik untuk caching
})

// Perbarui images saat data berubah
watch(data, (newValue) => {
  console.log('API Response:', newValue)

  if (newValue?.success && Array.isArray(newValue.resources)) {
    images.value = newValue.resources.map(resource => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url.replace('http://', 'https://'),
    }))
  }
  else {
    console.error('No resources found or API failed:', newValue?.message)
    images.value = [] // Set default jika tidak ada resources
  }
})

// Tangani error jika ada
watch(error, (err) => {
  if (err) {
    console.error('Error fetching images:', err)
    images.value = [] // Set default value jika terjadi error
  }
})

async function fetchImages(tag: string) {
  const { data } = await useFetch(`/api/getImagesByTag?tag=${tag}`)
  // Handle the response data here
  return data.value
}

const images2 = ref<Image[]>(await fetchImages(`${tagOrFolder.value}`).then(data =>
  Array.isArray(data)
    ? data.map((resource: any) => ({
        public_id: resource.public_id,
        secure_url: resource.secure_url.replace('http://', 'https://'),
      }))
    : []),
)
</script>

<template>
  <UContainer class="p-6">
    <div class="py-8 max-w-3xl mx-auto">
      <h1 data-aos="fade-up" class="text-2xl text-center md:text-5xl text-balance font-bold">
        {{ title }}
      </h1>
    </div>

    <div>
      ini dari image2
      <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        <div v-for="image in images2" :key="image.public_id" class="relative">
          <NuxtImg
            :src="image.secure_url"
            height="auto"
            width="100%"
            class="rounded-lg w-full h-auto"
            :placeholder="img(`${image.secure_url}`, { h: 10, f: 'png', blur: 1, q: 50 })"
          />
        </div>
      </div>

      <!-- Tombol untuk Refresh -->
      <div class="text-center mb-4">
        <UButton class="btn btn-primary" @click="() => refresh()">
          Refresh Data
        </UButton>
      </div>

      <!-- Loading State -->
      <div v-if="status === 'pending'">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <USkeleton
            v-for="n in 3" :key="n"
            class="w-full h-[200px] rounded-lg bg-red-50/50 dark:bg-red-700/50"
          />
        </div>
        <div class="animate-pulse text-2xl py-16 text-center">
          Loading ...
        </div>
      </div>

      <!-- Tampilkan Gambar -->
      <div v-else>
        <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          <div v-for="image in images" :key="image.public_id" class="relative">
            <NuxtImg
              :src="image.secure_url"
              height="auto"
              width="100%"
              class="rounded-lg w-full h-auto"
              :placeholder="img(`${image.secure_url}`, { h: 10, f: 'png', blur: 1, q: 50 })"
            />
          </div>
        </div>
      </div>

      <!-- Error Handling -->
      <div v-if="error" class="text-red-500 text-center">
        Error fetching images: {{ error.message }}
      </div>
    </div>
  </UContainer>
</template>
