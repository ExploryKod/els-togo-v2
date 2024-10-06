import { NextResponse, NextRequest } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { RateLimiterMemory } from 'rate-limiter-flexible';

// const rateLimiter = new RateLimiterMemory({
//   points: 1, 
//   duration: 30000, 
// });

export const middleware = async (req: NextRequest) => {
    // const clientIp:any = req.headers.get("x-forwarded-for") || req.ip;
  
//     try {
//       await rateLimiter.consume(clientIp);
  
//       return NextResponse.next();
//     } catch (rateLimiterRes) {

//     const url = new URL('/too-many-requests', req.url);
//     const response = NextResponse.redirect(url);
//     return response; 
//     }
   };

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/project/:slug(.*)'])

export default clerkMiddleware((auth, request) => {
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