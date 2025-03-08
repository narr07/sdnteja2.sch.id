<script setup lang="ts">
// Menggunakan referensi untuk pencarian dan status modal
const searchTerm = ref('')
interface SearchResult {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  type: 'artikel' | 'berita' // Tambahkan properti 'type' untuk kategori
}

const searchResults = ref<SearchResult[]>([])
const open = ref(false)
const value = ref({})

// Router untuk navigasi
const router = useRouter()

// Ambil data dari koleksi menggunakan useAsyncData
const { data: dataSearch } = await useAsyncData('seacrh', () => {
  return queryCollectionSearchSections('search', {
    ignoredTags: ['code'],
  })
})

// Perbarui hasil pencarian dengan menambahkan properti 'type'
searchResults.value = (dataSearch.value || []).map((item: any) => {
  let type: 'artikel' | 'berita'

  if (item.id?.includes('/artikel/')) {
    type = 'artikel'
  }
  else if (item.id?.includes('/berita/')) {
    type = 'berita'
  }
  else {
    type = 'berita' // Default ke berita jika tidak cocok
  }

  return { ...item, type }
})

// Grup hasil pencarian
const groups = computed(() => [
  {
    id: 'blog',
    label: searchTerm.value
      ? `Hasil pencarian untuk “${searchTerm.value}”...`
      : 'Semua Konten',
    items: searchResults.value
      .filter(item =>
        item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
        || item.content.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )
      .map(item => ({
        id: item.id,
        label: item.title,
        icon: item.type === 'artikel'
          ? 'i-lucide-file-text' // Ikon untuk artikel
          : 'i-lucide-home', // Ikon untuk berita
        suffix: `${item.content.slice(0, 50)}...`,
        description: item.titles.join(' > '),
        to: `${item.id}`,
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
      content: 'rounded max-w-4xl h-auto mx-2 mx-auto overflow-y-auto',
    }"

    close-icon="ph:x-square-duotone"
  >
    <template #content>
      <UCommandPalette
        v-model="value"
        v-model:search-term="searchTerm"
        :groups="groups"
        :ui="{
          root: 'flex flex-col min-h-0 min-w-0 divide-y divide-[var(--ui-border)]',
        }"
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
