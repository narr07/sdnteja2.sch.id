<!-- eslint-disable no-console -->
<script setup lang="ts">
interface Image {
  public_id: string
  secure_url: string
}

const img = useImage()
const images = ref<Image[]>([])

// Ambil query parameter dari URL
const route = useRoute()
const tagOrFolder = computed(() => route.query.tag || 'default-tag')
const title = computed(() => route.query.title || 'default-title')

// Fetch data berdasarkan tag
const { status, data, error, execute } = useLazyFetch('/api/getImages', {
  method: 'POST',
  body: { tag: tagOrFolder.value }, // Pastikan tag dikirimkan dengan benar
})

// Jalankan fetch pertama kali
execute().then(() => {
  console.log('API Response:', data.value) // Log respons API

  // Tangani kemungkinan struktur respons
  if (data.value && 'resources' in data.value) {
    images.value = data.value.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
    }))
  }
  else {
    console.error('No resources found in API response:', data.value)
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
</script>

<template>
  <UContainer class="p-6">
    <div class="py-8 max-w-3xl mx-auto">
      <h1 data-aos="fade-up" class="text-2xl text-center md:text-5xl text-balance font-bold">
        {{ title }}
      </h1>
    </div>
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
    <div v-else>
      <!-- Masonry Layout -->
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
  </UContainer>
</template>
