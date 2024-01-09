
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { FormProvider } from '@/context/FormDataContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFCS Sport Fiesta',
  description: 'NFCS OAU community product',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormProvider>
          {children}
          <Footer /> 
        </FormProvider>
      </body>
    </html>
  )
}
