'use client'

import { useAnalyticsConsent, useThirdPartyConsent, useFunctionalConsent, useGoogleFontsConsent, useSanityCdnConsent, useMapTilerConsent, useExternalImagesConsent } from '@/hooks/useCookieConsent'

export function CookieUsageExample() {
  const analyticsConsent = useAnalyticsConsent()
  const thirdPartyConsent = useThirdPartyConsent()
  const functionalConsent = useFunctionalConsent()
  const googleFontsConsent = useGoogleFontsConsent()
  const sanityCdnConsent = useSanityCdnConsent()
  const mapTilerConsent = useMapTilerConsent()
  const externalImagesConsent = useExternalImagesConsent()

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-semibold mb-2">État des préférences de cookies :</h3>
      <ul className="space-y-1 text-sm">
        <li className={analyticsConsent ? 'text-green-600' : 'text-red-600'}>
          Analytics : {analyticsConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
        <li className={functionalConsent ? 'text-green-600' : 'text-red-600'}>
          Fonctionnalités : {functionalConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
        <li className={thirdPartyConsent ? 'text-green-600' : 'text-red-600'}>
          Services tiers : {thirdPartyConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
        <li className={googleFontsConsent ? 'text-green-600' : 'text-red-600'}>
          Google Fonts : {googleFontsConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
        <li className={sanityCdnConsent ? 'text-green-600' : 'text-red-600'}>
          Sanity CDN : {sanityCdnConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
        <li className={mapTilerConsent ? 'text-green-600' : 'text-red-600'}>
          MapTiler : {mapTilerConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
        <li className={externalImagesConsent ? 'text-green-600' : 'text-red-600'}>
          Images externes : {externalImagesConsent ? '✅ Autorisé' : '❌ Refusé'}
        </li>
      </ul>
    </div>
  )
}
