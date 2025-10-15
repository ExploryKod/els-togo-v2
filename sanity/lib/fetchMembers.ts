import { client } from './client';
import { membersQuery } from './queries';

export interface SanityMember {
  _id: string;
  firstname?: string;
  name: string;
  role: string;
  bio?: string;
  memberImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: any;
    crop?: any;
    alt?: string;
  };
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export async function fetchMembers(): Promise<SanityMember[]> {
  try {
    const members = await client.fetch(membersQuery);
    return members || [];
  } catch (error) {
    console.error('Error fetching members from Sanity:', error);
    throw error;
  }
}
