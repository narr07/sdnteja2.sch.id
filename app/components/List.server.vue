<script setup lang="ts">
const { data: guruTeja } = await useAsyncData('gurus', () => {
  return queryCollection('guru')
    .order('nama', 'DESC')
    .all()
})

// Function to determine card size/position in bento grid
function getCardClass(index: number) {
  // Create a repeating pattern for the bento grid
  const position = index % 8 // Pattern repeats every 8 items

  if (position === 0)
    return 'bento-large' // 2x2 card
  if (position === 3)
    return 'bento-wide' // 2x1 card
  if (position === 5)
    return 'bento-tall' // 1x2 card
  return 'bento-standard' // 1x1 card
}
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="bento-grid">
        <div
          v-for="(guru, index) in guruTeja"
          :key="guru.nama"
          class="transition-transform duration-300 ease-in-out transform hover:scale-105"
          :class="getCardClass(index)"
        >
          <NuxtLink :to="guru.meta.path as string" class="h-full block">
            <UCard data-aos="fade-up" variant="soft" class="bg-night-50 shadow-teja dark:bg-night-900 h-full rounded-4xl overflow-hidden">
              <div class="flex flex-col h-full">
                <div class="relative overflow-hidden">
                  <NuxtImg
                    :src="guru.foto"
                    alt="Foto Guru"
                    class="w-full object-cover rounded-t-lg"
                    :class="{
                      'h-40': getCardClass(index) === 'bento-standard' || getCardClass(index) === 'bento-wide',
                      'h-60': getCardClass(index) === 'bento-tall',
                      'h-72': getCardClass(index) === 'bento-large',
                    }"
                  />
                </div>

                <div class="flex-grow p-3">
                  <h3
                    class="font-bold mb-1"
                    :class="{
                      'text-lg': getCardClass(index) === 'bento-standard',
                      'text-xl': getCardClass(index) === 'bento-wide' || getCardClass(index) === 'bento-tall',
                      'text-2xl': getCardClass(index) === 'bento-large',
                    }"
                  >
                    {{ guru.nama }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ guru.kelas }}
                  </p>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1.5rem;
}

/* Card size classes */
.bento-standard {
  grid-column: span 1;
  grid-row: span 1;
}

.bento-wide {
  grid-column: span 2;
  grid-row: span 1;
}

.bento-tall {
  grid-column: span 1;
  grid-row: span 2;
}

.bento-large {
  grid-column: span 2;
  grid-row: span 2;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento-wide,
  .bento-large {
    grid-column: span 2;
  }

  .bento-tall {
    grid-row: span 2;
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .bento-wide,
  .bento-large,
  .bento-tall,
  .bento-standard {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
