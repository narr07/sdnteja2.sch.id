# Optimasi Network Request Hierarchy - SDN Teja II

## Masalah Yang Ditemukan
Berdasarkan laporan PageSpeed Insights:
- **Network Request Hierarchy terlalu panjang**: 4.938ms
- **Bundle JavaScript besar**: 216KB+ (_nuxt/BCita3TF.js)
- **Multiple SQL dump requests**: 6 file sql_dump.txt dimuat berurutan
- **Icon requests berlebihan**: Multiple API calls untuk icon
- **Missing preconnect hints**: Tidak ada optimasi koneksi awal
- **WASM file besar**: sqlite3.wasm 387KB
- **⚠️ Hash filename yang berubah**: Font dan CSS files dengan hash yang berubah setiap build

## Solusi Yang Diimplementasikan

### 1. Resource Hints Optimization
```typescript
// nuxt.config.ts - app.head.link
{ rel: 'dns-prefetch', href: '//static.cloudflareinsights.com' },
{ rel: 'dns-prefetch', href: '//www.gstatic.com' },
{ rel: 'preconnect', href: 'https://static.cloudflareinsights.com', crossorigin: '' },
{ rel: 'preconnect', href: 'https://www.gstatic.com', crossorigin: '' },
```

### 2. Dynamic Resource Preloading
**Masalah**: Hash filename berubah setiap build (jV_khjKaJ.woff2, DpEzjGjP.css)
**Solusi**: Plugin client-side yang secara dinamis mendeteksi dan preload resource:

```typescript
// app/plugins/performance.client.ts
- Scan CSS stylesheets untuk font URLs
- Detect WASM files dari script content
- Batch icon loading dengan delay
- Execute setelah DOM ready
```

### 3. Bundle Splitting
```typescript
// REMOVED: Manual chunks menyebabkan error build
// rollupConfig.output.manualChunks - vue sudah di-externalize oleh Nuxt
// Nuxt v4 sudah mengoptimasi bundle splitting secara otomatis
```

### 4. Cache Headers Optimization
- Static assets: `31536000` (1 tahun) dengan `immutable`
- Images: `2592000` (1 bulan)
- WASM files: `2592000` (1 bulan) 
- SQL dumps: `86400` (1 hari)
- Icon JSON: `86400` (1 hari)

### 5. Icon Loading Optimization
- Pre-bundle critical icons di client bundle
- Delay loading non-critical icons hingga 1.5 detik
- Batch requests untuk mengurangi network calls

### 6. Font Loading Strategy
- **Removed static preload** untuk hash filenames
- **Dynamic font detection** dari CSS stylesheets
- **Google Fonts preconnect** untuk faster loading
- **Font-display: swap** untuk menghindari FOIT

## File Yang Dimodifikasi/Dibuat

### Modified Files:
- `nuxt.config.ts` - Konfigurasi utama optimasi (removed static font preload)
- `public/_headers` - Cache headers dengan WASM dan icon support
- `vercel.json` - Cache headers untuk Vercel

### New Files:
- `app/plugins/performance.client.ts` - Dynamic resource preloading

### Removed:
- Static font preload paths (karena hash berubah)
- Static CSS preload paths (karena hash berubah)

## Technical Approach untuk Hash Filenames

### Problem:
```typescript
// ❌ Ini akan rusak setiap build
href: '/_fonts/jV_khjKaJ.woff2'
href: '/_nuxt/entry.DpEzjGjP.css'
```

### Solution:
```typescript  
// ✅ Dynamic detection di client-side
const preloadFonts = () => {
  // Scan existing stylesheets for font URLs
  Array.from(document.styleSheets).forEach(sheet => {
    // Extract font URLs dari CSS rules
    // Preload dynamically discovered fonts
  })
}
```

## Expected Results

### Before Optimization:
- Network Hierarchy: 4.938ms
- Multiple SQL dump requests: 6 files
- Bundle size: 216KB+
- Icon requests: Multiple API calls
- No preconnect hints
- Broken preload untuk hash filenames

### After Optimization:
- ✅ Dynamic resource detection
- ✅ Reduced network waterfall dengan preconnect
- ✅ Longer cache TTL untuk static assets
- ✅ Auto bundle splitting by Nuxt v4 (removed manual config)
- ✅ Batched icon loading
- ✅ Adaptive preloading yang tidak rusak saat build

## Performance Monitoring
Untuk memantau performa setelah optimasi:
1. Test dengan PageSpeed Insights
2. Monitor Core Web Vitals
3. Check network waterfall di DevTools
4. Verify dynamic preloading di Network tab

## Key Learnings
- Hash filenames memerlukan dynamic detection approach
- Static preload dengan hash akan selalu rusak setiap build
- Client-side resource detection lebih reliable untuk hashed assets
- Batch loading lebih efisien daripada individual requests

## Troubleshooting

### Build Error: "vue" cannot be included in manualChunks
**Error**: 
```
"vue" cannot be included in manualChunks because it is resolved as an external module
```

**Cause**: Nuxt v4 sudah meng-externalize core Vue modules secara otomatis

**Solution**: 
- ❌ Remove manual chunk configuration untuk vue, @vue/runtime-core
- ✅ Let Nuxt handle bundle optimization automatically
- ✅ Manual chunks hanya untuk third-party packages yang tidak di-externalize

**Fixed**: Removed `rollupConfig.output.manualChunks` configuration
