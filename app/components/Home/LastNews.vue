<script setup lang="ts">
const { data: lastArtikel } = await useAsyncData('ArtikelTerkahir', () => {
  return queryCollection('artikel')
    .select('title', 'date', 'path', 'image')
    .order('date', 'DESC')
    .limit(3)
    .all()
})
const { data: lastBerita } = await useAsyncData('BeritaTerkahir', () => {
  return queryCollection('berita')
    .select('title', 'date', 'path')
    .order('date', 'DESC')
    .limit(3)
    .all()
})

const img = useImage()
</script>

<template>
  <div class="bg-red-500 dark:bg-night-900 w-full pt-20 pb-28 mt-12">
    <UContainer>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <div data-aos="fade-up" variant="soft" class="rounded-4xl p-6 bg-white dark:bg-night-950 py-8 md:sticky md:top-22 md:self-start">
          <h2 class="text-2xl md:text-3xl mb-4 font-bold">
            Berita Terakhir
          </h2>
          <div v-for="berita in lastBerita" :key="berita.title">
            <NuxtLink :to="berita.path">
              <UCard class="mb-4 hover:ring-red-500">
                <p class="line-clamp-2">
                  {{ berita.title }}
                </p>
              </UCard>
            </NuxtLink>
          </div>
        </div>
        <div data-aos="fade-up" variant="soft" class="py-8 md:py-0">
          <div class="flex flex-col space-y-4">
            <div v-for="artikel in lastArtikel" :key="artikel.title">
              <NuxtLink :to="artikel.path">
                <UCard data-aos="fade-up" variant="soft" class="bg-night-50 hover:shadow-none transition-shadow ease-in-out duration-300 shadow-teja dark:bg-night-950 h-full rounded-4xl overflow-hidden">
                  <div>
                    <NuxtImg
                      format="webp" quality="50"
                      height="300px" width="500" :src="artikel.image.toString()" :alt="artikel.title" class="rounded-2xl object-cover object-center w-full h-[300px] bg-cover aspect-video"
                      :placeholder="img(`${artikel.image.toString()}`, { h: 10, f: 'png', blur: 1, q: 50 })"
                    />
                    <div class="mt-4">
                      <h2 class="text-xl font-bold line-clamp-2">
                        {{ artikel?.title }}
                      </h2>

                      <div class="mt-4">
                        <UBadge>{{ new Date(artikel.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</UBadge>
                      </div>
                    </div>
                  </div>
                </UCard>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
