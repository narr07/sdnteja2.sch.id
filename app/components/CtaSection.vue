<template>
  <section class="py-20">
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <UCard color="primary" class="overflow-hidden relative">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div class="relative z-10 text-center p-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Join Our School?
            </h2>
            <p class="text-white/90 mb-8 max-w-2xl mx-auto">
              Enrollments for the upcoming academic year are now open. Schedule a visit
              to our campus and discover the SDN Teja 2 difference for yourself.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <UButton color="neutral" size="lg">
                Book a Campus Tour
              </UButton>
              <UButton variant="outline" color="neutral" size="lg">
                Contact Admissions
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
