'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function ShowToast() {
  useEffect(() => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQH68ql4B9_jTQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1704995576833?e=1753315200&v=beta&t=0SQ1jACat1EgdeuAmUXmGObXiOkhlyiqQA8iwWPQ0Yk"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Olá, bem-vindo ao meu projeto! 🚀
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Passei aqui para avisar que para testar a implementação do
                  gateway de pagamento Stripe, clique em{' '}
                  <strong>Comprar</strong> e use os dados:
                  <br />
                  <span className="block mt-1 text-xs text-gray-500">
                    <strong>Cartão:</strong> 4242 4242 4242 4242
                    <br />
                    <strong>CVC:</strong> Qualquer 3 dígitos
                    <br />
                    <strong>Validade:</strong> Qualquer data futura
                  </span>
                  <br />
                  Mais opções na doc oficial:{' '}
                  <a
                    href="https://docs.stripe.com/testing?locale=pt-BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Stripe Docs
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Fechar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    )
  }, [])

  return null
}
