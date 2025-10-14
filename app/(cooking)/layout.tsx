import ConditionalClerkProvider from '@/components/ConditionalClerkProvider'
import '../globals.css'

export const metadata = {
  title: 'Cooking',
  description: 'Le backoffice de Els-Togo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConditionalClerkProvider>
    <html lang="fr">
      <body>
        <main className="flex justify-center items-center min-h-screen">
         {children}
        </main>
      </body>
    </html>
    </ConditionalClerkProvider>
  )
}
