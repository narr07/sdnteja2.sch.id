<script setup lang="ts">
const { data: guruTeja } = await useAsyncData('gurus', () => {
  return queryCollection('guru')
    .order('name', 'DESC')
    .all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <UCard v-for="guru in guruTeja" :key="guru.name" data-aos="fade-up" variant="soft" class="bg-night-50   shadow-teja  dark:bg-night-900 h-full aspect-square  rounded-4xl">
          <NuxtLink :to="guru.meta.path as string" class="p-4">
            <h3 class="text-lg font-bold">
              {{ guru.name }}
            </h3>
          </NuxtLink>
          <p>{{ guru.mataPelajaran }}</p>
          <p>{{ guru.kelas }}</p>
          <UModal title="Modal with title">
            <UButton label="Detail..." color="neutral" variant="subtle" />

            <template #body>
              <h3 class="text-lg font-bold">
                {{ guru.name }}
              </h3>
              <p>{{ guru.mataPelajaran }}</p>
              <p>{{ guru.kelas }}</p>
            </template>
          </UModal>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
