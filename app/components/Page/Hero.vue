<script lang="ts" setup>

</script>

<template>
  <UContainer class="flex flex-col lg:flex-row gap-4">
    <div class="flex-1 flex flex-col gap-4">
      <div class="flex-1">
        <UCard variant="soft" class=" flex justify-evenly    flex-col h-full bg-red-500 dark:bg-night-700 text-white   rounded-4xl  ">
          <div>
            <p class="pb-6 ">
              Selamat Datang di Website Kami
            </p>
          </div>
          <div>
            <h1 class="text-[24px] md:text-[40px] font-bold ">
              SDN Teja II
            </h1>
          </div>
        </UCard>
      </div>
      <div class="flex-1">
        <UCard variant="soft" class="h-full bg-night-200 dark:bg-night-900 text-night-900   rounded-4xl  ">
          <p class="py-6">
            SDN Teja II adalah sekolah dasar yang berkomitmen untuk memberikan pendidikan berkualitas tinggi kepada siswa-siswinya. Dengan fasilitas yang lengkap dan tenaga pengajar yang berpengalaman, kami berusaha menciptakan lingkungan belajar yang kondusif dan menyenangkan. Bergabunglah dengan kami untuk masa depan yang lebih cerah.
          </p>
        </UCard>
      </div>
    </div>
    <div class="flex-2">
      <div variant="soft" class="var rounded-4xl h-[320px] md:h-[500px]">
        <img src="https://images.unsplash.com/photo-1610962381137-50ef93055125?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cover Image" class="w-full h-full object-cover rounded-4xl">
      </div>
    </div>
  </UContainer>
</template>
