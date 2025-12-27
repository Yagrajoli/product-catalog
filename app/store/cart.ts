import { defineStore } from "pinia";

//== define cartStorage ==//
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as Array<{
      id: number;
      name: string;
      price: number;
      description: string;
      image: string;
      quantity: number;
    }>,
  }),

  //== getters ==//

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  //== actions ==//

  actions: {
    //== add product to cart ==//
    addToCart(product: any) {
      const existing = this.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }

      this.saveToStorage();
    },

    //== remove product from cart ==//
    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToStorage();
    },

    //== update product quantity in cart ==//
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
      this.saveToStorage();
    },

    //== clear the cart ==//
    clearCart() {
      this.items = [];
      this.saveToStorage();
    },

    //== persist cart to localStorage ==//
    saveToStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    //== load cart from localStorage ==//
    loadFromStorage() {
      const saved = localStorage.getItem("cart");
      if (saved) {
        this.items = JSON.parse(saved);
      }
    },
  },
});
