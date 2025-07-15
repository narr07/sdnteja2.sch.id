// server/api/search.ts
export default eventHandler(async (event) => {
  const query = getQuery(event)
  const searchTerm = query.q as string || ''

  try {
    // Parallel fetch untuk performa yang lebih baik
    const [artikelData, beritaData, contentData, guruData, kegiatanData, mediaData] = await Promise.all([
      // Markdown collections menggunakan searchSections
      queryCollectionSearchSections(event, 'artikel', {
        ignoredTags: ['code'],
      }),
      queryCollectionSearchSections(event, 'berita', {
        ignoredTags: ['code'],
      }),
      queryCollectionSearchSections(event, 'content', {
        ignoredTags: ['code'],
      }),
      // YAML collections menggunakan queryCollection
      queryCollection(event, 'guru').all(),
      queryCollection(event, 'kegiatan').all(),
      queryCollection(event, 'media').all(),
    ])

    // Transform and combine results
    const searchResults = [
      ...(artikelData || []).map((item: any) => ({ ...item, type: 'artikel' })),
      ...(beritaData || []).map((item: any) => ({ ...item, type: 'berita' })),
      ...(contentData || []).map((item: any) => ({ ...item, type: 'content' })),
      // Transform YAML data to match search format
      ...(guruData || []).map((item: any) => ({
        id: item.path || item.id,
        title: item.nama || item.title,
        titles: [item.jabatan || '', item.kelas || ''].filter(Boolean),
        level: 1,
        content: `${item.nama || ''} ${item.lengkap || ''} ${item.catatan || ''} ${item.jabatan || ''} ${item.pendidikan || ''}`.trim(),
        type: 'guru',
      })),
      ...(kegiatanData || []).map((item: any) => ({
        id: item.path || item.id,
        title: item.title,
        titles: [item.tag || ''].filter(Boolean),
        level: 1,
        content: `${item.title || ''} ${item.description || ''} ${item.tag || ''}`.trim(),
        type: 'kegiatan',
      })),
      ...(mediaData || []).map((item: any) => ({
        id: item.path || item.id,
        title: item.title,
        titles: [item.kelas || '', item.pelajaran || ''].filter(Boolean),
        level: 1,
        content: `${item.title || ''} ${item.pelajaran || ''} Kelas ${item.kelas || ''}`.trim(),
        type: 'media',
      })),
    ]

    // Server-side filtering jika ada search term
    const filteredResults = searchTerm
      ? searchResults.filter((item: any) => {
          const searchLower = searchTerm.toLowerCase()
          return (
            item.title.toLowerCase().includes(searchLower)
            || item.content.toLowerCase().includes(searchLower)
            || (item.titles && item.titles.some((title: string) => title.toLowerCase().includes(searchLower)))
          )
        })
      : searchResults

    return {
      results: filteredResults,
      total: filteredResults.length,
      query: searchTerm,
    }
  }
  catch (error) {
    console.error('Search API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Search failed',
    })
  }
})
