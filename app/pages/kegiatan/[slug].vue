<script setup lang="ts">
interface Image {
  public_id: string
  secure_url: string
}

const img = useImage()
const images = ref<Image[]>([])

// Get the tag from the route params or props
const route = useRoute()
const tagOrFolder = computed(() => route.query.tag || 'default-tag') // Gunakan 'default-tag' jika tag tidak ada

const { status, data, error, execute } = useLazyFetch('/api/getImages', {
  method: 'POST',
  body: { tag: tagOrFolder },
})

// Jalankan fungsi execute untuk mengambil data
execute().then(() => {
  images.value = data.value.resources
})

// Tangani error jika ada
watch(error, (err) => {
  if (err)
    console.error('Error fetching images:', err)
})
</script>

<template>
  <UContainer class="p-6">
    <div v-if="status === 'pending'">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <USkeleton
          v-for="n in 3" :key="n"
          class="w-full h-[200px] rounded-lg bg-red-50/50 dark:bg-red-700/50"
        />
      </div>
      <div class="animate-pulse texl-2xl py-16 text-center">
        Loading ...
      </div>
    </div>
    <div v-else>
      <!-- Masonry Layout -->
      <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        <div
          v-for="image in images"
          :key="image.public_id"

          class="relative"
        >
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
