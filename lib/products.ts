import { productListSchema } from '@/lib/schema'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export async function getProducts(
  options: Pick<Stripe.ProductListParams, 'limit'> = {
    limit: 6,
  }
) {
  try {
    const products = await stripe.products.list({
      limit: options.limit,
      active: true,
      expand: ['data.default_price'],
    })

    console.log('Fetched products:', products.data.length)

    return productListSchema.parse({
      data: products.data.map(product => {
        const price = product.default_price as Stripe.Price
        const amount = price.unit_amount ? price.unit_amount / 100 : null

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          images: product.images,
          price: {
            id: price.id,
            amount,
            display_amount: amount?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
          },
        }
      }),
      has_more: products.has_more,
      starting_after: products.data[products.data.length - 1]?.id,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return { data: [], has_more: false }
  }
}

export async function testStripeConnection() {
  try {
    const account = await stripe.accounts.retrieve()
    console.log('Stripe connection successful:', account.id)
    return NextResponse.json({ success: true, accountId: account.id })
  } catch (error) {
    console.error('Stripe connection failed:', error)
    return NextResponse.json({ success: false, error: (error as Error).message })
  }
}

