<script setup lang="ts">
const { data: beritaPage } = await useAsyncData('HalamanBerita', () => {
  return queryCollection('berita')
    .select('title', 'date', 'path')
    .order('date', 'DESC')
    .all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="berita in beritaPage" :key="berita.title">
          <NuxtLink :to="berita.path">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full rounded-4xl p-2 overflow-hidden">
              <h2 class="text-2xl font-bold line-clamp-2">
                {{ berita?.title }}
              </h2>

              <div class="mt-4   ">
                <UBadge>{{ new Date(berita.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</UBadge>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
