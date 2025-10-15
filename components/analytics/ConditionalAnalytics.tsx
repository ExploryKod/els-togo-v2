'use client'

import { SpeedInsights } from "@vercel/speed-insights/next"
import { useVercelAnalyticsConsent } from '@/hooks/useCookieConsent'

export function ConditionalAnalytics() {
  const hasConsent = useVercelAnalyticsConsent()
  
  if (!hasConsent) {
    return null
  }
  
  return <SpeedInsights />
}
