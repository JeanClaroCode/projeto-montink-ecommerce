// app/success/page.tsx
import SuccessClient from '@/components/SuccessClient'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string | string[] }
}) {
  const sessionId = Array.isArray(searchParams.session_id)
    ? searchParams.session_id[0]
    : searchParams.session_id

  if (!sessionId) {
    redirect('/?error=missing_session')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name ?? 'Cliente'
  const product = session.line_items?.data[0]?.price?.product as Stripe.Product

  const productName = product.name ?? 'Produto'
  const productImage = product.images?.[0] ?? '/default.png'

  return (
    <SuccessClient
      customerName={customerName}
      product={{
        name: productName,
        imageUrl: productImage,
      }}
    />
  )
}
