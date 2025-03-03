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
          <p class="text-center italic">
            {{ guruPage?.catatan ? `"${guruPage.catatan}"` : '-' }}
          </p>
          <p class="text-center mt-4">
            <strong>NIP:</strong> {{ guruPage?.nip }}
          </p>
          <p class="text-center">
            <strong>Jabatan:</strong> {{ guruPage?.jabatan }}
          </p>
          <p class="text-center">
            <strong>Pendidikan:</strong> {{ guruPage?.pendidikan }}
          </p>
          <p class="text-center">
            <strong>Pengalaman:</strong> {{ guruPage?.pengalaman }}
          </p>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
