import { CookieConsentTest } from '@/components/test/CookieConsentTest'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test des Cookies',
  description: 'Page de test pour vérifier le fonctionnement du système de cookies.',
}

export default function TestCookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test du Système de Cookies
          </h1>
          <p className="text-lg text-gray-600">
            Cette page permet de tester le blocage conditionnel des services tiers.
          </p>
        </div>

        <CookieConsentTest />
      </div>
    </div>
  )
}
