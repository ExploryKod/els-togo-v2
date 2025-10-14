/**
 * Data Transfer Object for Project data
 * This DTO represents the standardized project structure used throughout the application
 */
export interface ProjectDto {
  id: string;
  slug: string;
  title: string;
  accroche: string;
  description: string;
  goal: string;
  howWeDo: string;
  results: string;
  date: string;
  place: string;
  category: string;
  projectImg: string;
}

/**
 * DTO for Masonry-specific project data
 * Extends the base ProjectDto with masonry-specific properties
 */
export interface MasonryProjectDto extends ProjectDto {
  height: number;
  colorClass: string;
  displayText: string;
}

/**
 * DTO for Project detail page
 * Extends the base ProjectDto with navigation properties
 */
export interface ProjectDetailDto extends ProjectDto {
  previousProject?: ProjectDto;
  nextProject?: ProjectDto;
}
