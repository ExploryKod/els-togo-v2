import { LegalNoticesDto } from '@/lib/dto/LegalNoticesDto';

export class LegalNoticesMapper {
  static fromSanity(sanityData: any): LegalNoticesDto {
    return {
      id: sanityData._id || 'legal-notices',
      siteInfo: {
        siteUrl: sanityData.siteInfo?.siteUrl || 'https://www.els-togo.org',
        siteDescription: sanityData.siteInfo?.siteDescription || 'Site web de l\'Association ELS - Togo',
      },
      organizationInfo: {
        organizationName: sanityData.organizationInfo?.organizationName || 'Association ELS - Togo',
        legalForm: sanityData.organizationInfo?.legalForm || 'Association',
        capital: sanityData.organizationInfo?.capital || '',
        registrationNumber: sanityData.organizationInfo?.registrationNumber || '',
        registrationOffice: sanityData.organizationInfo?.registrationOffice || '',
        address: {
          street: sanityData.organizationInfo?.address?.street || 'Lomé, Togo',
          city: sanityData.organizationInfo?.address?.city || 'Lomé',
          country: sanityData.organizationInfo?.address?.country || 'Togo',
        },
        contactPhone: sanityData.organizationInfo?.contactPhone || '+228 90 12 34 56',
      },
      publicationDirector: {
        name: sanityData.publicationDirector?.name || 'Kokou Jacques Kpeglo Bessou',
        position: sanityData.publicationDirector?.position || 'Président du Conseil d\'Administration',
      },
      hostingInfo: {
        providerName: sanityData.hostingInfo?.providerName || 'Vercel Inc.',
        providerAddress: {
          street: sanityData.hostingInfo?.providerAddress?.street || '340 S Lemon Ave #4133',
          city: sanityData.hostingInfo?.providerAddress?.city || 'Walnut, CA 91789',
          country: sanityData.hostingInfo?.providerAddress?.country || 'États-Unis',
        },
        providerPhone: sanityData.hostingInfo?.providerPhone || '(559) 288-7060',
        providerWebsite: sanityData.hostingInfo?.providerWebsite || 'https://vercel.com/',
      },
      disclaimers: {
        contentDisclaimer: sanityData.disclaimers?.contentDisclaimer || 'Le contenu de ce site est édité sous réserve d\'erreurs techniques et/ou typographiques. L\'Association ELS - Togo ne saurait donc être tenue responsable quant à l\'exactitude des informations mises à disposition des utilisateurs.',
        copyrightNotice: sanityData.disclaimers?.copyrightNotice || 'Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.',
        liabilityDisclaimer: sanityData.disclaimers?.liabilityDisclaimer || 'L\'Association ELS - Togo ne peut garantir que le fonctionnement du site sera exempt d\'interruptions ou d\'erreurs. La responsabilité de l\'association ne saurait être engagée pour les dommages résultant de l\'utilisation du site.',
      },
    };
  }

  static fromJson(jsonData: any): LegalNoticesDto {
    return {
      id: jsonData.id || 'legal-notices',
      siteInfo: {
        siteUrl: jsonData.siteInfo?.siteUrl || 'https://www.els-togo.org',
        siteDescription: jsonData.siteInfo?.siteDescription || 'Site web de l\'Association ELS - Togo',
      },
      organizationInfo: {
        organizationName: jsonData.organizationInfo?.organizationName || 'Association ELS - Togo',
        legalForm: jsonData.organizationInfo?.legalForm || 'Association',
        capital: jsonData.organizationInfo?.capital || '',
        registrationNumber: jsonData.organizationInfo?.registrationNumber || '',
        registrationOffice: jsonData.organizationInfo?.registrationOffice || '',
        address: {
          street: jsonData.organizationInfo?.address?.street || 'Lomé, Togo',
          city: jsonData.organizationInfo?.address?.city || 'Lomé',
          country: jsonData.organizationInfo?.address?.country || 'Togo',
        },
        contactPhone: jsonData.organizationInfo?.contactPhone || '+228 90 12 34 56',
      },
      publicationDirector: {
        name: jsonData.publicationDirector?.name || 'Kokou Jacques Kpeglo Bessou',
        position: jsonData.publicationDirector?.position || 'Président du Conseil d\'Administration',
      },
      hostingInfo: {
        providerName: jsonData.hostingInfo?.providerName || 'Vercel Inc.',
        providerAddress: {
          street: jsonData.hostingInfo?.providerAddress?.street || '340 S Lemon Ave #4133',
          city: jsonData.hostingInfo?.providerAddress?.city || 'Walnut, CA 91789',
          country: jsonData.hostingInfo?.providerAddress?.country || 'États-Unis',
        },
        providerPhone: jsonData.hostingInfo?.providerPhone || '(559) 288-7060',
        providerWebsite: jsonData.hostingInfo?.providerWebsite || 'https://vercel.com/',
      },
      disclaimers: {
        contentDisclaimer: jsonData.disclaimers?.contentDisclaimer || 'Le contenu de ce site est édité sous réserve d\'erreurs techniques et/ou typographiques. L\'Association ELS - Togo ne saurait donc être tenue responsable quant à l\'exactitude des informations mises à disposition des utilisateurs.',
        copyrightNotice: jsonData.disclaimers?.copyrightNotice || 'Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.',
        liabilityDisclaimer: jsonData.disclaimers?.liabilityDisclaimer || 'L\'Association ELS - Togo ne peut garantir que le fonctionnement du site sera exempt d\'interruptions ou d\'erreurs. La responsabilité de l\'association ne saurait être engagée pour les dommages résultant de l\'utilisation du site.',
      },
    };
  }
}
