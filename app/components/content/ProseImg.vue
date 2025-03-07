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
    default: '1200',
  },
  height: {
    type: [String, Number],
    default: '630',
  },
})

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
  <UModal

    :title="props.alt"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    :ui="{
      overlay: 'fixed bg-(--ui-bg-elevated)/50  backdrop-blur',
      content: 'fixed max-w-5xl mx-auto    rounded-2xl shadow-lg',
      header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-16',
      wrapper: '',
      body: 'flex-1 overflow-y-auto p-4 sm:p-6',
      footer: 'flex items-center gap-1.5 p-4 sm:px-6',
      title: 'text-(--ui-text-highlighted) font-semibold',
      description: 'mt-1 text-(--ui-text-muted) text-sm',
      close: 'absolute top-4 end-4',

    }"
  >
    <component
      :is="ImageComponent"
      :src="refinedSrc"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      class="rounded-4xl   w-full h-auto mx-auto"
      sizes="100vw sm:70vw md:500px"
      loading="lazy"
      :title="props.alt"
      :placeholder="img(`${refinedSrc}`, { h: 10, f: 'png', blur: 2, q: 50 })"
    />
    <template #body>
      <component
        :is="ImageComponent"
        :src="refinedSrc"
        :alt="props.alt"
        width="1920"
        height="1080"
        class="rounded-4xl h-auto w-full  mx-auto"
        sizes="100vw sm:70vw md:500px"
        loading="lazy"
        :title="props.alt"
        :placeholder="img(`${refinedSrc}`, { h: 10, f: 'png', blur: 2, q: 50 })"
      />
    </template>
  </UModal>
</template>
