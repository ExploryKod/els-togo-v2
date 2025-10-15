import { DataSource, getDataSourceConfig } from '@/lib/config/dataSource';
import { WebsiteSectionsDto } from '@/lib/dto/WebsiteSectionsDto';
import { WebsiteSectionsMapper } from '@/lib/mappers/WebsiteSectionsMapper';
import { fetchWebsiteSections as fetchSanityWebsiteSections } from '@/sanity/lib/fetchWebsiteSections';

export interface WebsiteSectionsDataSource {
  fetchWebsiteSections(): Promise<WebsiteSectionsDto>;
}

class SanityWebsiteSectionsDataSource implements WebsiteSectionsDataSource {
  async fetchWebsiteSections(): Promise<WebsiteSectionsDto> {
    try {
      const sections = await fetchSanityWebsiteSections();
      if (!sections) {
        return WebsiteSectionsMapper.createFallback();
      }
      const mapped = WebsiteSectionsMapper.fromSanity(sections);
      return mapped;
    } catch (error) {
      return WebsiteSectionsMapper.createFallback();
    }
  }
}

class SupabaseWebsiteSectionsDataSource implements WebsiteSectionsDataSource {
  async fetchWebsiteSections(): Promise<WebsiteSectionsDto> {
    // Implement Supabase fetching logic here
    return WebsiteSectionsMapper.createFallback();
  }
}

class JsonWebsiteSectionsDataSource implements WebsiteSectionsDataSource {
  async fetchWebsiteSections(): Promise<WebsiteSectionsDto> {
    try {
      const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH;
      
      const response = await fetch(`${SERVER_PATH}/website-sections.json`);
      
      if (!response.ok) {
        return WebsiteSectionsMapper.createFallback();
      }
      
      const sections = await response.json();
      if (!sections) {
        return WebsiteSectionsMapper.createFallback();
      }
      return WebsiteSectionsMapper.fromJson(sections);
    } catch (error) {
      return WebsiteSectionsMapper.createFallback();
    }
  }
}

export class WebsiteSectionsDataSourceFactory {
  static create(source: DataSource): WebsiteSectionsDataSource {
    switch (source) {
      case 'sanity':
        return new SanityWebsiteSectionsDataSource();
      case 'supabase':
        return new SupabaseWebsiteSectionsDataSource();
      case 'json':
        return new JsonWebsiteSectionsDataSource();
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }

  static async fetchWebsiteSections(): Promise<WebsiteSectionsDto> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      const result = await source.fetchWebsiteSections();
      return result;
    } catch (error) {
      return WebsiteSectionsMapper.createFallback();
    }
  }
}
