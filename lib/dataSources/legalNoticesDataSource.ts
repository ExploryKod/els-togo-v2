import { LegalNoticesDto } from '@/lib/dto/LegalNoticesDto';
import { LegalNoticesMapper } from '@/lib/mappers/LegalNoticesMapper';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const LEGAL_NOTICES_QUERY = groq`
  *[_type == "legalNotices"][0] {
    _id,
    siteInfo,
    organizationInfo,
    publicationDirector,
    hostingInfo,
    disclaimers
  }
`;

export async function getLegalNoticesFromSanity(): Promise<LegalNoticesDto | null> {
  try {
    const data = await client.fetch(LEGAL_NOTICES_QUERY);
    
    if (!data) {
      return null;
    }
    
    return LegalNoticesMapper.fromSanity(data);
  } catch (error) {
    console.error('Error fetching legal notices from Sanity:', error);
    return null;
  }
}

export async function getLegalNoticesFromJson(): Promise<LegalNoticesDto | null> {
  try {
    const response = await fetch('/legal-notices.json');
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return LegalNoticesMapper.fromJson(data);
  } catch (error) {
    console.error('Error fetching legal notices from JSON:', error);
    return null;
  }
}

export async function getLegalNotices(): Promise<LegalNoticesDto | null> {
  const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE || 'sanity';
  
  if (dataSource === 'sanity') {
    const sanityData = await getLegalNoticesFromSanity();
    if (sanityData) {
      return sanityData;
    }
    
    // Fallback to JSON if Sanity fails
    return await getLegalNoticesFromJson();
  }
  
  // Use JSON as fallback
  return await getLegalNoticesFromJson();
}
