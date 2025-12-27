export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 6

  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 100 + i * 10,
    description: `Description for product ${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/400/300`
  }))

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedProducts = products.slice(start, end)

  return {
    products: paginatedProducts,
    total: products.length,
    page,
    limit,
    totalPages: Math.ceil(products.length / limit)
  }
})