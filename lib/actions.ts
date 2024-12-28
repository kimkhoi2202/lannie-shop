'use server'

import { createCheckoutSession } from '@/lib/stripe'

export async function checkoutAction(_prevState: unknown, formData: FormData) {
  const priceId = formData.get('priceId') as string
  await createCheckoutSession({ priceId })
}

