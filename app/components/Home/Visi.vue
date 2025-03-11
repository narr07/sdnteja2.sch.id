<script lang="ts" setup>
defineProps({
  image: {
    type: String,
    default: '/user.png',
  },
})
</script>

<template>
  <div class="bg-red-500 dark:bg-night-900 pt-20 pb-28 mt-12 ">
    <UContainer class=" ">
      <div>
        <div class="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center">
          <div class="md:sticky md:top-22 md:self-start">
            <!-- Blockquote -->
            <blockquote class="relative">
              <div class="relative z-10">
                <p class="text-xl font-medium italic text-balance  md:text-2xl md:leading-normal   xl:leading-normal  text-white">
                  <slot name="quote">
                    Kehadiran website sekolah ini merupakan salah satu upaya kita untuk meningkatkan layanan informasi dan komunikasi sekolah kepada seluruh stakeholders, termasuk siswa, guru, karyawan, orang tua siswa, alumni, dan masyarakat umum.
                  </slot>
                </p>
              </div>

              <footer class="mt-6">
                <div class="flex items-center">
                  <div class=" shrink-0">
                    <NuxtImg
                      format="webp"
                      quality="70"
                      title="Kepala Sekolah"
                      class="size-12 rounded-full object-cover" :src="image" alt="Kepala Sekolah"
                    />
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
          <div class=" flex flex-col space-y-4">
            <div class="py-8">
              <h2 data-aos="fade-up" class="text-5xl text-center md:text-6xl text-white font-extrabold ">
                Visi, Misi, dan Tujuan
              </h2>
            </div>
            <UCard data-aos="fade-up" variant="soft" class="justify-evenly    flex-col h-full bg-night-50 text-night-700  dark:bg-night-950 dark:text-white   rounded-4xl  ">
              <div>
                <h2 class="text-5xl md:text-6xl pb-4 font-bold">
                  Visi
                </h2>
              </div>
              <div>
                <p class="  ">
                  Terwujudnya pribadi yang beriman dan bertakwa kepada Tuhan Tang Maha Esa, berilmu, berkarakter, terampil, kreatif dan berprestasi
                </p>
              </div>
            </UCard>
            <UCard data-aos-delay="100" data-aos="fade-up" variant="soft" class="justify-evenly    flex-col h-full bg-night-50 text-night-700  dark:bg-night-950 dark:text-white   rounded-4xl  ">
              <div>
                <h2 class="text-5xl md:text-6xl pb-4 font-bold ">
                  Misi
                </h2>
              </div>
              <div>
                <ol class="pb-6 list-decimal ml-6">
                  <li>Menciptakan lingkungan sekolah yang bernuansa agamis, bersih dan sehat</li>
                  <li>Meningkatkan kegiatan ibadah melalui kegiatan kultum dan Shalat berjamaah</li>
                  <li>Mengoptimalkan guru profesional dan berdedikasi tinggi sehingga peserta didik mempunyai kompetensi yang baik dan berkarakter</li>
                  <li>Menyelenggarakan pendidikan, pelatihan dan pembinaan berdasarkan bakat, minat dan kreativitas peserta didik melalui ekstrakurikuler</li>
                  <li>Meningkatkan prestasi peserta didik dengan mengoptimalkan proses pembelajaran yang efektif dan efisien</li>
                </ol>
              </div>
            </UCard>
            <UCard data-aos-delay="200" data-aos="fade-up" variant="soft" class="justify-evenly    flex-col h-full bg-night-50 text-night-700  dark:bg-night-950 dark:text-white   rounded-4xl  ">
              <div>
                <h2 class="text-5xl md:text-6xl pb-4 font-bold ">
                  Tujuan
                </h2>
              </div>
              <div>
                <ol class="pb-6 list-decimal ml-6">
                  <li>Terciptanya lingkungan yang agamis, bersih dan sehat</li>
                  <li>Meningkatnya ketakwaan peserta didik terhadap Tuhan Yang Maha Esa</li>
                  <li>Berkembangnya profesionalisme tenaga pendidik</li>
                  <li>Terbentuknya pribadi peserta didik yang cerdas, terampil, kreatif, aktif dan berkarakter</li>
                  <li>Meningkatnya jumlah peserta didik yang melanjutkan pendidikan ke jenjang yang lebih tinggi</li>
                </ol>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
