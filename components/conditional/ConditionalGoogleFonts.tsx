'use client'

import { useGoogleFontsConsent } from '@/hooks/useCookieConsent'
import { Inter } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

interface ConditionalGoogleFontsProps {
  children: React.ReactNode
}

export function ConditionalGoogleFonts({ children }: ConditionalGoogleFontsProps) {
  const hasConsent = useGoogleFontsConsent()
  
  if (!hasConsent) {
    // Utiliser une police système par défaut
    return (
      <div className="font-sans">
        {children}
      </div>
    )
  }
  
  // Utiliser Google Fonts si autorisé
  return (
    <div className={inter.variable}>
      {children}
    </div>
  )
}
