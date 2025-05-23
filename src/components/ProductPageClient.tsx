'use client'

import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import ShowToast from '@/components/ShowToast'

interface ProductPageClientProps {
  productsImgs: { id: string; imageUrl: string }[]
  productsInfo: {
    id: string
    name: string
    price: string
    defaultPriceId: string
  }[]
}

export default function ProductPageClient({
  productsImgs,
  productsInfo,
}: ProductPageClientProps) {
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
