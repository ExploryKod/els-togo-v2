export interface SiteInfo {
  siteUrl: string;
  siteDescription: string;
}

export interface OrganizationInfo {
  organizationName: string;
  legalForm: string;
  capital?: string;
  registrationNumber?: string;
  registrationOffice?: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  contactPhone?: string;
}

export interface PublicationDirector {
  name: string;
  position: string;
}

export interface HostingInfo {
  providerName: string;
  providerAddress: {
    street: string;
    city: string;
    country: string;
  };
  providerPhone?: string;
  providerWebsite?: string;
}

export interface Disclaimers {
  contentDisclaimer: string;
  copyrightNotice: string;
  liabilityDisclaimer: string;
}

export interface LegalNoticesDto {
  id: string;
  siteInfo: SiteInfo;
  organizationInfo: OrganizationInfo;
  publicationDirector: PublicationDirector;
  hostingInfo: HostingInfo;
  disclaimers: Disclaimers;
}
