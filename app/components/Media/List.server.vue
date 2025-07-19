<script setup lang="ts">
import { Motion } from 'motion-v'

// Pagination state
const itemsPerPage = 10
const route = useRoute()
const router = useRouter()

const currentPage = ref(Number(route.query.page) || 1)
// Update query parameter saat `currentPage` berubah
watch(currentPage, (newPage) => {
  router.replace({
    query: {
      ...route.query,
      page: newPage.toString(),
    },
  })
})

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

// Get unique pelajaran based on selected kelas
const uniquePelajaran = computed(() => {
  if (!mediaPage.value)
    return []

  let filteredByKelas = mediaPage.value
  if (selectedKelas.value !== 'All') {
    filteredByKelas = mediaPage.value.filter(media => media.kelas === selectedKelas.value)
  }

  console.warn('Selected Kelas:', selectedKelas.value)
  console.warn('Filtered by Kelas:', filteredByKelas)

  const pelajaranSet = new Set(filteredByKelas.map(media => media.pelajaran))
  const uniquePelajaranList = ['All', ...Array.from(pelajaranSet).sort()]

  console.warn('Unique Pelajaran:', uniquePelajaranList)
  return uniquePelajaranList
})

const selectedPelajaran = ref('All')

// Reset pelajaran filter when kelas changes
watch(selectedKelas, (newKelas, oldKelas) => {
  console.warn('Kelas changed from', oldKelas, 'to', newKelas)
  console.warn('Resetting pelajaran to All')
  selectedPelajaran.value = 'All'
})

// Watch pelajaran changes
watch(selectedPelajaran, (newPelajaran, oldPelajaran) => {
  console.warn('Pelajaran changed from', oldPelajaran, 'to', newPelajaran)
})

// Filtered media based on selected kelas and pelajaran
const filteredMedia = computed(() => {
  if (!mediaPage.value)
    return []

  let filtered = mediaPage.value

  console.warn('=== FILTERING START ===')
  console.warn('Selected Kelas:', selectedKelas.value)
  console.warn('Selected Pelajaran:', selectedPelajaran.value)
  console.warn('Total media:', mediaPage.value.length)

  // Filter by kelas
  if (selectedKelas.value !== 'All') {
    filtered = filtered.filter(media => media.kelas === selectedKelas.value)
    console.warn('After kelas filter:', filtered.length)
  }

  // Filter by pelajaran
  if (selectedPelajaran.value !== 'All') {
    filtered = filtered.filter(media => media.pelajaran === selectedPelajaran.value)
    console.warn('After pelajaran filter:', filtered.length)
  }

  console.warn('Final filtered result:', filtered)
  console.warn('=== FILTERING END ===')

  return filtered
})

const totalItems = computed(() => filteredMedia.value?.length ?? 0)

// Reset to page 1 when filters change
watch([selectedKelas, selectedPelajaran], () => {
  currentPage.value = 1
})

const paginatedMedia = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredMedia.value?.slice(start, end) ?? []
})
</script>

<template>
  <div class="py-20">
    <UContainer>
      <!-- Filter section -->
      <div class="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div class="flex flex-col gap-2">
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

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">
            Pilih Pelajaran:
          </h3>
          <USelect
            v-model="selectedPelajaran"
            :items="uniquePelajaran"
            placeholder="Select Subject"
            class="w-40"
            :disabled="selectedKelas === 'All'"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <Motion
          v-for="(media, index) in paginatedMedia"
          :key="media.idVideo"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * index }"
        >
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
        </Motion>
      </div>

      <div class="flex justify-center mt-8">
        <UPagination
          v-model:page="currentPage"
          show-edges
          :items-per-page="itemsPerPage"
          color="primary"
          :sibling-count="1"
          :total="totalItems"
          variant="soft"
        />
      </div>
    </UContainer>
  </div>
</template>
