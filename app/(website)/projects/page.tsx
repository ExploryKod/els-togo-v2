import { Suspense } from 'react';
import { ProjectSection } from '@/components/web/sections/project';
import { WebsiteSectionsDto } from '@/lib/dto/WebsiteSectionsDto';
import { ProjectDataSourceFactory } from '@/lib/dataSources/projectDataSource';
import { ProjectDto } from '@/lib/dto/ProjectDto';
import ProjectsList from '@/components/web/sections/projectsList';

async function getProjectsData(): Promise<ProjectDto[]> {
  try {
    const projects = await ProjectDataSourceFactory.fetchProjects();
    return projects || [];
  } catch (error) {
    return [];
  }
}

async function getWebsiteSectionsData(): Promise<WebsiteSectionsDto> {
  try {
    const { WebsiteSectionsDataSourceFactory } = await import('@/lib/dataSources/websiteSectionsDataSource');
    const sections = await WebsiteSectionsDataSourceFactory.fetchWebsiteSections();
    return sections;
  } catch (error) {
    const { WebsiteSectionsMapper } = await import('@/lib/mappers/WebsiteSectionsMapper');
    return WebsiteSectionsMapper.createFallback();
  }
}

export default async function ProjectsPage() {
  const [projects, websiteSections] = await Promise.all([
    getProjectsData(),
    getWebsiteSectionsData()
  ]);

      const sections = {
        project: websiteSections.projectsPageSection,
      };

  return (
    <ProjectSection sections={sections} className="projects-list my-5">
      <Suspense fallback={<div className="text-center py-8">Chargement des projets...</div>}>
        <ProjectsList initialProjects={projects} />
      </Suspense>
    </ProjectSection>
  );
}
