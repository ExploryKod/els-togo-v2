import { LegalMattersDto } from '@/lib/dto/LegalMattersDto';
import { sanityFetch } from '@/sanity/lib/fetch';
import { legalMattersQuery } from '@/sanity/lib/queries';
import { LegalMattersMapper } from '@/lib/mappers/LegalMattersMapper';

export interface LegalMattersDataSource {
  fetchLegalMatters(): Promise<LegalMattersDto>;
}

class SanityLegalMattersDataSource implements LegalMattersDataSource {
  async fetchLegalMatters(): Promise<LegalMattersDto> {
    try {
      const data = await sanityFetch({
        query: legalMattersQuery,
        tags: ['legal-matters'],
      });
      
      return LegalMattersMapper.fromSanity(data);
    } catch (error) {
      return LegalMattersMapper.createFallback();
    }
  }
}

class JsonLegalMattersDataSource implements LegalMattersDataSource {
  async fetchLegalMatters(): Promise<LegalMattersDto> {
    try {
      const response = await fetch('/legal-matters.json');
      if (!response.ok) {
        throw new Error('Failed to fetch legal matters data');
      }
      const data = await response.json();
      return LegalMattersMapper.fromJson(data);
    } catch (error) {
      return LegalMattersMapper.createFallback();
    }
  }
}

export class LegalMattersDataSourceFactory {
  static create(source: 'sanity' | 'json'): LegalMattersDataSource {
    switch (source) {
      case 'sanity':
        return new SanityLegalMattersDataSource();
      case 'json':
        return new JsonLegalMattersDataSource();
      default:
        return new SanityLegalMattersDataSource();
    }
  }

  static async fetchLegalMatters(): Promise<LegalMattersDto> {
    try {
      const source = this.create('sanity');
      return await source.fetchLegalMatters();
    } catch (error) {
      // Fallback to JSON if Sanity fails
      try {
        const jsonSource = new JsonLegalMattersDataSource();
        return await jsonSource.fetchLegalMatters();
      } catch (jsonError) {
        return LegalMattersMapper.createFallback();
      }
    }
  }
}
