'use client'

import { useSanityCdnConsent } from '@/hooks/useCookieConsent'
import Image from 'next/image'

interface ConditionalSanityImagesProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  children?: React.ReactNode
}

export function ConditionalSanityImages({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '',
  fallbackSrc = '/placeholder-image.jpg',
  children 
}: ConditionalSanityImagesProps) {
  const hasConsent = useSanityCdnConsent()
  
  if (!hasConsent) {
    // Afficher une image de remplacement ou un placeholder
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-gray-500">
          <p className="text-sm">Image non disponible</p>
          <p className="text-xs">Autorisez les cookies "Contenus Tiers" dans le bandeau cookie pour voir cette image</p>
          {children}
        </div>
      </div>
    )
  }
  
  // Afficher l'image Sanity si autorisé
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}
