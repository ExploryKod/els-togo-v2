import { DataSource, getDataSourceConfig } from '@/lib/config/dataSource';
import { MemberDto } from '@/lib/dto/MemberDto';
import { MemberMapper } from '@/lib/mappers/MemberMapper';
import { fetchMembers as fetchSanityMembers } from '@/sanity/lib/fetchMembers';

// Keep the old interface for backward compatibility
export interface Member extends MemberDto {}

export interface MemberDataSource {
  fetchMembers(): Promise<Member[]>;
  fetchMemberById(id: string): Promise<Member | null>;
}

class SanityMemberDataSource implements MemberDataSource {
  async fetchMembers(): Promise<Member[]> {
    try {
      const members = await fetchSanityMembers();
      if (!members || members.length === 0) {
        console.log('No members found in Sanity');
        return [];
      }
      return members.map(MemberMapper.fromSanity);
    } catch (error) {
      console.log('Error fetching members from Sanity, returning empty array:', error);
      return [];
    }
  }

  async fetchMemberById(id: string): Promise<Member | null> {
    try {
      const members = await this.fetchMembers();
      return members.find(m => m.id === id) || null;
    } catch (error) {
      console.error('Error fetching member by ID from Sanity:', error);
      throw error;
    }
  }
}

class SupabaseMemberDataSource implements MemberDataSource {
  async fetchMembers(): Promise<Member[]> {
    try {
      // TODO: Implement Supabase member fetching
      console.log('Supabase member fetching not yet implemented');
      return [];
    } catch (error) {
      console.error('Error fetching members from Supabase:', error);
      throw error;
    }
  }

  async fetchMemberById(id: string): Promise<Member | null> {
    try {
      const members = await this.fetchMembers();
      return members.find(m => m.id === id) || null;
    } catch (error) {
      console.error('Error fetching member by ID from Supabase:', error);
      throw error;
    }
  }
}

class JsonMemberDataSource implements MemberDataSource {
  async fetchMembers(): Promise<Member[]> {
    try {
      const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH;
      
      const response = await fetch(`${SERVER_PATH}/members.json`);
      
      if (!response.ok) {
        console.log('No members.json file found, returning empty array');
        return [];
      }
      
      const members = await response.json();
      if (!members || members.length === 0) {
        console.log('No members found in JSON file');
        return [];
      }
      return members.map(MemberMapper.fromJson);
    } catch (error) {
      console.log('Error fetching members from JSON, returning empty array:', error);
      return [];
    }
  }

  async fetchMemberById(id: string): Promise<Member | null> {
    try {
      const members = await this.fetchMembers();
      return members.find(m => m.id === id) || null;
    } catch (error) {
      console.error('Error fetching member by ID from JSON:', error);
      throw error;
    }
  }
}

export class MemberDataSourceFactory {
  static create(source: DataSource): MemberDataSource {
    switch (source) {
      case 'sanity':
        return new SanityMemberDataSource();
      case 'supabase':
        return new SupabaseMemberDataSource();
      case 'json':
        return new JsonMemberDataSource();
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }

  static async fetchMembers(): Promise<Member[]> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      const members = await source.fetchMembers();
      
      return members;
    } catch (error) {
      console.log(`Error with data source (${config.source}), returning empty array:`, error);
      return [];
    }
  }

  static async fetchMemberById(id: string): Promise<Member | null> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      return await source.fetchMemberById(id);
    } catch (error) {
      console.error(`Error with data source (${config.source}):`, error);
      throw error;
    }
  }
}
