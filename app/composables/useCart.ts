import { useCartStore } from "~/store/cart"

export const useCart = () => {
  const cartStore = useCartStore()

//== load cart from localStorage on mounted ==//
  onMounted(() => {
    cartStore.loadFromStorage()
  })

  return {
    items: computed(() => cartStore.items),
    totalItems: computed(() => cartStore.totalItems),
    totalPrice: computed(() => cartStore.totalPrice),
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart
  }
}