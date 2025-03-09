<!-- app/pages/kegiatan/[slug].vue -->
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
const route = useRoute()
const tagOrFolder = computed(() => route.query.tag || 'default-tag')
const title = computed(() => route.query.title || 'default-title')

// Gunakan GET request dengan query parameter
const { data, pending, error, refresh } = await useLazyFetch<ApiResponse>('/api/getImages', {
  method: 'GET',
  query: { tag: tagOrFolder.value },
  key: `get-images-${tagOrFolder.value}`,
})

// Images computed property
const images = computed(() => data.value?.resources || [])

// Error handling
watch(error, (err) => {
  if (err)
    console.error('Error fetching images:', err)
})
</script>

<template>
  <UContainer class="p-6">
    <div class="py-8 max-w-3xl mx-auto">
      <h1 data-aos="fade-up" class="text-2xl text-center md:text-5xl font-bold">
        {{ title }}
      </h1>
    </div>

    <!-- Refresh Button -->
    <div class="text-center mb-4">
      <UButton class="btn btn-primary" @click="() => refresh()">
        Refresh Data
      </UButton>
    </div>

    <!-- Loading State -->
    <div v-if="pending">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <USkeleton v-for="n in 3" :key="n" class="w-full h-[200px] rounded-lg bg-red-50/50 dark:bg-red-700/50" />
      </div>
      <div class="animate-pulse text-2xl py-16 text-center">
        Loading ...
      </div>
    </div>

    <!-- Display Images -->
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
  </UContainer>
</template>
