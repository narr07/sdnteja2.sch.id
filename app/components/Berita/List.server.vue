<script setup lang="ts">
const { data: beritaPage } = await useAsyncData('HalamanBerita', () => {
  return queryCollection('berita')
    .select('title', 'date', 'path', 'image')
    .order('date', 'DESC')
    .all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div v-for="berita in beritaPage" :key="berita.title" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink :to="berita.path">
          <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full rounded-4xl overflow-hidden">
            <h2 class="text-2xl font-bold">
              {{ berita?.title }}
            </h2>

            <div class="mt-4 flex justify-end">
              <UBadge>{{ new Date(berita.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</UBadge>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
