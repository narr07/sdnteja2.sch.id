<template>
  <UContainer>
    <!-- ========== FOOTER ========== -->
    <div class="bg-red-500 mb-10">
      <footer class="mt-auto w-full   py-8 px-4 sm:px-6 lg:px-8  ">
        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
          <div>
            <a class="flex-none text-xl font-semibold text-black focus:outline-hidden" href="#" aria-label="Brand">Brand</a>
          </div>

          <!-- Social Brands -->
          <div class=" space-x-2 justify-center items-center flex">
            <a class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
              <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
            </a>
          </div>

          <div class="flex justify-end">
            <LanguageSelector class="w-40" />
          </div>
        </div>
      <!-- End Grid -->
      </footer>
    </div>
    <!-- ========== END FOOTER ========== -->
  </UContainer>
</template>
