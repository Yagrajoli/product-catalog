<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <NuxtLink 
          to="/" 
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Continue Shopping
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
      <div v-if="items.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
        <NuxtLink 
          to="/" 
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Start Shopping
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in items" 
            :key="item.id"
            class="bg-white rounded-lg shadow p-4 flex gap-4"
          >
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-24 h-24 object-cover rounded"
            />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
              <p class="text-xl font-bold text-blue-600 mt-2">Rs.{{ item.price }}</p>
            </div>
            <div class="flex flex-col justify-between items-end">
              <button
                @click="removeFromCart(item.id)"
                class="text-red-600 cursor-pointer hover:text-red-700 text-sm"
              >
                Remove
              </button>
              <div class="flex items-center gap-2">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="bg-gray-200 cursor-pointer px-2 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span class="px-4 py-1 bg-gray-100 rounded">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="bg-gray-200 cursor-pointer px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Total Items:</span>
                <span class="font-semibold">{{ totalItems }}</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span class="text-blue-600">Rs.{{ totalPrice }}</span>
              </div>
            </div>
            <button
              class="w-full bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Proceed to Checkout
            </button>
            <button
              @click="clearCart"
              class="w-full mt-2 bg-red-100 cursor-pointer text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()

//== SEO Meta Tags ==//
useHead({
  title: 'Shopping Cart',
  meta: [
    { name: 'description', content: 'Review your shopping cart and proceed to checkout' }
  ]
})
</script>
