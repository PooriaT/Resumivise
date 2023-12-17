import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import "./globals.css";
import Cta from '@/components/Cta';

export const metadata: Metadata = {
  title: 'Resumivise',
  description: 'Generated by Pooria Taghdiri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between min-h-screen text-black">
          <Header/>
          {children}
          <Cta />
          <Footer/>
      </body>
    </html>
  )
}