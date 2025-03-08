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
  type: 'artikel' | 'berita' // Tambahkan properti 'type' untuk kategori
}

const searchResults = ref<SearchResult[]>([])
const open = ref(false)
const value = ref({})

// Router untuk navigasi
const router = useRouter()

// Fungsi untuk mengambil data saat tombol ditekan
async function fetchDataOnSearch() {
  try {
    const response = await queryCollectionSearchSections('search', {
      ignoredTags: ['code'],
    })
    // Proses data yang diterima
    searchResults.value = (response || []).map((item: any) => {
      // Proses item sesuai kebutuhan
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
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Tombol pencarian
function handleSearch() {
  open.value = true // Buka modal
  fetchDataOnSearch() // Panggil fungsi untuk mengambil data
}

// Fungsi untuk menangani pemilihan item
function onSelect(item: any) {
  if (item.to) {
    router.push(item.to) // Navigasi ke halaman yang dimaksud
  }
  open.value = false // Tutup modal setelah navigasi
}

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
          ? 'solar:document-add-linear' // Ikon untuk artikel
          : 'solar:clipboard-linear', // Ikon untuk berita
        suffix: `${item.content.slice(0, 50)}...`,
        description: item.titles.join(' > '),
        to: `${item.id}`,
      })),
  },
])

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
    icon="solar:magnifer-linear"
    aria-label="Search"
    @click="handleSearch"
  />

  <!-- Modal Command Palette -->
  <UModal
    v-model:open="open"
    :ui="{
      content: 'rounded-2xl max-w-4xl h-auto mx-2 mx-auto overflow-y-auto',
      overlay: 'fixed bg-(--ui-bg-elevated)/50  backdrop-blur',
    }"
  >
    <template #content>
      <div class="flex justify-between mb-2">
        <UCommandPalette
          v-model="value"
          v-model:search-term="searchTerm"
          close
          placeholder="Cari Konten ..."
          :groups="groups"
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
        <!-- <UButton
          icon="i-heroicons-x-mark-20-solid"
          variant="link"
          @click="searchTerm = ''"
        /> -->
      </div>
    </template>
  </UModal>
</template>
