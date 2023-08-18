import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import Provider from './context/AuthContext'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EAFC24',
  description: 'Ranking of Fifa Players in Kazakhstan',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <Navbar/>
        {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}
