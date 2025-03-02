<script setup lang="ts">
const items = [
  {
    src: 'https://picsum.photos/468/468?random=1',
    name: 'John Doe',
    job: 'Software Engineer',
    message: 'Congratulations on your graduation!',
  },
  {
    src: 'https://picsum.photos/468/468?random=2',
    name: 'Jane Smith',
    job: 'Product Manager',
    message: 'Wishing you all the best for your future!',
  },
  {
    src: 'https://picsum.photos/468/468?random=3',
    name: 'Alice Johnson',
    job: 'UX Designer',
    message: 'Keep up the great work!',
  },
  {
    src: 'https://picsum.photos/468/468?random=4',
    name: 'Bob Brown',
    job: 'Data Scientist',
    message: 'Proud of your achievements!',
  },
  {
    src: 'https://picsum.photos/468/468?random=5',
    name: 'Charlie Davis',
    job: 'Marketing Specialist',
    message: 'You did it!',
  },
  {
    src: 'https://picsum.photos/468/468?random=6',
    name: 'Diana Evans',
    job: 'HR Manager',
    message: 'Best of luck in your career!',
  },
]
</script>

<template>
  <UContainer>
    <UCard>
      <UCarousel
        v-slot="{ item }"
        loop
        wheel-gestures
        :items="items"
        :ui="{ item: 'basis-1/3' }"
        class="p-4"
      >
        <div class="flex flex-col items-center justify-center p-8">
          <NuxtImg :src="item.src" width="234" height="234" class="rounded-lg mb-4" />
          <h3 class="text-lg font-bold">
            {{ item.name }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ item.job }}
          </p>
          <p class="text-sm mt-2">
            {{ item.message }}
          </p>
        </div>
      </UCarousel>
    </UCard>
  </UContainer>
</template>
