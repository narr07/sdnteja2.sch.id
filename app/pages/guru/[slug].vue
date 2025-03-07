<script lang="ts" setup>
const route = useRoute()

const { data: guruPage } = await useAsyncData(`guru-${route.path}`, () => {
  return queryCollection('guru').path(route.path).first()
})

defineOgImageComponent('User', {
  page: 'Guru',
  title: guruPage?.value?.lengkap,
  description: guruPage?.value?.catatan,
  image: guruPage?.value?.foto,
  kelas: guruPage?.value?.kelas,
  pembina: guruPage?.value?.jabatan,
})
const img = useImage()
</script>

<template>
  <div>
    <UContainer>
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
              :alt="guruPage?.lengkap"
              :title="guruPage?.lengkap"
              loading="lazy"
              :placeholder="img(`${guruPage?.foto}`, { h: 10, f: 'png', blur: 2, q: 50 })"
              class="rounded-lg mb-4 h-full w-auto shadow-md "
            />
            <h2 class="text-lg md:text-xl font-bold mt-2">
              {{ guruPage?.lengkap }}
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
                  NUPTK
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
              Pelatihan
            </h3>
            <div class="bg-white dark:bg-night-800 rounded-xl p-4 shadow-sm">
              <ol v-if="guruPage?.pelatihan && guruPage.pelatihan.length" class="list-decimal list-inside">
                <li v-for="(item, index) in guruPage.pelatihan" :key="index">
                  <span class="font-bold">
                    {{ item.title }}
                  </span>- {{ item.tahun }}
                </li>
              </ol>
              <p v-else class="italic">
                -
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
