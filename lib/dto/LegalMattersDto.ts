export interface AssociationInfo {
  associationName: string;
  legalRepresentative: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  contactEmail: string;
  contactPhone?: string;
}

export interface TechnicalInfo {
  hostingProvider?: string;
  lastUpdated: string; // ISO date string
}

export interface DataProtectionAuthority {
  authorityName: string;
  authorityWebsite?: string;
}

export interface LegalReferences {
  rgpdReference: string;
  togoleseLawReference: string;
}

export interface LegalMattersDto {
  id: string;
  associationInfo: AssociationInfo;
  technicalInfo: TechnicalInfo;
  dataProtectionAuthority: DataProtectionAuthority;
  legalReferences: LegalReferences;
}
