<script lang="ts" setup>
const route = useRoute()

const { data: guruPage } = await useAsyncData(`guru-${route.path}`, () => {
  return queryCollection('guru').path(route.path).first()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-8">
        <h1 data-aos="fade-up" class="text-5xl text-center md:text-6xl font-bold">
          {{ guruPage?.nama }}
        </h1>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Main Profile Card -->
        <UCard
          data-aos="fade-up"
          variant="soft"
          class="rounded-3xl bg-night-50 shadow-teja dark:bg-night-900 md:col-span-1 row-span-2"
        >
          <div class="flex flex-col items-center justify-center p-4">
            <NuxtImg
              :src="guruPage?.foto"
              width="234"
              height="234"
              class="rounded-lg mb-4 shadow-md hover:scale-105 transition-transform"
            />
            <h2 class="text-2xl font-bold mt-2">
              {{ guruPage?.nama }}
            </h2>
            <UBadge color="primary" variant="solid" class="mt-1">
              {{ guruPage?.kelas }}
            </UBadge>
          </div>
        </UCard>

        <!-- Bio Card -->
        <UCard
          data-aos="fade-up" data-aos-delay="100"
          variant="soft"
          class="rounded-3xl bg-night-50 shadow-teja dark:bg-night-900 md:col-span-2"
        >
          <div class="p-4">
            <h3 class="text-xl font-bold mb-2 flex items-center">
              <UIcon name="i-heroicons-document-text" class="mr-2" />
              Catatan Guru
            </h3>
            <p class="italic text-lg">
              {{ guruPage?.catatan ? `"${guruPage.catatan}"` : 'Tidak ada catatan' }}
            </p>
          </div>
        </UCard>

        <!-- Details Card -->
        <UCard
          data-aos="fade-up" data-aos-delay="200"
          variant="soft"
          class="rounded-3xl bg-night-50 shadow-teja dark:bg-night-900 md:col-span-2"
        >
          <div class="p-4">
            <h3 class="text-xl font-bold mb-3 flex items-center">
              <UIcon name="i-heroicons-identification" class="mr-2" />
              Informasi Guru
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-white dark:bg-night-800 rounded-xl p-3 shadow-sm">
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400">
                  NIP
                </p>
                <p class="font-bold">
                  {{ guruPage?.nip || '-' }}
                </p>
              </div>

              <div class="bg-white dark:bg-night-800 rounded-xl p-3 shadow-sm">
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400">
                  Jabatan
                </p>
                <p class="font-bold">
                  {{ guruPage?.jabatan || '-' }}
                </p>
              </div>

              <div class="bg-white dark:bg-night-800 rounded-xl p-3 shadow-sm">
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400">
                  Pendidikan
                </p>
                <p class="font-bold">
                  {{ guruPage?.pendidikan || '-' }}
                </p>
              </div>

              <div class="bg-white dark:bg-night-800 rounded-xl p-3 shadow-sm">
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400">
                  Pengalaman
                </p>
                <p class="font-bold">
                  {{ guruPage?.nuptk || '-' }}
                </p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Achievement Card -->
        <UCard
          data-aos="fade-up" data-aos-delay="300"
          variant="soft"
          class="rounded-3xl bg-night-50 shadow-teja dark:bg-night-900 md:col-span-3"
        >
          <div class="p-4">
            <h3 class="text-xl font-bold mb-2 flex items-center">
              <UIcon name="i-heroicons-academic-cap" class="mr-2" />
              Prestasi
            </h3>
            <div class="bg-white dark:bg-night-800 rounded-xl p-4 shadow-sm">
              <ul v-if="guruPage?.pelatihan && guruPage.pelatihan.length">
                <li v-for="(item, index) in guruPage.pelatihan" :key="index">
                  <span class="font-bold">
                    {{ item.title }}
                  </span>- {{ item.tahun }}
                </li>
              </ul>
              <p v-else class="italic">
                Belum ada data prestasi
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Back Button -->
      <div class="flex justify-center mb-8">
        <UButton
          to="/guru"
          icon="i-heroicons-arrow-left"
          color="primary"
          variant="soft"
          class="px-4 py-2"
        >
          Kembali ke Daftar Guru
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
