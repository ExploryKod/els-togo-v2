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
  console.log('🔧 fetchWebsiteSections - Starting...');
  try {
    console.log('🔧 fetchWebsiteSections - Query:', websiteSectionsQuery);
    const sections = await client.fetch<SanityWebsiteSections>(websiteSectionsQuery);
    console.log('🔧 fetchWebsiteSections - Raw result:', sections);
    return sections || null;
  } catch (error) {
    console.error('Error fetching website sections from Sanity:', error);
    return null;
  }
}
