'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SuccessClientProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

interface Address {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
}
export default function SuccessClient({
  customerName,
  product,
}: SuccessClientProps) {
  const [address, setAddress] = useState<Address | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('product-selection')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setAddress(parsed.address)
      } catch (e) {
        console.error('Erro ao ler o localStorage:', e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Compra Efetuada!
      </h1>

      <div className="border border-customRed rounded-lg p-4 mb-6">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={120}
          height={110}
        />
      </div>

      <p>
        Obrigado pela sua compra,{' '}
        <strong className="text-customRed">{customerName}</strong>!<br />
        Seu produto <strong className="text-customRed">
          {product.name}
        </strong>{' '}
        já está a caminho da sua casa.
      </p>

      {address && (
        <div className="mt-4 text-xl text-gray-700">
          🚚 Envio para: {address.logradouro}, {address.bairro},{' '}
          {address.localidade} - {address.uf}
        </div>
      )}

      <Link
        href="/"
        className="mt-6 bg-customRed rounded-md text-white px-4 py-2 hover:underline"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}
