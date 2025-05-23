import ProductPageClient from '@/components/ProductPageClient'
import { stripe } from '@/lib/stripe'
import { Suspense } from 'react'
import Stripe from 'stripe'

export default async function Page() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const stripeProductsData = response.data

  const productsImgs = stripeProductsData.map((product) => ({
    id: product.id,
    imageUrl: product.images[0],
  }))

  const productsInfo = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    if (price.unit_amount === null) {
      throw new Error(`O preço do produto ${product.name} não está definido.`)
    }
    return {
      id: product.id,
      name: product.name,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      defaultPriceId: price.id,
    }
  })

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ProductPageClient
        productsImgs={productsImgs}
        productsInfo={productsInfo}
      />
    </Suspense>
  )
}
