<script lang="ts" setup>
const route = useRoute()

const { data: guruPage } = await useAsyncData(route.path, () => {
  return queryCollection('guru').first()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-8">
        <h1 data-aos="fade-up" class="text-5xl text-center md:text-6xl   font-bold ">
          {{ guruPage?.nama }}
        </h1>
      </div>
      <UCard data-aos="fade-up" variant="soft" class="rounded-4xl bg-night-50 shadow-teja dark:bg-night-900 md:py-8">
        <div class="flex flex-col items-center justify-center p-8">
          <NuxtImg :src="guruPage?.foto" width="234" height="234" class="rounded-lg mb-4" />
          <h2 class="text-2xl font-bold">
            {{ guruPage?.kelas }}
          </h2>

          <pre>
           {{ guruPage }}
          </pre>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
