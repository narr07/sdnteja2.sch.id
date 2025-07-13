<script setup lang="ts">
import ImageComponent from '#build/mdc-image-component.mjs'
import { computed, useRuntimeConfig } from '#imports'
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: 'Gambar Artikel',
  },
  width: {
    type: [String, Number],
    default: '800',
  },
  height: {
    type: [String, Number],
    default: '450',
  },
})
const open = ref(false)
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

const img = useImage()
</script>

<template>
  <component
    :is="ImageComponent"
    :src="refinedSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    class="rounded-4xl cursor-zoom-in w-full h-auto mx-auto"
    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 800px"
    loading="lazy"
    format="webp"
    quality="80"
    densities="1x 2x"
    :title="props.alt"
    :placeholder="img(refinedSrc, { h: 20, w: 35, f: 'webp', blur: 5, q: 10 })"
    @click="open = true"
  />
</template>
