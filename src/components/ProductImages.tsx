'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface ProductsImgsProps {
  productsImgs: {
    id: string
    imageUrl: string
  }[]
}

export default function ProductImages({ productsImgs }: ProductsImgsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const images = productsImgs.slice(0, 3)
  const [selected, setSelected] = useState(images[0])

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const found = productsImgs.find((p) => p.id === id)
      if (found && found.id !== selected.id) {
        setSelected(found)
      }
    }
  }, [searchParams, productsImgs])

  useEffect(() => {
    if (selected?.id) {
      router.replace(`${pathname}?id=${selected.id}`)
    }
  }, [selected, pathname])

  return (
    <div>
      <Image
        src={selected.imageUrl}
        alt="Imagem principal do produto"
        className="w-full h-[400px] rounded-lg border border-gray-200 bg-white object-contain"
        width={800}
        height={800}
      />
      <div className="flex gap-4 mt-4">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.imageUrl}
            alt={`Miniatura ${i}`}
            width={500}
            height={500}
            className={`w-20 h-20 rounded-lg border-2 cursor-pointer object-cover ${
              selected === img ? 'border-red-600' : 'border-gray-300'
            }`}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
    </div>
  )
}
