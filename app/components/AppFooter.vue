<script setup>
const quickLinks = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about' },
  { text: 'Programs', href: '/programs' },
  { text: 'Facilities', href: '/facilities' },
  { text: 'Events', href: '/events' },
]

const resourceLinks = [
  { text: 'Academic Calendar', href: '/calendar' },
  { text: 'Student Portal', href: '/portal' },
  { text: 'Parent Resources', href: '/parents' },
  { text: 'News & Updates', href: '/news' },
  { text: 'FAQs', href: '/faqs' },
]
</script>

<template>
  <footer class="bg-gray-100 dark:bg-gray-800 pt-16 pb-8">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <div class="flex items-center mb-4">
            <UIcon name="i-heroicons-cube-transparent" class="text-primary mr-2 text-xl" />
            <h3 class="text-xl font-bold">
              SDN Teja 2
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Providing quality education since 1985, nurturing the leaders of tomorrow.
          </p>
          <div class="flex gap-4">
            <UButton icon="i-simple-icons-facebook" color="gray" variant="ghost" />
            <UButton icon="i-simple-icons-instagram" color="gray" variant="ghost" />
            <UButton icon="i-simple-icons-twitter" color="gray" variant="ghost" />
            <UButton icon="i-simple-icons-youtube" color="gray" variant="ghost" />
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.text">
              <NuxtLink :to="link.href" class="text-gray-600 dark:text-gray-400 hover:text-primary">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">
            Resources
          </h3>
          <ul class="space-y-2">
            <li v-for="link in resourceLinks" :key="link.text">
              <NuxtLink :to="link.href" class="text-gray-600 dark:text-gray-400 hover:text-primary">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">
            Contact Us
          </h3>
          <ul class="space-y-3">
            <li class="flex">
              <UIcon name="i-heroicons-map-pin" class="mr-2 text-primary" />
              <span class="text-gray-600 dark:text-gray-400">Jl. Teja 2 No. 123, Jakarta</span>
            </li>
            <li class="flex">
              <UIcon name="i-heroicons-phone" class="mr-2 text-primary" />
              <span class="text-gray-600 dark:text-gray-400">+62 21 1234 5678</span>
            </li>
            <li class="flex">
              <UIcon name="i-heroicons-envelope" class="mr-2 text-primary" />
              <span class="text-gray-600 dark:text-gray-400">info@sdnteja2.sch.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} SDN Teja 2. All rights reserved.
          </p>
          <div class="flex gap-4 mt-4 md:mt-0">
            <NuxtLink to="/privacy" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
              Privacy Policy
            </NuxtLink>
            <NuxtLink to="/terms" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
              Terms of Service
            </NuxtLink>
            <NuxtLink to="/sitemap" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
              Sitemap
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
