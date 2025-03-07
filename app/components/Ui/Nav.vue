<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

function isActive(path: string): boolean {
  return route.path === path || (path !== '/' && route.path.startsWith(`${path}/`))
}

const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})
</script>

<template>
  <div class="bg-red-500 fixed z-50 top-0 w-full">
    <p class="text-xs text-center text-white  ">
      Website Masih dalam pengembangan
    </p>
  </div>
  <div class="fixed top-4 mx-auto w-full z-50">
    <UContainer>
      <div variant="subtle" class="rounded-4xl p-4 px-6 md:rounded-[40px] dark:bg-night-800/80 bg-slate-50/50 shadow backdrop-blur">
        <div class="flex justify-between items-center">
          <div>
            <NuxtLink to="/">
              <UiLogo />
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <nav>
              <div v-if="data" class="flex flex-row items-center space-x-4">
                <div v-for="item in data" :key="item.path">
                  <NuxtLink :to="item.path" :class="{ 'active-link': isActive(item.path) }">
                    {{ item.title }}
                  </NuxtLink>
                </div>
              </div>
            </nav>
            <!-- <UiSeacrh /> -->
            <UiColorMode />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.active-link {
  border-bottom: 2px solid red;
}
</style>
