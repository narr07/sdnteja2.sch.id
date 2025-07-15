// app/components/Ui/SearchButton.vue
<script setup lang="ts">
// Menggunakan referensi untuk pencarian dan status modal
const searchTerm = ref('')

interface SearchResult {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  type: 'artikel' | 'berita' | 'guru' | 'kegiatan' | 'content' | 'media'
}

const searchResults = ref<SearchResult[]>([])
const open = ref(false)
const value = ref({})
const isLoading = ref(false)

// Router untuk navigasi
const router = useRouter()

// Fetch initial data (semua konten) dari server API
const initialData = await $fetch<{
  results: SearchResult[]
  total: number
  query: string
}>('/api/search')

// Set initial results
searchResults.value = initialData?.results || []

// Reactive search function dengan debounce manual
let searchTimeout: NodeJS.Timeout | null = null

function debouncedSearch(term: string) {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(async () => {
    if (!term || term.length < 2) {
      // Jika tidak ada search term, gunakan data awal
      const response = await $fetch<{
        results: SearchResult[]
        total: number
        query: string
      }>('/api/search')
      searchResults.value = response?.results || []
      return
    }

    isLoading.value = true
    try {
      const response = await $fetch<{
        results: SearchResult[]
        total: number
        query: string
      }>('/api/search', {
        query: { q: term },
      })
      searchResults.value = response?.results || []
    }
    catch (error) {
      console.error('Search failed:', error)
      searchResults.value = []
    }
    finally {
      isLoading.value = false
    }
  }, 300) // 300ms debounce
}

// Watch search term changes
watch(searchTerm, (newTerm) => {
  debouncedSearch(newTerm)
})

// Fungsi untuk menangani pemilihan item
function onSelect(item: any) {
  if (item.to) {
    router.push(item.to) // Navigasi ke halaman yang dimaksud
  }
  open.value = false // Tutup modal setelah navigasi
}

// Grup hasil pencarian dengan kategori yang terpisah untuk UX yang lebih baik
const groups = computed(() => {
  // Data sudah di-filter di server, langsung gunakan saja
  const filteredResults = searchResults.value

  // Grup berdasarkan tipe content
  const groupedByType = filteredResults.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = []
    }
    acc[item.type]!.push(item)
    return acc
  }, {} as Record<string, SearchResult[]>)

  // Buat grup untuk setiap tipe yang memiliki hasil
  const groups: Array<{
    id: string
    label: string
    items: Array<{
      id: string
      label: string
      icon: string
      suffix: string
      description: string
      to: string
    }>
  }> = []

  Object.entries(groupedByType).forEach(([type, items]) => {
    if (items.length > 0) {
      groups.push({
        id: type,
        label: `${getTypeLabel(type)} (${items.length})`,
        items: items.map(item => ({
          id: item.id,
          label: item.title,
          icon: getIconByType(item.type),
          suffix: `${item.content.slice(0, 40)}...`,
          description: item.titles.join(' > '),
          to: cleanPath(item.id),
        })),
      })
    }
  })

  // Jika tidak ada pencarian, tampilkan semua dalam satu grup
  if (!searchTerm.value) {
    return [{
      id: 'all-content',
      label: 'Semua Konten',
      items: filteredResults.map(item => ({
        id: item.id,
        label: item.title,
        icon: getIconByType(item.type),
        suffix: getTypeLabel(item.type),
        description: item.titles.join(' > '),
        to: cleanPath(item.id),
      })),
    }]
  }

  return groups
})

// Helper function untuk membersihkan URL path
function cleanPath(path: string): string {
  if (!path)
    return '/'

  // Hapus extension file (.yml, .md)
  let cleanedPath = path.replace(/\.(yml|yaml|md)$/, '')

  // Hapus numeric prefix (0., 1., 2., dll) untuk clean URL
  cleanedPath = cleanedPath.replace(/\/\d+\./, '/')

  // Pastikan path dimulai dengan / jika belum ada
  if (!cleanedPath.startsWith('/')) {
    cleanedPath = `/${cleanedPath}`
  }

  return cleanedPath
}

// Helper function untuk mendapatkan icon berdasarkan tipe
function getIconByType(type: string) {
  switch (type) {
    case 'artikel':
      return 'solar:document-add-linear'
    case 'berita':
      return 'solar:clipboard-linear'
    case 'guru':
      return 'solar:user-linear'
    case 'kegiatan':
      return 'solar:gallery-wide-linear'
    case 'content':
      return 'solar:home-angle-linear'
    case 'media':
      return 'solar:video-frame-play-horizontal-linear'
    default:
      return 'i-lucide-file'
  }
}

// Helper function untuk mendapatkan label berdasarkan tipe
function getTypeLabel(type: string) {
  switch (type) {
    case 'artikel':
      return '📝 Artikel'
    case 'berita':
      return '📰 Berita'
    case 'guru':
      return '👨‍🏫 Guru'
    case 'kegiatan':
      return '🎯 Kegiatan'
    case 'content':
      return '🏠 Halaman'
    case 'media':
      return '🎥 Media'
    default:
      return '📄 Konten'
  }
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
      content: 'rounded-2xl max-w-4xl h-auto mx-2 mx-auto overflow-y-auto',
      overlay: 'fixed bg-(--ui-bg-elevated)/50  backdrop-blur',
    }"
    close-icon="ph:x-square-duotone"
  >
    <template #content>
      <div class="flex justify-between mb-2">
        <UCommandPalette
          v-model="value"
          v-model:search-term="searchTerm"
          close
          placeholder="Cari Konten ..."
          :groups="groups"
          :loading="isLoading"
          :ui="{
            item: 'hover:bg-red-300 dark:hover:bg-red-700 rounded focus:bg-red-300',
            root: 'flex flex-col min-h-0 w-full  min-w-0 divide-y divide-[var(--ui-border)]',
          }"
          :fuse="{
            resultLimit: 10,
            matchAllWhenSearchEmpty: true,
            fuseOptions: { includeMatches: true },
          }"
          @update:open="open = $event"
          @update:model-value="onSelect"
        />
      </div>
    </template>
  </UModal>
</template>
