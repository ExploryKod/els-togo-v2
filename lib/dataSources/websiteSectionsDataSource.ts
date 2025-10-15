import { DataSource, getDataSourceConfig } from '@/lib/config/dataSource';
import { WebsiteSectionsDto } from '@/lib/dto/WebsiteSectionsDto';
import { WebsiteSectionsMapper } from '@/lib/mappers/WebsiteSectionsMapper';
import { fetchWebsiteSections as fetchSanityWebsiteSections } from '@/sanity/lib/fetchWebsiteSections';

export interface WebsiteSectionsDataSource {
  fetchWebsiteSections(): Promise<WebsiteSectionsDto>;
}

class SanityWebsiteSectionsDataSource implements WebsiteSectionsDataSource {
  async fetchWebsiteSections(): Promise<WebsiteSectionsDto> {
    console.log('🔧 SanityWebsiteSectionsDataSource - Starting fetch...');
    try {
      const sections = await fetchSanityWebsiteSections();
      console.log('🔧 SanityWebsiteSectionsDataSource - Raw Sanity data:', sections);
      if (!sections) {
        console.log('No website sections found in Sanity, using fallback');
        return WebsiteSectionsMapper.createFallback();
      }
      const mapped = WebsiteSectionsMapper.fromSanity(sections);
      console.log('🔧 SanityWebsiteSectionsDataSource - Mapped data:', mapped);
      return mapped;
    } catch (error) {
      console.log('Error fetching website sections from Sanity, using fallback:', error);
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
        console.log('No website-sections.json file found, using fallback');
        return WebsiteSectionsMapper.createFallback();
      }
      
      const sections = await response.json();
      if (!sections) {
        console.log('No website sections found in JSON file, using fallback');
        return WebsiteSectionsMapper.createFallback();
      }
      return WebsiteSectionsMapper.fromJson(sections);
    } catch (error) {
      console.log('Error fetching website sections from JSON, using fallback:', error);
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
    
    console.log('🔧 WebsiteSectionsDataSourceFactory - Config:', config);
    
    try {
      const source = this.create(config.source);
      console.log('🔧 WebsiteSectionsDataSourceFactory - Created source:', config.source);
      const result = await source.fetchWebsiteSections();
      console.log('🔧 WebsiteSectionsDataSourceFactory - Result:', result);
      return result;
    } catch (error) {
      console.log(`Error with data source (${config.source}), using fallback:`, error);
      return WebsiteSectionsMapper.createFallback();
    }
  }
}
