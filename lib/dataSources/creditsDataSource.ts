import { Credits } from '@/lib/dto/CreditsDto';
import { mapCreditsFromSanity } from '@/lib/mappers/CreditsMapper';
import { sanityFetch } from '@/sanity/lib/fetch';
import { creditsQuery } from '@/sanity/lib/queries';
import { CreditsQueryResult } from '@/sanity.types';
import creditsFallback from '@/public/credits.json';

export async function getCredits(): Promise<Credits> {
  try {
    const data = await sanityFetch<CreditsQueryResult>({
      query: creditsQuery,
    });

    if (data) {
      return mapCreditsFromSanity(data);
    }

    // Fallback to JSON data
    return mapCreditsFromSanity(creditsFallback as CreditsQueryResult);
  } catch (error) {
    console.error('Error fetching credits:', error);
    // Fallback to JSON data
    return mapCreditsFromSanity(creditsFallback as CreditsQueryResult);
  }
}
