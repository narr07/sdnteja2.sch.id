<script setup lang="ts">
const { data: guruTeja } = await useAsyncData('gurus', () => {
  return queryCollection('guru').all()
})

const img = useImage()
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div v-for="guru in guruTeja" :key="guru.nama" class="transition-transform duration-200 ease-in-out transform hover:scale-98 ">
          <NuxtLink :to="guru.path" class="group">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full rounded-4xl">
              <NuxtImg
                format="webp"
                quality="70"
                :title="guru.nama"
                :alt="guru.nama"
                loading="lazy"
                :src="guru.foto"
                width="234"
                height="300"
                :placeholder="img(`${guru.foto}`, { h: 10, f: 'png', blur: 2, q: 50 })"
                class="rounded-3xl mb-4 aspect-square object-cover object-top bg-top transition-all duration-300 ease-in-out"
              />
              <h2 class=" font-bold text-sm text-center">
                {{ guru.nama }}
              </h2>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
