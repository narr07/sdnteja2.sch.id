<script lang="ts" setup>
const props = withDefaults(defineProps<{
  dataSiswa?: DataSiswa[]
}>(), {
  dataSiswa: () => [
    { tahun: '2021-2022', siswa: 96 },
  ],
})

const colorMode = useColorMode()

interface DataSiswa {
  tahun: string
  siswa: number
}

const JumlahSiswa = computed(() => ({
  siswa: {
    name: 'Siswa',
    color: '#3b82f6',
  },
}))

const xFormatter = (i: number): string => `${props.dataSiswa[i]?.tahun}`
const yFormatter = (i: number): string => `${i} siswa`

// Hitung jumlah ticks berdasarkan jumlah data
const xNumTicks = computed(() => Math.min(props.dataSiswa.length, 10)) // Maksimal 10 ticks
</script>

<template>
  <UContainer>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 ">
      <BarChart
        :key="colorMode.value"
        :data="dataSiswa"
        :height="300"
        :categories="JumlahSiswa"
        :y-axis="['siswa']"
        :x-num-ticks="xNumTicks"
        :radius="20"
        :y-grid-line="true"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :hide-legend="false"
      />
    </div>
  </UContainer>
</template>
