'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ConditionalClerkProviderProps {
  children: ReactNode
}

export default function ConditionalClerkProvider({ children }: ConditionalClerkProviderProps) {
  // Check if we're in development mode and bypass auth is enabled
  const isDevelopment = process.env.NODE_ENV === 'development'
  const bypassAuthInDev = process.env.NEXT_PUBLIC_BYPASS_AUTH_IN_DEV === 'true'
  
  // If in development and bypass is enabled, render children without ClerkProvider
  if (isDevelopment && bypassAuthInDev) {
    return <>{children}</>
  }
  
  // Otherwise, wrap with ClerkProvider
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}
