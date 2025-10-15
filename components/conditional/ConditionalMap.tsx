'use client'

import { useMapTilerConsent } from '@/hooks/useCookieConsent'
import dynamic from 'next/dynamic'

// Import dynamique du composant Map
const Map = dynamic(() => import('@/components/web/utils/map'), {
  ssr: false,
})

interface ConditionalMapProps {
  children?: React.ReactNode
}

export function ConditionalMap({ children }: ConditionalMapProps) {
  const hasConsent = useMapTilerConsent()
  
  if (!hasConsent) {
    // Afficher un message ou une image de remplacement
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Carte non disponible</p>
          <p className="text-sm text-gray-500">
            Veuillez autoriser les cookies "Contenus Tiers" dans le bandeau cookie pour afficher la carte interactive.
          </p>
          {children}
        </div>
      </div>
    )
  }
  
  // Afficher la carte si autorisé
  return (
    <>
      <Map />
      {children}
    </>
  )
}
