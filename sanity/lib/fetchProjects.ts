import { client } from "./client";
import { projectsQuery } from "./queries";

export interface SanityProject {
  _id: string;
  id: string;
  title: string;
  accroche?: string;
  description?: string;
  goal?: string;
  howWeDo?: string;
  results?: string;
  date?: string;
  place?: string;
  category?: {
    _id: string;
    title: string;
    description?: string;
    color?: string;
  };
  projectImg?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: any;
    crop?: any;
    alt?: string;
  };
  slug?: {
    current: string;
  };
}

export async function fetchProjects(): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects || [];
  } catch (error) {
    return [];
  }
}

export async function fetchProjectBySlug(slug: string): Promise<SanityProject | null> {
  try {
    const query = `*[_type == "project" && slug.current == $slug][0]`;
    const project = await client.fetch(query, { slug });
    return project || null;
  } catch (error) {
    return null;
  }
}
