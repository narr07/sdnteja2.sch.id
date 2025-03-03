<script setup lang="ts">
const { data: beritaPage } = await useAsyncData('beritas', () => {
  return queryCollection('berita')
    .order('date', 'DESC')
    .all()
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <pre>
          {{ beritaPage }}
        </pre>
      </div>
    </UContainer>
  </div>
</template>
