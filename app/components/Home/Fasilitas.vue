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
      arrows
      data-aos="fade-up"
      loop wheel-gestures dots :items="items"
      :ui="{
        item: 'basis-1/1 md:basis-1/2',
        controls: 'absolute -bottom-6 inset-x-15',
        dots: '-top-7',
      }"
    >
      <NuxtImg :src="item" height="500" width="auto" class="rounded-lg object-cover object-center h-auto w-full aspect-video" />
    </UCarousel>
  </UContainer>
</template>
