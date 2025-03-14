<script setup lang="ts">
const { data: mediaPage } = await useAsyncData('Medias', () => {
  return queryCollection('media')
    .select('idVideo', 'title', 'kelas', 'link', 'pelajaran')
    .order('kelas', 'DESC')
    .all()
})

const video = ref()

// Filter by kelas (class/grade)
const uniqueKelas = computed(() => {
  if (!mediaPage.value)
    return []
  // Extract unique kelas values
  const kelasSet = new Set(mediaPage.value.map(media => media.kelas))
  return ['All', ...Array.from(kelasSet).sort()]
})

const selectedKelas = ref('All')

// Filtered media based on selected kelas
const filteredMedia = computed(() => {
  if (!mediaPage.value)
    return []
  if (selectedKelas.value === 'All')
    return mediaPage.value
  return mediaPage.value.filter(media => media.kelas === selectedKelas.value)
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <!-- Filter section -->
      <div class="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
        <h3 class="font-bold text-lg">
          Pilih Kelas:
        </h3>
        <USelect
          v-model="selectedKelas"
          :items="uniqueKelas"
          placeholder="Select Class"
          class="w-24"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div v-for="media in filteredMedia" :key="media.idVideo">
          <div class="flex justify-center flex-col h-full ">
            <div class="p-4 ring rounded h-full dark:bg-night-900 ring-night-200 dark:ring-night-800 overflow-hidden shadow-lg">
              <ScriptYouTubePlayer ref="video" thumbnail-size="maxresdefault" :player-options="{ host: 'https://www.youtube.com' }" :video-id="media.idVideo">
                <template #awaitingLoad>
                  <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[48px] w-[68px]">
                    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00" /><path d="M 45,24 27,14 27,34" fill="#fff" /></svg>
                  </div>
                </template>
              </ScriptYouTubePlayer>
              <div class="flex justify-center mt-4 flex-col">
                <h2 class=" font-bold text-sm  ">
                  {{ media.pelajaran }} - {{ media.title }}
                </h2>
                <div class="flex justify-between items-center flex-row">
                  <UBadge block class="mt-2">
                    Kelas {{ media.kelas }}
                  </UBadge>
                  <UButton
                    :to="media.link"
                    target="_blank"
                    icon="solar:arrow-right-up-linear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
