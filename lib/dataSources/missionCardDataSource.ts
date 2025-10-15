import { DataSource, getDataSourceConfig } from '@/lib/config/dataSource';
import { MissionCardDto } from '@/lib/dto/MissionCardDto';
import { MissionCardMapper } from '@/lib/mappers/MissionCardMapper';
import { fetchMissionCards as fetchSanityMissionCards } from '@/sanity/lib/fetchMissionCards';

// Keep the old interface for backward compatibility
export interface MissionCard extends MissionCardDto {}

export interface MissionCardDataSource {
  fetchMissionCards(): Promise<MissionCard[]>;
  fetchMissionCardById(id: string): Promise<MissionCard | null>;
}

class SanityMissionCardDataSource implements MissionCardDataSource {
  async fetchMissionCards(): Promise<MissionCard[]> {
    try {
      const missionCards = await fetchSanityMissionCards();
      if (!missionCards || missionCards.length === 0) {
        console.log('No mission cards found in Sanity');
        return [];
      }
      return missionCards.map(MissionCardMapper.fromSanity);
    } catch (error) {
      console.log('Error fetching mission cards from Sanity, returning empty array:', error);
      return [];
    }
  }

  async fetchMissionCardById(id: string): Promise<MissionCard | null> {
    try {
      const missionCards = await this.fetchMissionCards();
      return missionCards.find(mc => mc.id === id) || null;
    } catch (error) {
      console.error('Error fetching mission card by id from Sanity:', error);
      throw error;
    }
  }
}

class SupabaseMissionCardDataSource implements MissionCardDataSource {
  async fetchMissionCards(): Promise<MissionCard[]> {
    // Implement Supabase fetching logic here
    return [];
  }

  async fetchMissionCardById(id: string): Promise<MissionCard | null> {
    // Implement Supabase fetching logic here
    return null;
  }
}

class JsonMissionCardDataSource implements MissionCardDataSource {
  async fetchMissionCards(): Promise<MissionCard[]> {
    try {
      const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH;
      
      const response = await fetch(`${SERVER_PATH}/mission-cards.json`);
      
      if (!response.ok) {
        console.log('No mission-cards.json file found, returning empty array');
        return [];
      }
      
      const missionCards = await response.json();
      if (!missionCards || missionCards.length === 0) {
        console.log('No mission cards found in JSON file');
        return [];
      }
      return missionCards.map(MissionCardMapper.fromJson);
    } catch (error) {
      console.log('Error fetching mission cards from JSON, returning empty array:', error);
      return [];
    }
  }

  async fetchMissionCardById(id: string): Promise<MissionCard | null> {
    try {
      const missionCards = await this.fetchMissionCards();
      return missionCards.find(mc => mc.id === id) || null;
    } catch (error) {
      console.error('Error fetching mission card by id from JSON:', error);
      throw error;
    }
  }
}

export class MissionCardDataSourceFactory {
  static create(source: DataSource): MissionCardDataSource {
    switch (source) {
      case 'sanity':
        return new SanityMissionCardDataSource();
      case 'supabase':
        return new SupabaseMissionCardDataSource();
      case 'json':
        return new JsonMissionCardDataSource();
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }

  static async fetchMissionCards(): Promise<MissionCard[]> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      const missionCards = await source.fetchMissionCards();
      
      return missionCards;
    } catch (error) {
      console.log(`Error with data source (${config.source}), returning empty array:`, error);
      return [];
    }
  }

  static async fetchMissionCardById(id: string): Promise<MissionCard | null> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      return await source.fetchMissionCardById(id);
    } catch (error) {
      console.error(`Error with data source (${config.source}):`, error);
      throw error;
    }
  }
}
