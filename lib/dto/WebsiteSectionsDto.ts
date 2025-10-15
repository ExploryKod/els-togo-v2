export interface SectionText {
  pretitle?: string;
  title?: string;
  text?: string;
  buttonData?: {
    url: string;
    text: string;
  };
}

export interface ContactInfo {
  address: string;
  schedules: string;
  phone: string;
  email: string;
}

export interface WebsiteSectionsDto {
  id: string;
  heroSection: SectionText[];
  projectSection: SectionText[];
  missionSection: SectionText[];
  teamSection: SectionText[];
  contactSection: SectionText[];
  contactInfo: ContactInfo[];
}

export interface WebsiteSectionsDisplayDto extends WebsiteSectionsDto {
  hasHeroData: boolean;
  hasProjectData: boolean;
  hasMissionData: boolean;
  hasTeamData: boolean;
  hasContactData: boolean;
  hasContactInfo: boolean;
}
