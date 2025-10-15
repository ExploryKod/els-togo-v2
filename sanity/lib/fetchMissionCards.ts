import { client } from './client';
import { missionCardsQuery } from './queries';

export interface SanityMissionCard {
  _id: string;
  title: string;
  text: string;
  iconImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: any;
    crop?: any;
    alt?: string;
  };
  order?: number;
}

export async function fetchMissionCards(): Promise<SanityMissionCard[]> {
  try {
    const missionCards = await client.fetch<SanityMissionCard[]>(missionCardsQuery);
    return missionCards || [];
  } catch (error) {
    return [];
  }
}
