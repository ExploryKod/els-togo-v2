import { client } from './client';
import { websiteSectionsQuery } from './queries';

export interface SanityWebsiteSections {
  _id: string;
  heroSection?: {
    pretitle?: string;
    title?: string;
    text?: string;
    buttonData?: {
      url: string;
      text: string;
    };
  };
  projectSection?: {
    pretitle?: string;
    text?: string;
  };
  missionSection?: {
    pretitle?: string;
    text?: string;
  };
  teamSection?: {
    pretitle?: string;
    title?: string;
    text?: string;
  };
  contactSection?: {
    title?: string;
    text?: string;
  };
  contactInfo?: {
    address: string;
    schedules: string;
    phone: string;
    email: string;
  };
}

export async function fetchWebsiteSections(): Promise<SanityWebsiteSections | null> {
  try {
    const sections = await client.fetch<SanityWebsiteSections>(websiteSectionsQuery);
    return sections || null;
  } catch (error) {
    return null;
  }
}
