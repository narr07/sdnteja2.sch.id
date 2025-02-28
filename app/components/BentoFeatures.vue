<template>
  <section id="features" class="py-20 bg-gray-50 dark:bg-gray-800">
    <UContainer>
      <div class="text-center mb-16">
        <UBadge color="primary" variant="soft" class="mb-4">
          Our Features
        </UBadge>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Why Choose SDN Teja 2
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the many benefits our school offers to help your child excel
          academically and develop important life skills.
        </p>
      </div>

      <!-- Bentozone Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Main Feature Card -->
        <UCard
          class="md:col-span-2 md:row-span-2 relative overflow-hidden"
          :ui="{ ring: '', body: { padding: 'p-8' } }"
        >
          <div class="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div class="relative z-10">
            <UIcon name="i-heroicons-academic-cap" class="text-4xl text-primary mb-4" />
            <h3 class="text-2xl font-bold mb-4">
              Excellence in Education
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Our curriculum is designed to challenge and inspire students, fostering critical thinking
              and problem-solving skills essential for their future success.
            </p>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800"
              alt="Classroom" class="w-full h-64 object-cover rounded-xl mt-4"
            >
          </div>
        </UCard>

        <!-- Smaller Feature Cards -->
        <UCard :ui="{ ring: '', body: { padding: 'p-6' } }">
          <UIcon name="i-heroicons-user-group" class="text-2xl text-blue-500 mb-3" />
          <h3 class="text-xl font-bold mb-2">
            Dedicated Teachers
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Our passionate educators provide personalized attention to help each student reach their full potential.
          </p>
        </UCard>

        <UCard :ui="{ ring: '', body: { padding: 'p-6' } }">
          <UIcon name="i-heroicons-beaker" class="text-2xl text-green-500 mb-3" />
          <h3 class="text-xl font-bold mb-2">
            Modern Facilities
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            State-of-the-art classrooms, science labs, and sports facilities to enhance the learning experience.
          </p>
        </UCard>

        <UCard :ui="{ ring: '', body: { padding: 'p-6' } }">
          <UIcon name="i-heroicons-chart-bar" class="text-2xl text-purple-500 mb-3" />
          <h3 class="text-xl font-bold mb-2">
            Academic Excellence
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Consistently achieving outstanding results with structured learning pathways.
          </p>
        </UCard>

        <UCard :ui="{ ring: '', body: { padding: 'p-6' } }">
          <UIcon name="i-heroicons-globe-alt" class="text-2xl text-orange-500 mb-3" />
          <h3 class="text-xl font-bold mb-2">
            Extracurricular Activities
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Diverse range of activities that develop talents and build character beyond academics.
          </p>
        </UCard>

        <!-- Testimonial Card -->
        <UCard class="md:col-span-3 bg-primary/5" :ui="{ ring: '', body: { padding: 'p-8' } }">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <UAvatar src="https://i.pravatar.cc/300" size="xl" />
            <div>
              <div class="flex mb-4">
                <UIcon v-for="i in 5" :key="i" name="i-heroicons-star" class="text-yellow-400" />
              </div>
              <p class="text-lg italic mb-4">
                "Sending my child to SDN Teja 2 was one of the best decisions we've made. The teachers are incredibly supportive,
                and the school provides a nurturing environment for learning and growth."
              </p>
              <div class="font-bold">
                Sarah Johnson
              </div>
              <div class="text-sm text-gray-600">
                Parent of a Grade 4 Student
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
