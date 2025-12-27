<template>
  <div class="min-h-screen bg-linear-to-r from-slate-50 to-blue-50">
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span class="text-white text-xl">🛍️</span>
          </div>
          <h1 class="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Product Catalog</h1>
        </div>
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

    <main class="max-w-7xl mx-auto px-4 py-10">
      <!== Hero Section ==>
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-3">Discover Amazing Products</h2>
        <p class="text-gray-500 text-lg">Find the perfect items for your needs</p>
      </div>

      <div v-if="pending" class="text-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-xl text-gray-600">Loading products...</p>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <div class="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <span class="text-4xl">😕</span>
        </div>
        <p class="text-xl text-red-600 font-medium">Error loading products</p>
        <p class="text-gray-500 mt-2">Please try again later</p>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <NuxtLink 
            v-for="product in productsData?.products" 
            :key="product.id"
            :to="`/products/${product.id}`"
            class="group bg-white rounded-sm shadow-md overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100 block"
          >
            <div class="relative overflow-hidden">
              <NuxtImg
                :src="product.image"
                :alt="product.name"
                class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-3 right-3">
                <span class="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  New
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{{ product.name }}</h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Rs.{{ product.price }}</span>
                </div>
                <div class="flex gap-2">
                  <button
                    @click.prevent="addToCart(product)"
                    class="bg-linear-to-r text-sm from-blue-600 to-indigo-600 cursor-pointer text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-1"
                  >
                    <span>Add To Cart</span>
                    <!-- <span>🛒</span> -->
                  </button>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!== Pagination ==>
        <div class="flex justify-center items-center gap-1 sm:gap-3 bg-white p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm w-fit mx-auto">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-2 sm:px-5 py-1.5 sm:py-2.5 bg-gray-100 cursor-pointer rounded-lg sm:rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors font-medium text-gray-700 text-xs sm:text-base"
          >
            ←<span class="hidden sm:inline"> Previous</span>
          </button>
          
          <div class="flex gap-1 sm:gap-2">
            <button
              v-for="page in productsData?.totalPages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-xs sm:text-base',
                page === currentPage
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 cursor-pointer'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === productsData?.totalPages"
            class="px-2 sm:px-5 py-1.5 sm:py-2.5 cursor-pointer bg-gray-100 rounded-lg sm:rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors font-medium text-gray-700 text-xs sm:text-base"
          >
            <span class="hidden sm:inline">Next </span>→
          </button>
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
const { getProducts } = useProduct()
const { addToCart, totalItems } = useCart()

const currentPage = ref(1)

const { data: productsData, pending, error } = await getProducts(currentPage, 6)

//== Change Page Function ==//
const changePage = (page: number) => {
  currentPage.value = page
}

//== SEO Meta Tags ==//
useHead({
  title: 'Product Catalog - Home',
  meta: [
    { name: 'description', content: 'Browse our amazing collection of products with great prices' }
  ]
})
</script>