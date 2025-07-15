// server/api/search/[collection].ts

interface SearchResultItem {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  type: string
}

export default eventHandler(async (event) => {
  const collection = getRouterParam(event, 'collection')
  const query = getQuery(event)
  const searchTerm = query.q as string || ''
  const limit = Number.parseInt(query.limit as string) || 10
  const page = Number.parseInt(query.page as string) || 1

  // Validasi collection yang diizinkan
  const allowedCollections = ['artikel', 'berita', 'guru', 'kegiatan', 'content', 'media'] as const
  type AllowedCollection = typeof allowedCollections[number]

  if (!collection || !allowedCollections.includes(collection as AllowedCollection)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid collection',
    })
  }

  try {
    let results: SearchResultItem[] = []

    // Search berdasarkan collection type
    if (['artikel', 'berita', 'content'].includes(collection)) {
      // Markdown collections - cast collection to valid type
      const searchSections = await queryCollectionSearchSections(event, collection as 'artikel' | 'berita' | 'content', {
        ignoredTags: ['code'],
      })
      results = searchSections.map(item => ({
        ...item,
        type: collection,
      }))
    }
    else {
      // YAML collections - cast collection to valid type
      const allItems = await queryCollection(event, collection as 'guru' | 'kegiatan' | 'media').all()

      // Transform berdasarkan collection
      if (collection === 'guru') {
        results = allItems.map((item: unknown) => {
          const guruItem = item as {
            path?: string
            id?: string
            nama?: string
            title?: string
            jabatan?: string
            kelas?: string
            lengkap?: string
            catatan?: string
            pendidikan?: string
          }
          return {
            id: guruItem.path || guruItem.id || '',
            title: guruItem.nama || guruItem.title || '',
            titles: [guruItem.jabatan || '', guruItem.kelas || ''].filter(Boolean),
            level: 1,
            content: `${guruItem.nama || ''} ${guruItem.lengkap || ''} ${guruItem.catatan || ''} ${guruItem.jabatan || ''} ${guruItem.pendidikan || ''}`.trim(),
            type: 'guru',
          }
        })
      }
      else if (collection === 'kegiatan') {
        results = allItems.map((item: unknown) => {
          const kegiatanItem = item as {
            path?: string
            id?: string
            title?: string
            description?: string
            tag?: string
          }
          return {
            id: kegiatanItem.path || kegiatanItem.id || '',
            title: kegiatanItem.title || '',
            titles: [kegiatanItem.tag || ''].filter(Boolean),
            level: 1,
            content: `${kegiatanItem.title || ''} ${kegiatanItem.description || ''} ${kegiatanItem.tag || ''}`.trim(),
            type: 'kegiatan',
          }
        })
      }
      else if (collection === 'media') {
        results = allItems.map((item: unknown) => {
          const mediaItem = item as {
            path?: string
            id?: string
            title?: string
            kelas?: string
            pelajaran?: string
          }
          return {
            id: mediaItem.path || mediaItem.id || '',
            title: mediaItem.title || '',
            titles: [mediaItem.kelas || '', mediaItem.pelajaran || ''].filter(Boolean),
            level: 1,
            content: `${mediaItem.title || ''} ${mediaItem.pelajaran || ''} Kelas ${mediaItem.kelas || ''}`.trim(),
            type: 'media',
          }
        })
      }
    }

    // Filter berdasarkan search term
    const filteredResults = searchTerm
      ? results.filter((item: SearchResultItem) => {
          const searchLower = searchTerm.toLowerCase()
          return (
            item.title.toLowerCase().includes(searchLower)
            || item.content.toLowerCase().includes(searchLower)
            || item.titles?.some((title: string) => title.toLowerCase().includes(searchLower))
          )
        })
      : results

    // Pagination
    const total = filteredResults.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = filteredResults.slice(startIndex, endIndex)

    return {
      collection,
      results: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: endIndex < total,
        hasPrev: page > 1,
      },
      query: searchTerm,
    }
  }
  catch (error) {
    console.error(`Search API Error for ${collection}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Search in ${collection} failed`,
    })
  }
})
