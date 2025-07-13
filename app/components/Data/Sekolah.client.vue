<script lang="ts" setup>
const colorMode = useColorMode()

const DataSiswa = [
  { tahun: '2021-2022', siswa: 96 },
  { tahun: '2022-2023', siswa: 102 },
  { tahun: '2023-2024', siswa: 110 },
  { tahun: '2024-2025', siswa: 112 },
  { tahun: '2025-2026', siswa: 110 },
]

const JumlahSiswa = computed(() => ({
  siswa: {
    name: 'Siswa',
    color: '#3b82f6',
  },
}))

const xFormatter = (i: number): string => `${DataSiswa[i]?.tahun}`
const yFormatter = (i: number): string => `${i} siswa`
</script>

<template>
  <BarChart
    :key="colorMode.value"
    :data="DataSiswa"
    :height="300"
    :categories="JumlahSiswa"
    :y-axis="['siswa']"
    :x-num-ticks="5"
    :radius="20"
    :y-grid-line="true"
    :x-formatter="xFormatter"
    :y-formatter="yFormatter"
    :legend-position="LegendPosition.Top"
    :hide-legend="false"
  />
</template>
