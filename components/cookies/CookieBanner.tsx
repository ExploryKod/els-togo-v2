'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Cookie } from 'lucide-react'

export interface CookiePreferences {
  essential: boolean // Always true, can't be disabled
  functional: boolean // Social sharing, etc.
  analytics: boolean // Vercel Analytics, etc.
  thirdParty: boolean // External services, etc.
  // Individual services
  socialSharing: boolean // Social sharing buttons specifically
  vercelAnalytics: boolean // Vercel Analytics specifically
  googleFonts: boolean // Google Fonts specifically
  sanityCdn: boolean // Sanity CDN specifically
  mapTiler: boolean // MapTiler maps specifically
  externalImages: boolean // External images (Picsum, Pexels) specifically
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  thirdParty: false,
  socialSharing: false,
  vercelAnalytics: false,
  googleFonts: false,
  sanityCdn: false,
  mapTiler: false,
  externalImages: false,
}

type BannerView = 'main' | 'essential' | 'functional' | 'analytics' | 'thirdParty'

export function CookieBanner() {
  const [showButton, setShowButton] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentView, setCurrentView] = useState<BannerView>('main')
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-preferences')
    
    // Show the floating button after a short delay
    setTimeout(() => setShowButton(true), 1000)
    
    // If no consent yet, auto-open banner on first visit
    if (!consent) {
      setIsFirstVisit(true)
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      thirdParty: true,
      socialSharing: true,
      vercelAnalytics: true,
      googleFonts: true,
      sanityCdn: true,
      mapTiler: true,
      externalImages: true,
    }
    savePreferences(allAccepted)
  }

  const handleRejectAll = () => {
    savePreferences(DEFAULT_PREFERENCES)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsFirstVisit(false)
    closeBanner()
    
    // Dispatch event for other components listening for consent
    window.dispatchEvent(new Event('cookie-consent-changed'))
  }

  const closeBanner = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowBanner(false)
      setIsClosing(false)
      setCurrentView('main') // Reset to main view when closing
    }, 300)
  }

  const openBanner = () => {
    setShowBanner(true)
    setCurrentView('main')
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Can't disable essential cookies
    
    setPreferences((prev) => {
      const newPrefs = { ...prev, [key]: !prev[key] }
      
      // Si on modifie un service individuel, mettre à jour sa catégorie parente
      if (key === 'googleFonts' || key === 'sanityCdn' || key === 'mapTiler' || key === 'externalImages') {
        // thirdParty est true si au moins un service tiers est true
        newPrefs.thirdParty = newPrefs.googleFonts || newPrefs.sanityCdn || newPrefs.mapTiler || newPrefs.externalImages
      } else if (key === 'socialSharing') {
        // functional est true si socialSharing est true
        newPrefs.functional = newPrefs.socialSharing
      } else if (key === 'vercelAnalytics') {
        // analytics est true si vercelAnalytics est true
        newPrefs.analytics = newPrefs.vercelAnalytics
      }
      
      return newPrefs
    })
  }

  const toggleAllInCategory = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return
    
    setPreferences((prev) => {
      const newPrefs = { ...prev, [key]: value }
      
      // Si c'est une catégorie, contrôler aussi ses services individuels
      if (key === 'thirdParty') {
        newPrefs.googleFonts = value
        newPrefs.sanityCdn = value
        newPrefs.mapTiler = value
        newPrefs.externalImages = value
      } else if (key === 'functional') {
        newPrefs.socialSharing = value
      } else if (key === 'analytics') {
        newPrefs.vercelAnalytics = value
      }
      
      return newPrefs
    })
  }

  const goToNextView = () => {
    const views: BannerView[] = ['main', 'essential', 'functional', 'analytics', 'thirdParty']
    const currentIndex = views.indexOf(currentView)
    if (currentIndex < views.length - 1) {
      setCurrentView(views[currentIndex + 1])
    } else {
      setCurrentView('main') // Loop back
    }
  }

  const goToPreviousView = () => {
    const views: BannerView[] = ['main', 'essential', 'functional', 'analytics', 'thirdParty']
    const currentIndex = views.indexOf(currentView)
    if (currentIndex > 0) {
      setCurrentView(views[currentIndex - 1])
    }
  }

  // Main view
  const renderMainView = () => (
    <div className="p-4 sm:p-6">
      {/* Close button */}
      <button
        onClick={closeBanner}
        className="top-3 right-3 sm:top-4 sm:right-4 absolute text-gray-500 hover:text-gray-700 transition-colors z-10"
        aria-label="Fermer"
      >
        <X size={18} className="sm:w-5 sm:h-5" />
      </button>

      {/* Main content */}
      <div className="pr-6 sm:pr-8">
        <h3 className="mb-3 font-bold text-gray-900 text-lg sm:text-xl">
          🍪 Préférences des Cookies
        </h3>
        <p className="mb-4 text-gray-600 text-sm leading-relaxed">
          Nous utilisons des cookies pour améliorer votre expérience de navigation, fournir du contenu personnalisé et analyser notre trafic. Vous pouvez choisir les types de cookies que vous souhaitez accepter.
        </p>

        {/* Quick action info - Hidden on mobile */}
        <div className="hidden sm:block space-y-2 mb-4">
          <p className="text-gray-600 text-sm">Vous pouvez :</p>
          <ul className="space-y-1 ml-6 text-gray-600 text-sm list-disc">
            <li>Accepter tous les cookies en cliquant sur « OK pour moi ».</li>
            <li>Tous les refuser en cliquant sur « Non merci ».</li>
            <li>Ou paramétrer votre choix en cliquant sur « Je choisis ».</li>
          </ul>
        </div>

        <p className="mb-4 text-gray-500 text-xs">
          Votre choix est valable pour une durée de 6 mois. Vous pouvez changer d'avis à tout moment en rouvrant ce module.
        </p>

        <p className="mb-4 sm:mb-6 text-gray-600 text-sm">
          Pour plus d'informations, consultez notre{' '}
          <a
            href="/confidentiality"
            className="text-primary hover:underline font-medium"
          >
            Politique de confidentialité
          </a>
        </p>
      </div>

      {/* Category links - Responsive grid */}
      <div className="mb-4 sm:mb-6">
        <p className="mb-3 font-semibold text-gray-900 text-sm">Voici pourquoi nous utilisons des cookies :</p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <button
            onClick={() => setCurrentView('essential')}
            className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-2 sm:px-3 rounded-md font-medium text-gray-700 text-xs sm:text-sm transition-colors"
          >
            <span className="truncate">Nécessaires</span> <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setCurrentView('functional')}
            className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-2 sm:px-3 rounded-md font-medium text-gray-700 text-xs sm:text-sm transition-colors"
          >
            <span className="truncate">Fonctionnels</span> <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setCurrentView('analytics')}
            className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-2 sm:px-3 rounded-md font-medium text-gray-700 text-xs sm:text-sm transition-colors"
          >
            <span className="truncate">Analytics</span> <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setCurrentView('thirdParty')}
            className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-2 sm:px-3 rounded-md font-medium text-gray-700 text-xs sm:text-sm transition-colors"
          >
            <span className="truncate">Contenus Tiers</span> <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Action buttons - Responsive */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={handleRejectAll}
          className="border-2 border-gray-300 hover:bg-gray-50 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium text-gray-700 text-sm transition-colors"
        >
          Non merci
        </button>
        <button
          onClick={() => setCurrentView('essential')}
          className="border-2 border-primary hover:bg-primary/10 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium text-primary text-sm transition-colors"
        >
          Je choisis
        </button>
        <button
          onClick={handleAcceptAll}
          className="bg-primary hover:opacity-90 shadow-md px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium text-sm text-white transition-opacity"
        >
          OK pour moi
        </button>
      </div>
    </div>
  )

  // Category detail view
  const renderCategoryView = (category: keyof CookiePreferences) => {
    const isEssential = category === 'essential'
    const isActive = preferences[category]

    const getCategoryInfo = (cat: string) => {
      switch (cat) {
        case 'essential':
          return {
            title: 'Nécessaires',
            subtitle: 'Ils sont vitaux pour notre site web !',
            description: 'Nécessaires au bon fonctionnement du site. Ne peuvent pas être désactivés.',
            detailedDescription: 'Ces cookies sont nécessaires au bon fonctionnement du site web. Ils permettent des fonctionnalités de base comme la navigation entre les pages, la sécurité et l\'accès aux zones essentielles. Le site web ne peut pas fonctionner correctement sans ces cookies.'
          }
        case 'functional':
          return {
            title: 'Fonctionnels',
            subtitle: 'Fonctionnalités améliorées pour une meilleure expérience !',
            description: 'Permettent des fonctionnalités améliorées comme le partage social.',
            detailedDescription: 'Ces cookies permettent des fonctionnalités améliorées du site web et la personnalisation. Ils peuvent être définis par nous ou par des services tiers que nous avons ajoutés à nos pages. Si vous n\'autorisez pas ces cookies, certaines fonctionnalités peuvent ne pas fonctionner correctement.'
          }
        case 'analytics':
          return {
            title: 'Performances et Analytics',
            subtitle: 'Compter nos visites, c\'est important !',
            description: 'Nous aident à comprendre comment les visiteurs utilisent notre site (Vercel Analytics).',
            detailedDescription: 'Ces cookies nous aident à compter les visites et à comprendre les sources de trafic afin que nous puissions mesurer et améliorer les performances de notre site. Toutes les informations collectées sont agrégées et donc anonymes. Si vous n\'autorisez pas ces cookies, nous ne saurons pas quand vous avez visité notre site.'
          }
        case 'thirdParty':
          return {
            title: 'Contenus Tiers',
            subtitle: 'Services externes pour polices, images et cartes !',
            description: 'Contenus externes comme Google Fonts, Sanity CDN, MapTiler et images externes.',
            detailedDescription: 'Ces cookies sont définis par des services externes qui apparaissent sur nos pages, tels que Google Fonts, Sanity CDN, MapTiler et images externes. Si vous n\'autorisez pas ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.'
          }
        default:
          return { title: '', subtitle: '', description: '', detailedDescription: '' }
      }
    }

    const categoryInfo = getCategoryInfo(category)

    return (
      <div className="p-4 sm:p-6">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('main')}
          className="top-3 left-3 sm:top-4 sm:left-4 absolute text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Retour"
        >
          <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Close button */}
        <button
          onClick={closeBanner}
          className="top-3 right-3 sm:top-4 sm:right-4 absolute text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Fermer"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Category content */}
        <div className="mt-6 sm:mt-8 mb-4 sm:mb-6">
          <h3 className="mb-2 sm:mb-3 font-bold text-gray-900 text-lg sm:text-xl">
            {categoryInfo.title}
          </h3>
          <p className="mb-3 sm:mb-4 font-medium text-sm sm:text-base text-gray-700">
            {categoryInfo.subtitle}
          </p>
          <p className="mb-4 sm:mb-6 text-gray-600 text-xs sm:text-sm leading-relaxed">
            {categoryInfo.detailedDescription}
          </p>

          {/* Reminder to save */}
          {!isEssential && (
            <p className="text-xs text-red-600 text-center mb-3 sm:mb-4">
              N'oubliez pas d'enregistrer vos choix après avoir décoché ou coché une ou plusieurs cases
            </p>
          )}

          {/* Toggle for the category */}
          {!isEssential && (
            <div className="bg-gray-50 mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleAllInCategory(category, !isActive)}
                  className="text-primary hover:text-primary/80 font-semibold text-xs sm:text-sm transition-colors"
                >
                  {isActive ? 'Tout décocher' : 'Tout cocher'}
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => togglePreference(category)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          )}

          {/* Individual cookies */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">Cookies dans cette catégorie :</h4>
            
            {/* Cookie items specific to this category */}
            {category === 'essential' && (
              <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Session & Navigation</p>
                    <p className="mt-1 text-gray-600 text-xs">Utilisé pour maintenir votre session et vos préférences lors de la navigation. Essentiel pour la sécurité et le fonctionnement du site.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-not-allowed opacity-50 ml-2"
                  />
                </div>
              </div>
            )}

            {category === 'functional' && (
              <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Partage Social</p>
                    <p className="mt-1 text-gray-600 text-xs">Active les boutons de partage sur les réseaux sociaux (Facebook, Twitter, LinkedIn, WhatsApp, Email). Permet de partager facilement nos articles.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.socialSharing}
                    onChange={() => togglePreference('socialSharing')}
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-pointer ml-2"
                  />
                </div>
              </div>
            )}

            {category === 'analytics' && (
              <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Vercel Analytics</p>
                    <p className="mt-1 text-gray-600 text-xs">Collecte des données anonymes sur les visites de pages, les sources de trafic et les interactions des utilisateurs. Aide à améliorer les performances du site.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.vercelAnalytics}
                    onChange={() => togglePreference('vercelAnalytics')}
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-pointer ml-2"
                  />
                </div>
              </div>
            )}

            {category === 'thirdParty' && (
              <div className="space-y-3 sm:space-y-4">
                {/* Google Fonts */}
                <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">Google Fonts</p>
                      <p className="mt-1 text-gray-600 text-xs">Active le chargement des polices Google Fonts (Inter). Améliore la typographie du site.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.googleFonts}
                      onChange={() => togglePreference('googleFonts')}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-pointer ml-2"
                    />
                  </div>
                </div>

                {/* Sanity CDN */}
                <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">Sanity CDN</p>
                      <p className="mt-1 text-gray-600 text-xs">Active le chargement des images et contenus depuis Sanity CDN. Nécessaire pour l'affichage du contenu.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.sanityCdn}
                      onChange={() => togglePreference('sanityCdn')}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-pointer ml-2"
                    />
                  </div>
                </div>

                {/* MapTiler */}
                <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">MapTiler</p>
                      <p className="mt-1 text-gray-600 text-xs">Active l'affichage des cartes interactives. Permet de localiser l'association sur une carte.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.mapTiler}
                      onChange={() => togglePreference('mapTiler')}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-pointer ml-2"
                    />
                  </div>
                </div>

                {/* External Images */}
                <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">Images Externes</p>
                      <p className="mt-1 text-gray-600 text-xs">Active le chargement d'images depuis Picsum et Pexels. Utilisées pour les placeholders et illustrations.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.externalImages}
                      onChange={() => togglePreference('externalImages')}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded cursor-pointer ml-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center border-gray-200 pt-3 sm:pt-4 border-t">
          <button
            onClick={goToPreviousView}
            className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800 font-medium text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentView === 'essential'}
          >
            <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Précédent</span>
            <span className="sm:hidden">Préc.</span>
          </button>
          <button
            onClick={goToNextView}
            className="flex items-center gap-1 sm:gap-2 text-primary hover:text-primary/80 font-medium text-xs sm:text-sm transition-colors"
          >
            <span className="hidden sm:inline">Suivant</span>
            <span className="sm:hidden">Suiv.</span>
            <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Action buttons and cache instructions - only for non-essential categories */}
        {!isEssential && (
          <>
            {/* Cache instructions - Hidden on mobile */}
            <div className="hidden sm:block mt-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs sm:text-sm text-yellow-800 font-medium mb-2">
                Si vous ne voyez pas de changement après avoir enregistré vos choix, veuillez vider le cache de votre navigateur :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-yellow-700">
                <div className="font-mono">Windows : Ctrl + Shift + R</div>
                <div className="font-mono">Mac : Cmd + Shift + R</div>
                <div className="font-mono">Linux : Ctrl + Shift + R</div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">
                Ou via le menu : F12 → Application/Storage → Clear storage
              </p>
            </div>

            {/* Bottom action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleRejectAll}
                className="border-2 border-gray-300 hover:bg-gray-50 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium text-gray-700 text-sm transition-colors"
              >
                Non merci
              </button>
              <button
                onClick={handleSavePreferences}
                className="border-2 border-primary hover:bg-primary/10 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium text-primary text-sm transition-colors"
              >
                Enregistrer mes choix
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-primary hover:opacity-90 shadow-md px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium text-sm text-white transition-opacity"
              >
                OK pour moi
              </button>
            </div>
          </>
        )}

        {/* For essential category - just a back button */}
        {isEssential && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors px-6 py-2.5 rounded-lg border border-primary hover:bg-primary/10"
            >
              <ChevronLeft size={18} />
              Retour
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Floating Cookie Button (Always visible) */}
      {showButton && (
        <button
          onClick={openBanner}
          className={`fixed bottom-6 left-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          aria-label="Ouvrir les paramètres des cookies"
          title="Gérer les cookies"
        >
          <Cookie size={28} strokeWidth={2} />
        </button>
      )}

      {/* Cookie Banner Modal */}
      {showBanner && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeBanner}
          />
          
          {/* Banner */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 pb-4 px-4 transition-transform duration-300 ${
              isClosing ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            <div className="relative bg-white shadow-2xl border-2 border-primary rounded-lg mx-auto max-w-screen-xl max-h-[85vh] overflow-y-auto">
              {currentView === 'main' && renderMainView()}
              {currentView === 'essential' && renderCategoryView('essential')}
              {currentView === 'functional' && renderCategoryView('functional')}
              {currentView === 'analytics' && renderCategoryView('analytics')}
              {currentView === 'thirdParty' && renderCategoryView('thirdParty')}
            </div>
          </div>
        </>
      )}
    </>
  )
}
