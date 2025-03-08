<script lang="ts" setup>
interface ReferensiItem {
  title: string
  link: string
}

const props = withDefaults(defineProps<{
  referensi: ReferensiItem[]
}>(), {
  referensi: () => [
    {
      title: 'Alamat Web',
      link: '#',
    },
  ],
})
</script>

<template>
  <UContainer class="grid gap-4 mt-10  grid-cols-2 md:grid-cols-4  justify-center mx-auto">
    <div v-for="(item, index) in props.referensi" :key="index">
      <NuxtLink :to="`${item.link}?ref=SDNTEJA2`" target="_blank" class="group transition-colors ease-in-out duration-300   ">
        <UCard data-aos="fade-up" class="rounded-[40px]  h-full items-center justify-center flex bg-night-50 shadow-teja group-hover:bg-night-200 dark:group-hover:bg-night-700 transition-colors ease-in-out duration-300    dark:bg-night-900" variant="soft">
          <p class="text-center  font-bold">
            {{ item.title }}
          </p>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>
