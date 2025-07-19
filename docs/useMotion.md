# useMotion Composable

Composable untuk mengelola animasi Motion Vue dengan berbagai preset yang siap pakai.

## Import

```typescript
const { guruCardMotion, slideUpMotion, fadeInMotion } = useMotion()
```

## Functions

### `guruCardMotion(index: number)`
Preset animasi untuk card guru dengan efek slide up dan staggered delay.
- **Parameter**: `index` - urutan card untuk delay
- **Return**: Konfigurasi Motion dengan `whileInView` trigger

**Contoh Penggunaan:**
```vue
<Motion v-bind="guruCardMotion(0)">
  <UCard>...</UCard>
</Motion>
```

### `slideUpMotion(delay: number, distance: number)`
Animasi slide up dengan customizable delay dan jarak.
- **Parameter**: 
  - `delay` - delay animasi dalam detik
  - `distance` - jarak slide dalam pixel
- **Return**: Konfigurasi Motion dengan animate trigger

### `fadeInMotion(delay: number)`
Animasi fade in sederhana.
- **Parameter**: `delay` - delay animasi dalam detik
- **Return**: Konfigurasi Motion dengan animate trigger

### `createInViewMotion(index, baseDelay, initial, whileInView, transition)`
Membuat konfigurasi animasi custom dengan in-view trigger.

### `createStaggeredMotion(index, baseDelay, initial, animate, transition)`
Membuat konfigurasi animasi custom dengan staggered delay.

## Properties yang Digunakan

- `initial`: State awal element (sebelum animasi)
- `whileInView`: State saat element masuk viewport
- `animate`: State akhir animasi
- `transition`: Konfigurasi transisi (duration, delay, ease, dll)

## Contoh Implementasi Lengkap

```vue
<script setup>
const { guruCardMotion } = useMotion()
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <Motion v-bind="guruCardMotion(0)">
      <UCard>Card 1</UCard>
    </Motion>
    
    <Motion v-bind="guruCardMotion(1)">
      <UCard>Card 2</UCard>
    </Motion>
    
    <Motion v-bind="guruCardMotion(2)">
      <UCard>Card 3</UCard>
    </Motion>
  </div>
</template>
```

Setiap card akan muncul dengan delay berurutan (0ms, 100ms, 200ms) ketika masuk viewport.
