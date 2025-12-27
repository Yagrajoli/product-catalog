<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!== Header ==>
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors group">
          <span class="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Products
        </NuxtLink>
        <NuxtLink 
          to="/cart" 
          class="relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 font-medium"
        >
          🛒 Cart
          <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
            {{ totalItems }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-12">
      <!== Loading State ==>
      <div v-if="pending" class="text-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-xl text-gray-600">Loading product...</p>
      </div>

      <!== Error State ==>
      <div v-else-if="error" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <span class="text-5xl">😕</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p class="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
        >
          ← Browse Products
        </NuxtLink>
      </div>

      <!== Product Details ==>
      <div v-else-if="product" class="bg-white rounded-xl  overflow-hidden border border-gray-100">
        <div class="grid lg:grid-cols-2 gap-0">
          <!-- Image Section -->
          <div class="relative bg-linear-to-br from-gray-100 to-gray-50 p-8 lg:p-12 flex items-center justify-center">
            <div class="absolute top-6 left-6">
              <span class="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                ✨ Featured
              </span>
            </div>
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              class="w-full max-w-md rounded shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <!== Details Section ==>
          <div class="p-8 lg:p-12 flex flex-col justify-center">
            <div class="mb-4">
              <span class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">In Stock</span>
            </div>
            
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
            
            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Rs.{{ product.price }}
              </span>
              <span class="text-lg text-gray-400 line-through">Rs.{{ Math.round(product.price * 1.2) }}</span>
              <span class="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">20% OFF</span>
            </div>

            <div class="border-t border-gray-100 pt-6 mb-6">
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Description</h3>
              <p class="text-gray-600 text-lg leading-relaxed">{{ product.description }}</p>
            </div>

            <!== Features ==>
            <div class="grid grid-cols-3 gap-4 mb-8">
              <div class="text-center p-4 bg-gray-50 rounded-xl">
                <span class="text-2xl mb-2 block">🚚</span>
                <span class="text-xs text-gray-600 font-medium">Free Delivery</span>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-xl">
                <span class="text-2xl mb-2 block">🔄</span>
                <span class="text-xs text-gray-600 font-medium">Easy Returns</span>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-xl">
                <span class="text-2xl mb-2 block">✅</span>
                <span class="text-xs text-gray-600 font-medium">Warranty</span>
              </div>
            </div>
            
            <!== Action Buttons ==>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                @click="addToCart(product)"
                class="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 cursor-pointer text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base font-semibold"
              >
                 Add to Cart
              </button>
              <button
                @click="addToCart(product); navigateTo('/cart')"
                class="flex-1 bg-gray-900 cursor-pointer text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base font-semibold"
              >
             Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!== Footer ==>
    <footer class="mt-16 py-8 bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 text-center text-gray-500">
        <p>© 2025 Product Catalog. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProductById } = useProduct()
const { addToCart, totalItems } = useCart()

const productId = parseInt(route.params.id as string)

const { data: product, pending, error } = await getProductById(productId)

//== SEO Meta Tags ==//
useHead({
  title: () => product.value ? `${product.value.name} - Product Details` : 'Product Details',
  meta: [
    { name: 'description', content: () => product.value?.description || 'Product details' }
  ]
})
</script>