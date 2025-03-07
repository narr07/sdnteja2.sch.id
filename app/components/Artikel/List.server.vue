<script setup lang="ts">
const { data: artikelPage } = await useAsyncData('HalamanArtikel', () => {
  return queryCollection('artikel')
    .select('title', 'date', 'path', 'image')
    .order('date', 'DESC')
    .all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="artikel in artikelPage" :key="artikel.title">
          <NuxtLink :to="artikel.path">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 hover:shadow-none transition-shadow ease-in-out duration-300  shadow-teja dark:bg-night-900 h-full rounded-4xl overflow-hidden">
              <div>
                <NuxtImg height="300px" width="500" :src="artikel.image.toString()" :alt="artikel.title" class="rounded-2xl object-cover object-center w-full h-[300px] bg-cover aspect-video" />
                <div class="mt-4   ">
                  <h2 class="text-xl font-bold line-clamp-2">
                    {{ artikel?.title }}
                  </h2>

                  <div class="mt-4   ">
                    <UBadge>{{ new Date(artikel.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</UBadge>
                  </div>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
