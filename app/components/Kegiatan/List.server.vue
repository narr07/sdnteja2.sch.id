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
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div v-for="galeri in kegiatanSekolah" :key="galeri.title" class="transition-transform duration-200 ease-in-out transform hover:scale-98 ">
          <NuxtLink :to="{ path: galeri.path, query: { tag: galeri.tag } }" class="group">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full rounded-4xl">
              <NuxtImg
                :title="galeri.title"
                :alt="galeri.title"
                loading="lazy"
                :src="galeri.cover.url"
                width="234"
                height="234"
                :placeholder="img(`${galeri.cover}`, { h: 10, f: 'png', blur: 2, q: 50 })"
                class="rounded-3xl mb-4 aspect-square object-cover object-top   transition-all duration-300 ease-in-out"
              />
              <h2 class=" font-bold text-sm text-center">
                {{ galeri.title }}
              </h2>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
