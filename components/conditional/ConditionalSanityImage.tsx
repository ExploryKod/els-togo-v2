'use client'

import { useSanityCdnConsent } from '@/hooks/useCookieConsent'
import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'

interface ConditionalSanityImageProps {
  image: any // Sanity image object
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  children?: React.ReactNode
}

export function ConditionalSanityImage({ 
  image, 
  alt = '', 
  width = 400, 
  height = 300, 
  className = '',
  priority = false,
  sizes = '100vw',
  children 
}: ConditionalSanityImageProps) {
  const hasConsent = useSanityCdnConsent()
  
  if (!hasConsent) {
    // Afficher un placeholder si Sanity CDN n'est pas autorisé
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
  
  // Générer l'URL Sanity si autorisé
  const imageUrl = urlForImage(image)?.width(width).height(height).url()
  
  if (!imageUrl) {
    // Fallback si l'image n'est pas valide
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center text-gray-500">
          <p className="text-sm">Image non trouvée</p>
          {children}
        </div>
      </div>
    )
  }
  
  // Afficher l'image Sanity si autorisé
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  )
}
