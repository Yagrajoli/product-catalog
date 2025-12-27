<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 class="text-3xl font-bold text-gray-900 mb-6 text-center">Login Required</h1>
      <p class="text-gray-600 mb-6 text-center">Please login to access the cart</p>
      <NuxtLink 
        to="/"
        class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Login',
  meta: [
    { name: 'description', content: 'Login to access your cart' }
  ]
})
</script>