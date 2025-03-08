<script setup lang="ts">
// Menggunakan referensi untuk pencarian dan status modal

// Data untuk istilah pencarian, hasil pencarian, dan status modal
const searchTerm = ref('')
interface SearchResult {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
}

const searchResults = ref<SearchResult[]>([])
const open = ref(false)
const value = ref({})

// Router untuk navigasi
const router = useRouter()

// Ambil data dari koleksi menggunakan useAsyncData
const { data: search } = await useAsyncData('search', () =>
  queryCollectionSearchSections('search'))

// Perbarui hasil pencarian
searchResults.value = search.value || []

// Grup hasil pencarian
const groups = computed(() => [
  {
    id: 'blog',
    label: searchTerm.value
      ? `Hasil pencarian untuk “${searchTerm.value}”...`
      : 'Semua Blog',
    items: searchResults.value
      .filter(item =>
        item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
        || item.content.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )
      .map(item => ({
        id: item.id,
        label: item.title,
        suffix: `${item.content.slice(0, 50)}...`,
        description: item.titles.join(' > '),
        to: `/detail/${item.id}`,
      })),
  },
])

// Fungsi untuk menangani pemilihan item
function onSelect(item: any) {
  if (item.to) {
    router.push(item.to) // Navigasi ke halaman yang dimaksud
  }
  open.value = false // Tutup modal setelah navigasi
}

// Shortcut keyboard untuk membuka modal pencarian
defineShortcuts({
  meta_k: () => {
    open.value = !open.value
  },
})
</script>

<template>
  <!-- Tombol untuk membuka modal -->
  <UButton
    square
    icon="hugeicons:search-02"
    aria-label="Search"
    @click="open = true"
  />

  <!-- Modal Command Palette -->
  <UModal
    v-model:open="open"
    :ui="{
      content: 'rounded max-w-[calc(100%-1rem)] h-80 sm:h-auto sm:max-h-[calc(100vh-4rem)] mx-2 mx-auto overflow-y-auto',
    }"
    close-icon="ph:x-square-duotone"
  >
    <template #content>
      <UCommandPalette
        v-model="value"
        v-model:search-term="searchTerm"
        :groups="groups"
        :fuse="{
          resultLimit: 10,
          matchAllWhenSearchEmpty: true,
          fuseOptions: { includeMatches: true },
        }"
        @update:model-value="onSelect"
      />
    </template>
  </UModal>
</template>
