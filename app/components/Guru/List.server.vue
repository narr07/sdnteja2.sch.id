<script setup lang="ts">
const { data: guruTeja } = await useAsyncData('gurus', () => {
  return queryCollection('guru').all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div v-for="guru in guruTeja" :key="guru.nama" class="transition-transform duration-200 ease-in-out transform hover:scale-98 ">
          <NuxtLink :to="guru.path" class="group">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full rounded-4xl">
              <NuxtImg :src="guru.foto" alt="Guru Photo" width="234" height="234" class="rounded-3xl mb-4 aspect-square object-cover object-top   transition-all duration-300 ease-in-out" />
              <h3 class=" font-bold text-sm text-center">
                {{ guru.nama }}
              </h3>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
