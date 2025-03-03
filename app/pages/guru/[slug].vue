<script lang="ts" setup>
const route = useRoute()

const { data: guruPage } = await useAsyncData(route.path, () => {
  return queryCollection('guru').first()
})
</script>

<template>
  <div>
    <UContainer>
      <pre>
        {{ guruPage }}
      </pre>
    </UContainer>
  </div>
</template>
