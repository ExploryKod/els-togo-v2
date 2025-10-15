import { ProjectDto, MasonryProjectDto, ProjectDetailDto } from '@/lib/dto/ProjectDto';

/**
 * Mapper service for transforming project data between different sources and DTOs
 * Follows the Single Responsibility Principle - only handles data transformation
 */
export class ProjectMapper {
  /**
   * Maps Sanity project data to ProjectDto
   */
  static fromSanity(sanityProject: any): ProjectDto {
    return {
      id: sanityProject.id || sanityProject._id || '',
      slug: sanityProject.slug?.current || sanityProject.slug || '',
      title: sanityProject.title || '',
      accroche: sanityProject.accroche || '',
      description: sanityProject.description || '',
      goal: sanityProject.goal || '',
      howWeDo: sanityProject.howWeDo || '',
      results: sanityProject.results || '',
      date: sanityProject.date || '',
      place: sanityProject.place || '',
      category: sanityProject.category?.title || '',
      projectImg: ProjectMapper.getSanityImageUrl(sanityProject.projectImg) || '',
    };
  }

  /**
   * Maps JSON project data to ProjectDto
   */
  static fromJson(jsonProject: any): ProjectDto {
    return {
      id: jsonProject.id || jsonProject.slug || '',
      slug: jsonProject.slug || jsonProject.id || '',
      title: jsonProject.title || '',
      accroche: jsonProject.accroche || '',
      description: jsonProject.description || '',
      goal: jsonProject.goal || '',
      howWeDo: jsonProject['how-we-do'] || jsonProject.howWeDo || '',
      results: jsonProject.results || '',
      date: jsonProject.date || '',
      place: jsonProject.place || '',
      category: jsonProject.category || '',
      projectImg: jsonProject['project-img'] || jsonProject.projectImg || '',
    };
  }

  /**
   * Maps Supabase project data to ProjectDto
   */
  static fromSupabase(supabaseProject: any): ProjectDto {
    return {
      id: supabaseProject.id || '',
      slug: supabaseProject.slug || '',
      title: supabaseProject.title || '',
      accroche: supabaseProject.accroche || '',
      description: supabaseProject.description || '',
      goal: supabaseProject.goal || '',
      howWeDo: supabaseProject.howWeDo || '',
      results: supabaseProject.results || '',
      date: supabaseProject.date || '',
      place: supabaseProject.place || '',
      category: supabaseProject.category || '',
      projectImg: supabaseProject.projectImg || '',
    };
  }

  /**
   * Transforms ProjectDto to MasonryProjectDto for masonry layout
   */
  static toMasonry(project: ProjectDto, index: number): MasonryProjectDto {
    return {
      ...project,
      height: this.getRandomHeight(index),
      colorClass: this.getRandomColor(index),
      displayText: this.getDisplayText(project),
    };
  }

  /**
   * Transforms ProjectDto to ProjectDetailDto for detail pages
   */
  static toDetail(project: ProjectDto, previousProject?: ProjectDto, nextProject?: ProjectDto): ProjectDetailDto {
    return {
      ...project,
      previousProject,
      nextProject,
    };
  }

  /**
   * Generates Sanity image URL from image reference
   */
  private static getSanityImageUrl(imageRef: any): string {
    if (!imageRef?.asset?._ref) {
      return '';
    }

    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ds7w4i35';
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      
      // Extract the image ID from the reference
      const imageId = imageRef.asset._ref.replace('image-', '').replace(/-jpg$/, '').replace(/-png$/, '').replace(/-webp$/, '');
      
      // Determine file extension
      let extension = 'jpg';
      if (imageRef.asset._ref.includes('-png')) extension = 'png';
      if (imageRef.asset._ref.includes('-webp')) extension = 'webp';
      
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}.${extension}`;
    } catch (error) {
      console.error('Error generating Sanity image URL:', error);
      return '';
    }
  }

  /**
   * Generates random height for masonry effect
   */
  private static getRandomHeight(index: number): number {
    const heights = [200, 250, 300, 350];
    return heights[index % heights.length];
  }

  /**
   * Generates random color class for visual variety
   */
  private static getRandomColor(index: number): string {
    const colors = ['primary', 'secondary', 'accent', 'success'];
    return colors[index % colors.length];
  }

  /**
   * Gets the best display text for masonry cards
   */
  private static getDisplayText(project: ProjectDto): string {
    if (project.accroche && project.accroche.length > 150) {
      return `${project.accroche.slice(0, 150)}...`;
    }
    if (project.description && project.description.length > 150) {
      return `${project.description.slice(0, 150)}...`;
    }
    return project.accroche || project.description || '';
  }
}
