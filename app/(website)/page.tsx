import Contact from "@/components/web/sections/contact";
import Hero from "@/components/web/sections/hero";
import Mission from "@/components/web/sections/mission";
import { ProjectSection } from "@/components/web/sections/project";
import Team from "@/components/web/sections/team";
import ElsMasonry from "@/components/web/utils/elsMasonry";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PROJECTS } from "./front-project";
import { MissionCardDto } from "@/lib/dto/MissionCardDto";
import { WebsiteSectionsDto } from "@/lib/dto/WebsiteSectionsDto";

async function getProjectData() {
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    const res = await fetch(SERVER_PATH + '/api/projects', {
      // Add cache control to prevent stale data
      cache: 'no-store',
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    
    if (!res.ok) {
      // Return fallback data instead of throwing
      return PROJECTS; // Use the fallback data
    }
    
    const data = await res.json();
    
    // Check if the response contains an error
    if (data.error) {
      return PROJECTS; // Use the fallback data
    }
    
    return data;
  } catch (error) {
    // Return fallback data instead of throwing
    return PROJECTS; // Use the fallback data
  }
}

async function getMemberData() {
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    const res = await fetch(SERVER_PATH + '/api/members', {
      // Add cache control to prevent stale data
      cache: 'no-store',
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    
    if (!res.ok) {
      // Return empty array instead of throwing
      return [];
    }
    
    const data = await res.json();
    
    // Check if the response contains an error
    if (data.error) {
      return []; // Return empty array
    }
    
    return data;
  } catch (error) {
    // Return empty array instead of throwing
    return [];
  }
}

async function getMissionCardData() {
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    const res = await fetch(SERVER_PATH + '/api/mission-cards', {
      // Add cache control to prevent stale data
      cache: 'no-store',
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    
    if (!res.ok) {
      // Return empty array instead of throwing
      return [];
    }
    
    const data = await res.json();
    
    // Check if the response contains an error
    if (data.error) {
      return []; // Return empty array
    }
    
    return data;
  } catch (error) {
    // Return empty array instead of throwing
    return [];
  }
}

async function getWebsiteSectionsData() {
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    const url = SERVER_PATH + '/api/website-sections?t=' + Date.now();
    
    const res = await fetch(url, {
      // Add cache control to prevent stale data
      cache: 'no-store',
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    
    if (!res.ok) {
      // Return fallback data instead of throwing
      const { WebsiteSectionsMapper } = await import("@/lib/mappers/WebsiteSectionsMapper");
      return WebsiteSectionsMapper.createFallback();
    }
    
    const data = await res.json();
    
    // Check if the response contains an error
    if (data.error) {
      const { WebsiteSectionsMapper } = await import("@/lib/mappers/WebsiteSectionsMapper");
      return WebsiteSectionsMapper.createFallback();
    }
    
    return data;
  } catch (error) {
    // Return fallback data instead of throwing
    const { WebsiteSectionsMapper } = await import("@/lib/mappers/WebsiteSectionsMapper");
    return WebsiteSectionsMapper.createFallback();
  }
}


export default async function Page() {

const Map = dynamic(() => import('@/components/web/utils/map'), {
  ssr: false,
});

const DATA = [
  { image: 'https://picsum.photos/seed/random101/500/500' },
  { image: 'https://picsum.photos/seed/random102/500/500' },
  { image: 'https://picsum.photos/seed/random103/500/500' },
]


const projects:any = await getProjectData() || PROJECTS;
const members:any = await getMemberData() || [];
const missionCards: MissionCardDto[] = await getMissionCardData() || [];
const websiteSections: WebsiteSectionsDto = await getWebsiteSectionsData();
  // const file = await fs.readFile(process.cwd() + '/public/front-projects.json', 'utf8');
  // const projects = JSON.parse(file);
  
  // Use dynamic sections data from Sanity/API
  const sections = {
    intro: websiteSections.heroSection,
    project: websiteSections.projectSection,
    mission: websiteSections.missionSection,
    members: websiteSections.teamSection,
    contact: websiteSections.contactSection,
  };

  const contacts = websiteSections.contactInfo;


  // Legacy cards data - now using Sanity data instead
  const cards = {
    mission: [],
  };



  return (
    <>
    <Hero sections={sections} />
    <Mission sections={sections} cards={cards} missionCards={missionCards} />
    {projects && projects.length > 0 ? (
         <ProjectSection sections={sections}>
          <ElsMasonry projects={projects.slice(0, 6)} />
          <div className="text-center mt-8">
            <Link 
              href="/projects" 
              className="button"
            >
              Voir tous nos projets
            </Link>
          </div>
        </ProjectSection>
    ) : null}
    {members && members.length > 0 ? (<Team sections={sections} members={members} />) : null}
    {contacts && contacts.length > 0 ? (
      <Contact contacts={contacts} sections={sections}>   
        <Map />
        </Contact>
    ) : null}
    </>
  );
}
