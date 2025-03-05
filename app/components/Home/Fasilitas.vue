<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6',
]
</script>

<template>
  <UContainer class="py-20">
    <UCarousel
      v-slot="{ item }"
      data-aos="fade-up"
      loop wheel-gestures dots :items="items" :ui="{ item: 'basis-1/4' }"
    >
      <NuxtImg :src="item" height="500px" width="auto" class="rounded-lg aspect-video" />
    </UCarousel>
  </UContainer>
</template>
