import { LegalMattersDto } from '@/lib/dto/LegalMattersDto';

export class LegalMattersMapper {
  static fromSanity(sanityData: any): LegalMattersDto {
    return {
      id: sanityData._id || 'legal-matters',
      associationInfo: {
        associationName: sanityData.associationInfo?.associationName || '[Nom de l\'association]',
        legalRepresentative: sanityData.associationInfo?.legalRepresentative || 'Koffi Azanli',
        address: {
          street: sanityData.associationInfo?.address?.street || '[Adresse postale]',
          city: sanityData.associationInfo?.address?.city || '[Ville, Pays]',
          country: sanityData.associationInfo?.address?.country || 'Togo',
        },
        contactEmail: sanityData.associationInfo?.contactEmail || '[Email de contact]',
        contactPhone: sanityData.associationInfo?.contactPhone || '[Téléphone]',
      },
      technicalInfo: {
        hostingProvider: sanityData.technicalInfo?.hostingProvider || 'Vercel',
        lastUpdated: sanityData.technicalInfo?.lastUpdated || new Date().toISOString().split('T')[0],
      },
      dataProtectionAuthority: {
        authorityName: sanityData.dataProtectionAuthority?.authorityName || 'APDP - Autorité de protection des données du Togo',
        authorityWebsite: sanityData.dataProtectionAuthority?.authorityWebsite || '',
      },
      legalReferences: {
        rgpdReference: sanityData.legalReferences?.rgpdReference || 'Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016',
        togoleseLawReference: sanityData.legalReferences?.togoleseLawReference || 'Loi togolaise n°2019-014 relative à la protection des données à caractère personnel',
      },
    };
  }

  static fromJson(jsonData: any): LegalMattersDto {
    return {
      id: jsonData.id || 'legal-matters',
      associationInfo: {
        associationName: jsonData.associationInfo?.associationName || '[Nom de l\'association]',
        legalRepresentative: jsonData.associationInfo?.legalRepresentative || 'Koffi Azanli',
        address: {
          street: jsonData.associationInfo?.address?.street || '[Adresse postale]',
          city: jsonData.associationInfo?.address?.city || '[Ville, Pays]',
          country: jsonData.associationInfo?.address?.country || 'Togo',
        },
        contactEmail: jsonData.associationInfo?.contactEmail || '[Email de contact]',
        contactPhone: jsonData.associationInfo?.contactPhone || '[Téléphone]',
      },
      technicalInfo: {
        hostingProvider: jsonData.technicalInfo?.hostingProvider || 'Vercel',
        lastUpdated: jsonData.technicalInfo?.lastUpdated || new Date().toISOString().split('T')[0],
      },
      dataProtectionAuthority: {
        authorityName: jsonData.dataProtectionAuthority?.authorityName || 'APDP - Autorité de protection des données du Togo',
        authorityWebsite: jsonData.dataProtectionAuthority?.authorityWebsite || '',
      },
      legalReferences: {
        rgpdReference: jsonData.legalReferences?.rgpdReference || 'Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016',
        togoleseLawReference: jsonData.legalReferences?.togoleseLawReference || 'Loi togolaise n°2019-014 relative à la protection des données à caractère personnel',
      },
    };
  }

  static createFallback(): LegalMattersDto {
    return {
      id: 'fallback-legal-matters',
      associationInfo: {
        associationName: '[Nom de l\'association]',
        legalRepresentative: 'Koffi Azanli',
        address: {
          street: '[Adresse postale]',
          city: '[Ville, Pays]',
          country: 'Togo',
        },
        contactEmail: '[Email de contact]',
        contactPhone: '[Téléphone]',
      },
      technicalInfo: {
        hostingProvider: 'Vercel',
        lastUpdated: new Date().toISOString().split('T')[0],
      },
      dataProtectionAuthority: {
        authorityName: 'APDP - Autorité de protection des données du Togo',
        authorityWebsite: '',
      },
      legalReferences: {
        rgpdReference: 'Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016',
        togoleseLawReference: 'Loi togolaise n°2019-014 relative à la protection des données à caractère personnel',
      },
    };
  }
}
