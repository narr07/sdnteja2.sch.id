<template>
  <UContainer>
    <!-- ========== FOOTER ========== -->
    <footer class="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <!-- footer core -->
      <USeparator size="lg">
        <NuxtLink class="" to="/" aria-label="SDN Teja II">
          <UiLogo />
        </NuxtLink>
      </USeparator>
      <div class="pt-3 pb-8 ">
        <div class="sm:flex sm:justify-between sm:items-center">
          <div class="flex flex-wrap items-center gap-3">
            <!-- Language Dropdown -->
            <LanguageSelector />
          </div>
          <div class="flex flex-wrap justify-between items-center gap-3">
            <!-- Social Brands -->
            <div class="space-x-4">
              <NuxtLink to="#">
                <UTooltip text="Instagram" :delay-duration="0">
                  <UIcon class="size-6 hover:text-red-500" aria-label="Instagram" name="basil:instagram-outline" />
                </UTooltip>
              </NuxtLink>
            </div> <!-- End Social Brands -->
          </div> <!-- End Col -->
        </div>
      </div> <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-10">
        <div class="col-span-full hidden lg:col-span-1 lg:block">
          <p class="mt-3 text-xs sm:text-sm text-gray-600">
            © 2025 narr07. All rights reserved.
          </p>
        </div> <!-- End Col -->
        <div>
          <h4 class="text-xs font-semibold text-gray-900 uppercase">
            Teknologi
          </h4>
          <div class="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >About us</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Blog</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Careers</a> <span class="inline text-blue-600">— We're hiring</span>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Customers</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Newsroom</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Sitemap</a>
            </p>
          </div>
        </div> <!-- End Col -->
        <div>
          <h4 class="text-xs font-semibold text-gray-900 uppercase">
            Resources
          </h4>
          <div class="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Community</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Help & Support</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >eBook</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >What's New</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Status</a>
            </p>
          </div>
        </div> <!-- End Col -->
        <div>
          <h4 class="text-xs font-semibold text-gray-900 uppercase">
            Developers
          </h4>
          <div class="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Api</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Status</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >GitHub</a> <span class="inline text-blue-600">— New</span>
            </p>
          </div>
          <h4 class="mt-7 text-xs font-semibold text-gray-900 uppercase">
            Industries
          </h4>
          <div class="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Financial Services</a>
            </p>
            <p>
              <a
                class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
                href="#"
              >Education</a>
            </p>
          </div>
        </div> <!-- End Col -->
      </div> <!-- End Grid -->
    </footer> <!-- ========== END FOOTER ========== -->
  </UContainer>
</template>
