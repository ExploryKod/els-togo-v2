import { client } from './client';
import { categoriesQuery } from './queries';

export interface SanityCategory {
  _id: string;
  title: string;
  description?: string;
  color?: string;
}

export async function fetchCategories(): Promise<SanityCategory[]> {
  try {
    const categories = await client.fetch(categoriesQuery);
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error);
    return [];
  }
}
