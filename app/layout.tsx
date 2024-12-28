import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stripe Products and Checkout',
  description:
    'A template to showcase Stripe products, Next.js Server Actions, and a checkout flow.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn('flex min-h-svh flex-col antialiased', inter.className)}
      >
        <TooltipProvider delayDuration={0}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  )
}

