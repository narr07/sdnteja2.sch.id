<script setup lang="ts">
interface AlumniItem {
  foto: string
  nama?: string
  job?: string
}

const props = withDefaults(defineProps<{
  alumni: AlumniItem[]
}>(), {
  alumni: () => [
    {
      foto: 'https://picsum.photos/468/468?random=1',
      nama: 'John Doe',
      job: 'Software Engineer',
    },
    {
      foto: 'https://picsum.photos/468/468?random=2',
      nama: 'Jane Smith',
      job: 'Product Manager',
    },
    {
      foto: 'https://picsum.photos/468/468?random=3',
      nama: 'Alice Johnson',
      job: 'UX Designer',
    },
    {
      foto: 'https://picsum.photos/468/468?random=4',
      nama: 'Bob Brown',
      job: 'Data Scientist',
    },
    {
      foto: 'https://picsum.photos/468/468?random=5',
      nama: 'Charlie Davis',
      job: 'Marketing Specialist',
    },
    {
      foto: 'https://picsum.photos/468/468?random=6',
      nama: 'Diana Evans',
      job: 'HR Manager',
    },
  ],
})
</script>

<template>
  <div class="py-8">
    <UContainer>
      <div class="py-8">
        <h2 data-aos="fade-up" class="text-5xl text-center md:text-6xl   font-bold ">
          Alumni
        </h2>
      </div>
      <UCard data-aos="fade-up" variant="soft" class="rounded-4xl bg-night-50 shadow-teja dark:bg-night-900 md:py-8">
        <UCarousel
          v-slot="{ item }"
          arrows
          :ui="{
            controls: 'absolute bottom-1/2 inset-x-10',
            item: 'md:basis-1/3',
          }"
          loop
          wheel-gestures
          :items="props.alumni"
          class="p-4"
        >
          <div class="flex flex-col items-center justify-center p-8">
            <NuxtImg :src="item.foto" width="234" height="234" class="rounded-4xl mb-4" />
            <h3 class="text-lg font-bold">
              {{ item.nama }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ item.job }}
            </p>
          </div>
        </UCarousel>
      </UCard>
    </UContainer>
  </div>
</template>
