export const dynamic = 'force-dynamic'

async function getLegalNoticesData() {
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    const res = await fetch(SERVER_PATH + '/api/legal-notices', {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    })
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    
    if (data.error) {
      return null;
    }
    
    return data;
  } catch (error) {
    return null;
  }
}

export default async function LegalNoticesPage() {
  const legalNotices = await getLegalNoticesData();
  
  return (
    <div className="mx-auto px-5 min-h-screen">
      <div className="container max-w-4xl py-12">
        <h1 className="title mb-6">Mentions Légales</h1>

        {/* Site Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Éditeur du Site</h2>
          <p className="mb-4 text-gray-700">
            Le présent Site Internet, accessible à l'adresse <strong className="text-gray-600 font-semibold">{legalNotices?.siteInfo.siteUrl || 'https://www.els-togo.org'}</strong>, 
            est édité par <strong className="text-gray-600 font-semibold">{legalNotices?.organizationInfo.organizationName || 'Association ELS - Togo'}</strong>, 
            {legalNotices?.organizationInfo.legalForm && ` ${legalNotices.organizationInfo.legalForm.toLowerCase()}`}
            {legalNotices?.organizationInfo.capital && `, au capital social de ${legalNotices.organizationInfo.capital}`}
            {legalNotices?.organizationInfo.registrationNumber && `, immatriculée au ${legalNotices.organizationInfo.registrationOffice || 'Registre du Commerce'} sous le numéro ${legalNotices.organizationInfo.registrationNumber}`}.
          </p>
          <p className="mb-4 text-gray-700">
            <strong className="text-gray-600 font-semibold">{legalNotices?.organizationInfo.organizationName || 'Association ELS - Togo'}</strong> a son siège social situé au 
            <strong className="text-gray-600 font-semibold"> {legalNotices?.organizationInfo.address.street || 'Lomé, Togo'}</strong>.
          </p>
          <p className="mb-4 text-gray-700">
            {legalNotices?.siteInfo.siteDescription || 'Site web de l\'Association ELS - Togo pour la promotion de l\'éducation, des loisirs et de la santé au Togo'}
          </p>
          {legalNotices?.organizationInfo.contactPhone && (
            <p className="mb-4 text-gray-700">
              Téléphone : <a href={`tel:${legalNotices.organizationInfo.contactPhone}`} className="text-gray-600 font-semibold hover:underline">{legalNotices.organizationInfo.contactPhone}</a>
            </p>
          )}
        </section>

        {/* Publication Director */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Directeur de la Publication</h2>
          <p className="mb-4 text-gray-700">
            Le directeur de la publication est <strong className="text-gray-600 font-semibold">{legalNotices?.publicationDirector.name || 'Kokou Jacques Kpeglo Bessou'}</strong>, 
            <strong className="text-gray-600 font-semibold"> {legalNotices?.publicationDirector.position || 'Président du Conseil d\'Administration'}</strong>.
          </p>
        </section>

        {/* Hosting Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Hébergement du Site</h2>
          <p className="mb-4 text-gray-700">
            Le fournisseur des services d'hébergement de la plateforme est la société <strong className="text-gray-600 font-semibold">{legalNotices?.hostingInfo.providerName || 'Vercel Inc.'}</strong>, 
            dont le siège social est situé <strong className="text-gray-600 font-semibold">{legalNotices?.hostingInfo.providerAddress.street || '340 S Lemon Ave #4133'}</strong>, 
            <strong className="text-gray-600 font-semibold"> {legalNotices?.hostingInfo.providerAddress.city || 'Walnut, CA 91789'}</strong> 
            (<strong className="text-gray-600 font-semibold">{legalNotices?.hostingInfo.providerAddress.country || 'États-Unis'}</strong>).
          </p>
          {legalNotices?.hostingInfo.providerPhone && (
            <p className="mb-4 text-gray-700">
              Téléphone : <a href={`tel:${legalNotices.hostingInfo.providerPhone}`} className="text-gray-600 font-semibold hover:underline">{legalNotices.hostingInfo.providerPhone}</a>
            </p>
          )}
          {legalNotices?.hostingInfo.providerWebsite && (
            <p className="mb-4 text-gray-700">
              Accéder au site de la société d'hébergement : <a href={legalNotices.hostingInfo.providerWebsite} className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-all duration-200 external-link" target="_blank" rel="noreferrer">
                {legalNotices.hostingInfo.providerWebsite}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
          )}
        </section>

        {/* Legal Disclaimers */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Garantie et Sécurité</h2>
          <p className="mb-4 text-gray-700">
            {legalNotices?.disclaimers.contentDisclaimer || 'Le contenu de ce site est édité sous réserve d\'erreurs techniques et/ou typographiques. L\'Association ELS - Togo ne saurait donc être tenue responsable quant à l\'exactitude des informations mises à disposition des utilisateurs.'}
          </p>
          <p className="mb-4 text-gray-700">
            {legalNotices?.disclaimers.copyrightNotice || 'Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.'}
          </p>
          <p className="mb-4 text-gray-700">
            {legalNotices?.disclaimers.liabilityDisclaimer || 'L\'Association ELS - Togo ne peut garantir que le fonctionnement du site sera exempt d\'interruptions ou d\'erreurs. La responsabilité de l\'association ne saurait être engagée pour les dommages résultant de l\'utilisation du site.'}
          </p>
        </section>
      </div>
    </div>
  )
}
