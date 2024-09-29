import React, { Suspense } from 'react'
import './global.scss'

import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

import ReactQueryProvider from '@/providers/ReactQueryProvider'

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  return (
    <html>
      <body className={cn(fontSans.variable)}>
        <ReactQueryProvider>
          <div className=" w-full py-[72px]">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
