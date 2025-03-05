<script lang="ts" setup>
defineProps({
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dyy24w5kl/image/upload/v1741192676/teja2_pasukan_s6jtrc.jpg',
  },
})
</script>

<template>
  <UContainer class="flex flex-col lg:flex-row gap-4">
    <div class="flex-1 flex flex-col gap-4">
      <div class="flex-1">
        <UCard data-aos="fade-up" variant="soft" class=" flex justify-evenly    flex-col h-full bg-red-500 dark:bg-night-700 text-white   rounded-4xl  ">
          <div>
            <p class="pb-6 ">
              <slot name="subtitle">
                Selamat Datang di Website Kami
              </slot>
            </p>
          </div>
          <div>
            <h1 class="font-bold text-[32px] md:text-[40px]  ">
              <slot name="title">
                SDN Teja II
              </slot>
            </h1>
          </div>
          <div class="flex flex-col mt-6 space-y-2">
            <div>
              <UBadge variant="soft" color="neutral">
                <slot name="npsn">
                  NPSN: 20246133
                </slot>
              </UBadge>
            </div>
            <div>
              <UBadge variant="soft" color="neutral">
                <slot name="nss">
                  NSS: 20246133
                </slot>
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
      <div class="flex-1">
        <UCard data-aos="fade-up" variant="soft" class=" bg-night-50 shadow-teja dark:bg-night-900 h-full text-night-900 dark:text-white flex items-center justify-center   rounded-4xl  ">
          <p class="py-6 text-balance">
            <slot name="description">
              Wujudkan Impian Pendidikan Berkualitas untuk Semua, Lingkungan Belajar yang Nyaman, Kreatif, dan Menyenangkan
            </slot>
          </p>
        </UCard>
      </div>
    </div>
    <div class="flex-2">
      <div data-aos="fade-up" variant="soft" class="var rounded-4xl aspect-video">
        <NuxtImg :src="image" alt="Cover Image" class="w-full h-full object-cover aspect-video rounded-4xl" />
      </div>
    </div>
  </UContainer>
</template>
