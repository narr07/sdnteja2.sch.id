<script setup>
const isMenuOpen = ref(false)

const navLinks = [
  { text: 'Features', href: '#features' },
  { text: 'About', href: '#about' },
  { text: 'Testimonials', href: '#testimonials' },
  { text: 'Contact', href: '#contact' },
]
</script>

<template>
  <UContainer class="py-4">
    <nav class="flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink to="/" class="text-xl font-bold">
          <UIcon name="i-heroicons-cube-transparent" class="text-primary mr-2" />
          SDN Teja 2
        </NuxtLink>
      </div>

      <div class="hidden md:flex items-center gap-6">
        <NuxtLink
          v-for="link in navLinks" :key="link.text" :to="link.href"
          class="text-sm text-gray-600 hover:text-primary transition-colors"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <UButton variant="ghost" color="gray" to="/login">
          Login
        </UButton>
        <UButton to="/register" color="primary">
          Get Started
        </UButton>
        <UButton icon="i-heroicons-bars-3" variant="ghost" class="md:hidden" @click="isMenuOpen = !isMenuOpen" />
      </div>
    </nav>

    <!-- Mobile menu -->
    <UCollapse :model-value="isMenuOpen" class="md:hidden mt-4">
      <div class="flex flex-col gap-2 py-4">
        <NuxtLink
          v-for="link in navLinks" :key="link.text" :to="link.href"
          class="text-sm py-2 text-gray-600 hover:text-primary transition-colors"
        >
          {{ link.text }}
        </NuxtLink>
      </div>
    </UCollapse>
  </UContainer>
</template>
