# 🕹️ Loja paiN Gaming

Loja virtual inspirada na marca da equipe paiN Gaming, construída com tecnologias modernas como **Next.js**, **TypeScript**, **TailwindCSS** e o gateway de pagamento **Stripe**.
### [Deploy](https://projeto-montink-ecommerce.vercel.app/)
## 🖼️ Preview

![Demonstração do projeto](https://imgur.com/oZpOS2M.gif)

## ✨ Funcionalidades Extras Implementadas
Fui além do escopo original ao integrar um **Gateway de Pagamento com Stripe** e garantir que todo o processo de checkout seja funcional.

### 💳 Testando o Pagamento com Stripe

Você pode simular uma compra clicando em **Comprar** dentro da página e usando os seguintes dados:

| Campo        | Valor                      |
|--------------|----------------------------|
| **Cartão**   | `4242 4242 4242 4242`      |
| **CVC**      | Qualquer 3 dígitos         |
| **Validade** | Qualquer data futura válida |

Exemplo:
- Mês: `12`
- Ano: `29`
- CVC: `123`

---

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe API](https://stripe.com/)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pain-gaming-store.git
cd pain-gaming-store

# Instale as dependências
npm install

# Crie um arquivo .env.local e configure sua chave do Stripe
cp .env.example .env.local
