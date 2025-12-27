
//== useProduct composable to fetch products data ==//
export const useProduct = () => {
  const getProducts = (page: Ref<number>, limit = 6) => {
    return useAsyncData(
      'products',
      () => $fetch<{ products: any[]; page: number; limit: number; total: number; totalPages: number }>('/api/products', { query: { page: page.value, limit } }),
      { watch: [page] }
    )
  }

  //== fetch single product by id ==//
  const getProductById = (id: number) => {
    return useAsyncData(
      `product-${id}`,
      () => $fetch<{ id: number; name: string; price: number; description: string; image: string }>(`/api/products/${id}`)
    )
  }

  return {
    getProducts,
    getProductById
  }
}