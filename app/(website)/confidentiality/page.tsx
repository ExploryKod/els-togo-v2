export const dynamic = 'force-dynamic'

async function getLegalMattersData() {
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    const res = await fetch(SERVER_PATH + '/api/legal-matters', {
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

export default async function ConfidentialityPage() {
  const legalMatters = await getLegalMattersData();
  return (
    <div className="mx-auto px-5 min-h-screen">
      <div className="container max-w-4xl py-12">
        <h1 className="title mb-6">Politique de protection des données</h1>

        <p className="mb-6 text-gray-700">
          La présente politique décrit la manière dont <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.associationName || '[Nom de l\'association]'}</strong> (ci-après « l'Association »)
          traite vos données à caractère personnel dans le respect du Règlement (UE) 2016/679 dit RGPD et de la loi
          togolaise n°2019-014 relative à la protection des données à caractère personnel.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">1. Responsable du traitement</h2>
        <p className="mb-6 text-gray-700">
          Responsable: <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.associationName || '[Nom de l\'association]'}</strong> – <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.address.street || '[Adresse postale]'}</strong> – <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.address.city || '[Ville, Pays]'}</strong>.<br />
          Représentant légal: <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.legalRepresentative || 'Koffi Azanli'}</strong>.<br />
          Contact par email: <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.contactEmail || '[Email de contact]'}</strong> 
          <br/>{legalMatters?.associationInfo.contactPhone ? `Contact via téléphone: ${legalMatters.associationInfo.contactPhone}` : ''}.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">2. Données collectées et finalités</h2>
        <p className="mb-4 text-gray-700">
          À ce jour, le site ne comporte <strong>aucun formulaire</strong>. Les seules données susceptibles d’être traitées sont :
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Données techniques de navigation (adresse IP, logs techniques) à des fins de sécurité et de bon fonctionnement du site (intérêt légitime).</li>
          <li>Statistiques anonymisées d’audience et de performance (si activées ultérieurement, avec consentement si cookies non indispensables).</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8">3. Bases légales</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Intérêt légitime (sécurité du site, prévention des abus, maintenance technique).</li>
          <li>Consentement (uniquement pour cookies/traceurs non essentiels qui pourraient être ajoutés ultérieurement).</li>
          <li>Obligations légales (réponse à des demandes d’autorités compétentes le cas échéant).</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8">4. Destinataires et sous-traitants</h2>
        <p className="mb-6 text-gray-700">
          Les données techniques peuvent être traitées par nos prestataires d'hébergement et de maintenance (<strong className="text-gray-600 font-semibold">{legalMatters?.technicalInfo.hostingProvider || 'Vercel'}</strong>),
          dans le cadre de contrats conformes au RGPD et à la loi togolaise n°2019-014.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">5. Transferts de données</h2>
        <p className="mb-6 text-gray-700">
          Nos données techniques peuvent être traitées par Vercel (hébergeur principal) qui dispose de serveurs en Europe (Frankfurt, Amsterdam) 
          et aux États-Unis. En cas de transfert hors de l'Union européenne, des garanties appropriées sont mises en place 
          (clauses contractuelles types, garanties équivalentes) conformément au RGPD.           L'<strong className="text-gray-600 font-semibold">{legalMatters?.dataProtectionAuthority.authorityName || 'APDP - Autorité de protection des données du Togo'}</strong> 
          peut être consultée si nécessaire.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">6. Durées de conservation</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Logs techniques et sécurité: durée strictement nécessaire (généralement quelques jours à quelques semaines).</li>
          <li>Mesure d’audience (si activée) : conformément aux recommandations (ex. 13 mois maximum pour certains cookies / 25 mois pour statistiques agrégées – à confirmer lors du déploiement de la CMP).</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8">7. Vos droits</h2>
        <p className="mb-2 text-gray-700">Conformément au RGPD et à la loi togolaise, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Droit d’accès, de rectification, d’effacement.</li>
          <li>Droit d’opposition et de limitation du traitement.</li>
          <li>Droit à la portabilité (lorsque applicable).</li>
          <li>Droit de définir des directives post-mortem (lorsque applicable).</li>
        </ul>
        <p className="mb-6 text-gray-700">
          Pour exercer vos droits: <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.contactEmail || '[Email de contact]'}</strong> ou <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.address.street || '[Adresse postale de l\'association]'}</strong>.
          Vous pouvez également introduire une réclamation auprès de l'<strong className="text-gray-600 font-semibold">{legalMatters?.dataProtectionAuthority.authorityName || 'APDP - Autorité de protection des données du Togo'}</strong> si vous estimez que vos droits ne sont pas respectés.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">8. Sécurité</h2>
        <p className="mb-6 text-gray-700">
          Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données (chiffrement TLS/HTTPS,
          contrôle d’accès, journalisation des accès, sauvegardes). Les accès aux données sont limités au strict besoin.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">9. Cookies et traceurs</h2>
        <p className="mb-6 text-gray-700">
          Le site ne dépose actuellement <strong>pas</strong> de cookies non essentiels. Une <strong>bannière de consentement (CMP)</strong> sera ajoutée si des cookies
          de mesure d’audience, de personnalisation ou tiers sont mis en place ultérieurement. Vous pourrez alors accepter, refuser ou paramétrer vos préférences.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">10. Mise à jour de la politique</h2>
        <p className="mb-6 text-gray-700">
          La présente politique peut être mise à jour pour tenir compte des évolutions légales, techniques ou organisationnelles.
          Date de dernière mise à jour: <strong className="text-gray-600 font-semibold">{legalMatters?.technicalInfo.lastUpdated || new Date().toISOString().split('T')[0]}</strong>.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">11. Contact</h2>
        <p className="mb-2 text-gray-700">
          Pour toute question, vous pouvez contacter : <strong className="text-gray-600 font-semibold">{legalMatters?.associationInfo.contactEmail || '[Email de contact]'}</strong>.
        </p>
        <p className="mb-6 text-gray-700">
          Références légales: <strong className="text-gray-600 font-semibold">{legalMatters?.legalReferences.rgpdReference || 'RGPD (UE 2016/679)'}</strong> et <strong className="text-gray-600 font-semibold">{legalMatters?.legalReferences.togoleseLawReference || 'Loi togolaise n°2019-014 relative à la protection des données à caractère personnel'}</strong>.
        </p>
      </div>
    </div>
  )
}


