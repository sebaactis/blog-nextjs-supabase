import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import NavBar from '../components/NavBar'
import { AuthButtonServer } from '@/components/auth-button-server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Next JS'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <Providers>
          {children}
        </Providers>
        <footer className="bg-gray-800 flex justify-center  items-center p-3">
          <AuthButtonServer />
        </footer>
      </body>
    </html>

  )
}
