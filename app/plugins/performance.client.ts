// Plugin untuk optimasi loading dengan dynamic resource detection
export default defineNuxtPlugin(() => {
  if (!import.meta.client)
    return

  // Dynamic resource preloader functions
  const preloadFonts = () => {
    setTimeout(() => {
      const fontUrls = new Set<string>()

      // Scan stylesheets untuk font URLs
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          Array.from(sheet.cssRules || []).forEach((rule) => {
            const cssText = rule.cssText || ''
            const fontMatches = cssText.match(/url\(['"]?([^'"]+\.(woff2?|ttf|otf))['"]?\)/gi)
            if (fontMatches) {
              fontMatches.forEach((match) => {
                const url = match.match(/url\(['"]?([^'"]+)['"]?\)/i)?.[1]
                if (url)
                  fontUrls.add(url)
              })
            }
          })
        }
        catch {
          // Skip CORS-blocked stylesheets
        }
      })

      // Preload first 3 fonts
      Array.from(fontUrls).slice(0, 3).forEach((fontUrl) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = fontUrl
        link.as = 'font'
        link.type = fontUrl.includes('.woff2') ? 'font/woff2' : 'font/woff'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }, 100)
  }

  const preloadWasm = () => {
    const scripts = document.querySelectorAll('script')
    scripts.forEach((script) => {
      if (script.textContent?.includes('.wasm')) {
        const wasmMatches = script.textContent.match(/['"]([^'"]+\.wasm)['"]|`([^`]+\.wasm)`/g)
        if (wasmMatches) {
          wasmMatches.slice(0, 2).forEach((match) => {
            const wasmUrl = match.replace(/['")`]/g, '')
            if (wasmUrl.startsWith('/') || wasmUrl.startsWith('_nuxt/')) {
              const link = document.createElement('link')
              link.rel = 'preload'
              link.href = wasmUrl.startsWith('/') ? wasmUrl : `/${wasmUrl}`
              link.as = 'fetch'
              link.crossOrigin = 'anonymous'
              document.head.appendChild(link)
            }
          })
        }
      }
    })
  }

  // Execute preloading
  const executePreloading = () => {
    preloadFonts()
    preloadWasm()

    // Batch icon loading
    const iconRequests = [
      '/_nuxt_icon/heroicons.json?icons=chat-bubble-left-right',
      '/_nuxt_icon/solar.json?icons=sun-2-linear',
      '/_nuxt_icon/lucide.json?icons=check',
    ]

    setTimeout(() => {
      iconRequests.forEach((url) => {
        fetch(url).catch(() => {})
      })
    }, 1500)
  }

  // Execute after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executePreloading)
  }
  else {
    executePreloading()
  }
})
