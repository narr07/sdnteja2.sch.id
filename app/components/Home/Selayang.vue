<script lang="ts" setup>
defineProps({
  image: {
    type: String,
    default: '/user.png',
  },
})
</script>

<template>
  <div class="py-8">
    <UContainer>
      <div class="py-8">
        <h1 data-aos="fade-up" class="text-5xl text-center md:text-6xl   font-bold ">
          Selayang Pandang
        </h1>
      </div>
      <!-- Testimonials -->
      <UCard data-aos="fade-up" variant="soft" class="rounded-4xl bg-night-200 dark:bg-night-900 py-8">
        <!-- Grid -->
        <div class="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center">
          <div class="hidden md:block mb-24 md:mb-0 sm:px-6">
            <div class="relative flex items-center justify-center">
              <NuxtImg class="rounded-[40px] h-96" :src="image" alt="Kepala Sekolah" />
            </div>
          </div>
          <!-- End Col -->

          <div>
            <!-- Blockquote -->
            <blockquote class="relative">
              <div class="relative z-10">
                <p class="text-xl font-medium italic text-balance  md:text-2xl md:leading-normal   xl:leading-normal">
                  <slot name="quote">
                    Kehadiran website sekolah ini merupakan salah satu upaya kita untuk meningkatkan layanan informasi dan komunikasi sekolah kepada seluruh stakeholders, termasuk siswa, guru, karyawan, orang tua siswa, alumni, dan masyarakat umum.
                  </slot>
                </p>
              </div>

              <footer class="mt-6">
                <div class="flex items-center">
                  <div class="md:hidden shrink-0">
                    <NuxtImg class="size-12 rounded-full object-cover" :src="image" alt="Kepala Sekolah" />
                  </div>
                  <div class="ms-4 md:ms-0">
                    <div class="text-base font-semibold text-red-500">
                      <slot name="nama">
                        Nama Kepala Sekolah
                      </slot>
                    </div>
                    <div class="text-xs ">
                      <slot name="jabatan">
                        Kepala Sekolah
                      </slot>
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
            <!-- End Blockquote -->
          </div>
          <!-- End Col -->
        </div>
        <!-- End Grid -->
      </UCard>
      <!-- End Testimonials -->
    </UContainer>
  </div>
</template>
