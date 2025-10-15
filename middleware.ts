import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', 
  '/front-projects.xlsx', 
  '/project.xlsx', 
  '/front-projects.json', 
  '/project.json',
  '/projects.json', 
  '/public/front-projects.json', 
  '/public/project.json',
  '/public/projects.json',
  '/api/projects',
  '/api/projects/details',
  '/api/members',
  '/api/mission-cards',
  '/api/website-sections',
  '/api/categories',
  '/api/legal-matters'
])

export default clerkMiddleware((auth, request) => {
  // Check if we're in development mode and bypass auth is enabled
  const isDevelopment = process.env.NODE_ENV === 'development'
  const bypassAuthInDev = process.env.NEXT_PUBLIC_BYPASS_AUTH_IN_DEV === 'true'
  
  // If in development and bypass is enabled, skip authentication
  if (isDevelopment && bypassAuthInDev) {
    return NextResponse.next()
  }
  
  // Otherwise, apply normal Clerk authentication
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}