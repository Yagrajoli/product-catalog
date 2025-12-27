export default defineEventHandler((event) => {
  const id = parseInt(event.context.params?.id || '0')

  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 100 + i * 10,
    description: `Description for product ${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/400/300`
  }))

  
  const product = products.find(p => p.id === id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }

  return product
})