<script setup lang="ts">
const { data: guruTeja } = await useAsyncData('gurus', () => {
  return queryCollection('guru')
    .order('nama', 'DESC')
    .all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="guru in guruTeja" :key="guru.nama" class="transition-transform duration-300 ease-in-out transform hover:scale-98 ">
          <NuxtLink :to="guru.meta.path as string" class="p-4">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full  rounded-4xl">
              <NuxtImg :src="guru.foto.src" alt="Guru Photo" width="234" height="234" class="rounded-lg mb-4" />
              <h3 class="text-lg font-bold">
                {{ guru.nama }}
              </h3>
              <p>{{ guru.kelas }}</p>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
