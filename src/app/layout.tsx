import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import '@/global/globals.css'
import { cn } from '@/shared/lib'
import { Toaster } from '@/shared/ui'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'dark',
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main
          className={cn(
            'relative',
            'bg-grid-black/[0.025] dark:bg-grid-white/[0.025]'
          )}
        >
          <div className="pointer-events-none fixed inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black" />
          <div className="relative">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
