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
        return [];
      }
      return members.map(MemberMapper.fromSanity);
    } catch (error) {
      return [];
    }
  }

  async fetchMemberById(id: string): Promise<Member | null> {
    try {
      const members = await this.fetchMembers();
      return members.find(m => m.id === id) || null;
    } catch (error) {
      throw error;
    }
  }
}

class SupabaseMemberDataSource implements MemberDataSource {
  async fetchMembers(): Promise<Member[]> {
    try {
      // TODO: Implement Supabase member fetching
      return [];
    } catch (error) {
      throw error;
    }
  }

  async fetchMemberById(id: string): Promise<Member | null> {
    try {
      const members = await this.fetchMembers();
      return members.find(m => m.id === id) || null;
    } catch (error) {
      throw error;
    }
  }
}

class JsonMemberDataSource implements MemberDataSource {
  async fetchMembers(): Promise<Member[]> {
    try {
      // Try multiple URL strategies for better production compatibility
      const urls = [
        // Production URL
        process.env.ROOT_PATH ? `${process.env.ROOT_PATH}/members.json` : null,
        // Development URL
        process.env.ROOT_DEV ? `${process.env.ROOT_DEV}/members.json` : null,
        // Relative URL (works in most cases)
        '/members.json',
        // Absolute URL with current origin
        typeof window !== 'undefined' ? `${window.location.origin}/members.json` : null,
      ].filter(Boolean);
      
      for (const url of urls) {
        try {
          const response = await fetch(url as string);
          
          if (response.ok) {
            const members = await response.json();
            if (members && members.length > 0) {
              return members.map(MemberMapper.fromJson);
            }
          }
        } catch (urlError) {
          // Try next URL
          continue;
        }
      }
      
      return [];
    } catch (error) {
      return [];
    }
  }

  async fetchMemberById(id: string): Promise<Member | null> {
    try {
      const members = await this.fetchMembers();
      return members.find(m => m.id === id) || null;
    } catch (error) {
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
      
      // If we got members from the primary source, return them
      if (members && members.length > 0) {
        return members;
      }
      
      // If primary source returned empty, try JSON fallback
      if (config.source !== 'json') {
        const jsonSource = new JsonMemberDataSource();
        const jsonMembers = await jsonSource.fetchMembers();
        if (jsonMembers && jsonMembers.length > 0) {
          return jsonMembers;
        }
      }
      
      return members || [];
    } catch (error) {
      // If primary source fails, try JSON fallback
      if (config.source !== 'json') {
        try {
          const jsonSource = new JsonMemberDataSource();
          const jsonMembers = await jsonSource.fetchMembers();
          if (jsonMembers && jsonMembers.length > 0) {
            return jsonMembers;
          }
        } catch (jsonError) {
          // Both sources failed
        }
      }
      return [];
    }
  }

  static async fetchMemberById(id: string): Promise<Member | null> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      return await source.fetchMemberById(id);
    } catch (error) {
      throw error;
    }
  }
}
