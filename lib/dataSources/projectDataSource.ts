import { DataSource, getDataSourceConfig, shouldUseFallback } from '@/lib/config/dataSource';
import { fetchProjects as fetchSanityProjects } from '@/sanity/lib/fetchProjects';
import { ProjectDto } from '@/lib/dto/ProjectDto';
import { ProjectMapper } from '@/lib/mappers/ProjectMapper';

// Keep the old interface for backward compatibility
export interface Project extends ProjectDto {}

export interface ProjectDataSource {
  fetchProjects(): Promise<Project[]>;
  fetchProjectBySlug(slug: string): Promise<Project | null>;
}

class SanityProjectDataSource implements ProjectDataSource {
  async fetchProjects(): Promise<Project[]> {
    try {
      const projects = await fetchSanityProjects();
      return projects.map(ProjectMapper.fromSanity);
    } catch (error) {
      throw error;
    }
  }

  async fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const projects = await this.fetchProjects();
      return projects.find(p => p.slug === slug) || null;
    } catch (error) {
      throw error;
    }
  }
}

class SupabaseProjectDataSource implements ProjectDataSource {
  async fetchProjects(): Promise<Project[]> {
    try {
      // TODO: Implement Supabase project fetching
      // const { data } = await supabase.from('projects').select('*');
      // return this.transformSupabaseProjects(data);
      
      // For now, return empty array as placeholder
      return [];
    } catch (error) {
      throw error;
    }
  }

  async fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const projects = await this.fetchProjects();
      return projects.find(p => p.slug === slug) || null;
    } catch (error) {
      throw error;
    }
  }
}

class JsonProjectDataSource implements ProjectDataSource {
  async fetchProjects(): Promise<Project[]> {
    try {
      const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH;
      
      const response = await fetch(`${SERVER_PATH}/project.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch projects from JSON: ${response.status} ${response.statusText}`);
      }
      
      const projects = await response.json();
      return projects.map(ProjectMapper.fromJson);
    } catch (error) {
      throw error;
    }
  }

  async fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const projects = await this.fetchProjects();
      return projects.find(p => p.slug === slug) || null;
    } catch (error) {
      throw error;
    }
  }

}

export class ProjectDataSourceFactory {
  static create(source: DataSource): ProjectDataSource {
    switch (source) {
      case 'sanity':
        return new SanityProjectDataSource();
      case 'supabase':
        return new SupabaseProjectDataSource();
      case 'json':
        return new JsonProjectDataSource();
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }

  static async fetchProjectsWithFallback(): Promise<Project[]> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      const projects = await source.fetchProjects();
      
      return projects;
    } catch (error) {
      throw error;
    }
  }

  static async fetchProjectBySlugWithFallback(slug: string): Promise<Project | null> {
    const config = getDataSourceConfig();
    
    try {
      const source = this.create(config.source);
      return await source.fetchProjectBySlug(slug);
    } catch (error) {
      throw error;
    }
  }
}
