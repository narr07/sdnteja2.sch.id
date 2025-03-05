<script lang="ts" setup>

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
              <img class="rounded-[40px] h-96" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=500&h=600&q=80" alt="Avatar">
            </div>
          </div>
          <!-- End Col -->

          <div>
            <!-- Blockquote -->
            <blockquote class="relative">
              <div class="relative z-10">
                <p class="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3">
                  Featured client
                </p>

                <p class="text-xl font-medium italic text-gray-800 md:text-2xl md:leading-normal xl:text-3xl xl:leading-normal">
                  To say that switching to Preline has been life-changing is an understatement. My business has tripled and I got my life back.
                </p>
              </div>

              <footer class="mt-6">
                <div class="flex items-center">
                  <div class="md:hidden shrink-0">
                    <img class="size-12 rounded-full" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                  </div>
                  <div class="ms-4 md:ms-0">
                    <div class="text-base font-semibold text-gray-800">
                      Nicole Grazioso
                    </div>
                    <div class="text-xs text-gray-500">
                      Director Payments & Risk | Airbnb
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

<style scoped>

</style>
