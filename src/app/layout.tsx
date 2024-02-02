import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import NavBar from '../components/NavBar'

const sans = Open_Sans({ subsets: ['latin'] })

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
      <body className={sans.className}>
        <NavBar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  )
}
