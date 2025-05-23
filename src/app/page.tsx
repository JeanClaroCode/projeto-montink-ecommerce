import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import ShowToast from '@/components/ShowToast'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export default async function ProductPage() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const stripeProductsData = response.data

  const productsImgs = stripeProductsData.map((product) => {
    return {
      id: product.id,
      imageUrl: product.images[0],
    }
  })

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
    <>
      <ShowToast />
      <main className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
        <div className="md:w-1/2">
          <ProductImages productsImgs={productsImgs} />
        </div>
        <div className="md:w-1/2">
          <ProductDetails productsInfo={productsInfo} />
        </div>
      </main>
    </>
  )
}
