import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { priceId } = body

  if (!priceId) {
    return NextResponse.json({ error: 'Price not found' }, { status: 400 })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    })

    return NextResponse.json(
      { checkoutUrl: checkoutSession.url },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao criar sessão de pagamento' },
      { status: 500 },
    )
  }
}
