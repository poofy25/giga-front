'use client'

import React, { Suspense } from 'react'
import './globals.scss'

import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})




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
              <div className=" w-full py-[72px]">{children}</div>
      </body>
    </html>
  )
}