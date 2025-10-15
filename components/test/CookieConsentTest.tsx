'use client'

import { useGoogleFontsConsent, useSanityCdnConsent, useMapTilerConsent, useExternalImagesConsent, useVercelAnalyticsConsent } from '@/hooks/useCookieConsent'
import { ConditionalExternalImages } from '@/components/conditional/ConditionalExternalImages'
import { ConditionalMap } from '@/components/conditional/ConditionalMap'
import { ConditionalSanityImage } from '@/components/conditional/ConditionalSanityImage'

export function CookieConsentTest() {
  const googleFontsConsent = useGoogleFontsConsent()
  const sanityCdnConsent = useSanityCdnConsent()
  const mapTilerConsent = useMapTilerConsent()
  const externalImagesConsent = useExternalImagesConsent()
  const vercelAnalyticsConsent = useVercelAnalyticsConsent()

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Test des Services Conditionnels</h2>
      
      {/* Test Google Fonts */}
      <div className="mb-4 p-4 border rounded">
        <h3 className="font-semibold mb-2">Google Fonts</h3>
        <p className={`text-sm ${googleFontsConsent ? 'text-green-600' : 'text-red-600'}`}>
          {googleFontsConsent ? '✅ Autorisé - Police Inter chargée' : '❌ Bloqué - Police système utilisée'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Ce texte utilise la police Inter si les cookies "Contenus Tiers" sont autorisés, sinon la police système.
        </p>
      </div>

      {/* Test Images Externes */}
      <div className="mb-4 p-4 border rounded">
        <h3 className="font-semibold mb-2">Images Externes</h3>
        <p className={`text-sm ${externalImagesConsent ? 'text-green-600' : 'text-red-600'}`}>
          {externalImagesConsent ? '✅ Autorisé - Images externes chargées' : '❌ Bloqué - Placeholders affichés'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Les images externes (Picsum, Pexels) ne se chargeront que si les cookies "Contenus Tiers" sont autorisés.
        </p>
        <div className="mt-2">
          <ConditionalExternalImages
            src="https://picsum.photos/200/150"
            alt="Image de test"
            width={200}
            height={150}
            className="border rounded"
          />
        </div>
      </div>

      {/* Test MapTiler */}
      <div className="mb-4 p-4 border rounded">
        <h3 className="font-semibold mb-2">MapTiler</h3>
        <p className={`text-sm ${mapTilerConsent ? 'text-green-600' : 'text-red-600'}`}>
          {mapTilerConsent ? '✅ Autorisé - Carte interactive chargée' : '❌ Bloqué - Message de remplacement affiché'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          La carte interactive ne s'affichera que si les cookies "Contenus Tiers" sont autorisés.
        </p>
        <div className="mt-2 h-32">
          <ConditionalMap />
        </div>
      </div>

      {/* Test Sanity CDN */}
      <div className="mb-4 p-4 border rounded">
        <h3 className="font-semibold mb-2">Sanity CDN</h3>
        <p className={`text-sm ${sanityCdnConsent ? 'text-green-600' : 'text-red-600'}`}>
          {sanityCdnConsent ? '✅ Autorisé - Images Sanity chargées' : '❌ Bloqué - Placeholders affichés'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Les images du CMS Sanity ne se chargeront que si les cookies "Contenus Tiers" sont autorisés.
        </p>
        <div className="mt-2">
          <ConditionalSanityImage
            image={{
              asset: {
                _ref: 'image-07c1f585c63f265cda2c3a6a8164ce5c494f7356-3886x5829-jpg'
              },
              alt: 'Image de test Sanity'
            }}
            width={200}
            height={150}
            className="border rounded"
          />
        </div>
      </div>

      {/* Test Vercel Analytics */}
      <div className="mb-4 p-4 border rounded">
        <h3 className="font-semibold mb-2">Vercel Analytics</h3>
        <p className={`text-sm ${vercelAnalyticsConsent ? 'text-green-600' : 'text-red-600'}`}>
          {vercelAnalyticsConsent ? '✅ Autorisé - Analytics activé' : '❌ Bloqué - Analytics désactivé'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Le tracking Vercel ne fonctionne que si les cookies "Analytics" sont autorisés.
        </p>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          <strong>Note :</strong> Utilisez le bouton cookie flottant pour modifier vos préférences et voir les changements en temps réel.
        </p>
      </div>
    </div>
  )
}
