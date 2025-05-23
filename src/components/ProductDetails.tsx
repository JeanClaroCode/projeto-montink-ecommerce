/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import axios from 'axios'

const sizes = ['P', 'M', 'G', 'GG']
const colors = ['Branco', 'Preto/Vermelho', 'Preto/Branco']

const STORAGE_KEY = 'product-selection'

interface ProductInfo {
  id: string
  name: string
  price: string
  defaultPriceId: string
}

interface ProductsInfoProps {
  productsInfo: ProductInfo[]
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

export default function ProductDetails({ productsInfo }: ProductsInfoProps) {
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState<Address | null>(null)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const currentProduct = productsInfo.find((product) => product.id === id)
  useEffect(() => {
    if (!currentProduct) return

    const name = currentProduct.name.toLowerCase()

    const orderedColors = [...colors].sort((a, b) => b.length - a.length)

    const matchingColor = orderedColors.find(
      (cor) =>
        name.includes(cor.toLowerCase().replace('/', '')) ||
        name.includes(cor.toLowerCase()),
    )

    if (matchingColor) {
      setColor(matchingColor)
    }
  }, [currentProduct])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    setSize(data.size || '')
    setColor(data.color || '')
    setCep(data.cep || '')
    setAddress(data.address || null)
  }, [])

  useEffect(() => {
    const data = { size, color, cep, address }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    const timeout = setTimeout(
      () => {
        localStorage.removeItem(STORAGE_KEY)
      },
      15 * 60 * 1000,
    )
    return () => clearTimeout(timeout)
  }, [size, color, cep, address])

  const handleCepSearch = async () => {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) return setAddress(null)
      setAddress(data)
    } catch {
      setAddress(null)
    }
  }

  function findProductIdByColor(color: string) {
    const found = productsInfo.find((product) =>
      product.name.toLowerCase().includes(color.toLowerCase()),
    )
    return found ? found.id : null
  }

  function handleColorClick(color: string) {
    setColor(color)
    const productId = findProductIdByColor(color)
    if (productId) {
      router.push(`${pathname}?id=${productId}`)
    }
  }

  if (!currentProduct) {
    return <p className="text-red-600">Produto não encontrado.</p>
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api', {
        priceId: currentProduct?.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      alert('Falha ao redirecionar ao checkout')
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-customRed">
        {currentProduct.name}
      </h1>
      <p className="text-2xl font-semibold text-customRed">
        {currentProduct.price}
      </p>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Tamanho:</label>
        <div className="flex gap-3 flex-wrap">
          {sizes.map((sizeProduct) => (
            <button
              key={sizeProduct}
              onClick={() => setSize(sizeProduct)}
              className={`px-4 py-2 border rounded-md transition-colors ${
                size === sizeProduct
                  ? 'bg-customRed text-white border-customRed'
                  : 'border-gray-300 hover:border-customRed'
              }`}
            >
              {sizeProduct}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Cor:</label>
        <div className="flex gap-3 flex-wrap">
          {colors.map((colorProduct) => (
            <button
              key={colorProduct}
              onClick={() => handleColorClick(colorProduct)}
              className={`px-4 py-2 border rounded-md transition-colors ${
                color === colorProduct
                  ? 'bg-customRed text-white border-customRed'
                  : 'border-gray-300 hover:border-customRed'
              }`}
            >
              {colorProduct}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Digite seu CEP
        </label>
        <div className="flex gap-2 max-w-xs">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleCepSearch}
            className="bg-customRed text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-customRed"
          >
            Verificar
          </button>
        </div>
        {address && (
          <div className="mt-2 text-sm text-gray-700">
            {address.logradouro}, {address.bairro}, {address.localidade} -{' '}
            {address.uf}
          </div>
        )}
      </div>

      <div>
        <button
          className={`w-2/3 px-4 py-2 rounded-md border-2 transition duration-300 
          ${
            isCreatingCheckoutSession
              ? 'bg-customRed border-customRed text-white opacity-5 cursor-not-allowed'
              : 'bg-customRed border-customRed text-white hover:bg-white hover:text-customRed hover:cursor-pointer'
          }`}
          disabled={isCreatingCheckoutSession}
          onClick={handleBuyProduct}
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
