'use client'

import { useExternalImagesConsent } from '@/hooks/useCookieConsent'
import Image from 'next/image'

interface ConditionalExternalImagesProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  children?: React.ReactNode
}

export function ConditionalExternalImages({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '',
  children 
}: ConditionalExternalImagesProps) {
  const hasConsent = useExternalImagesConsent()
  
  // Vérifier si l'image est externe (Picsum, Pexels, etc.)
  const isExternalImage = src.includes('picsum.photos') || 
                         src.includes('images.pexels.com') || 
                         src.includes('unsplash.com')
  
  if (!hasConsent && isExternalImage) {
    // Afficher un placeholder pour les images externes
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-gray-500">
          <p className="text-sm">Image externe non disponible</p>
          <p className="text-xs">Autorisez les cookies "Contenus Tiers" dans le bandeau cookie pour voir cette image</p>
          {children}
        </div>
      </div>
    )
  }
  
  // Afficher l'image si autorisé ou si c'est une image locale
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
