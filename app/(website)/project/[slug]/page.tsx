import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import Link from 'next/link'
import ProjectBlock from "@/components/web/blocks/projectBlock";

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  goal: string;
  howWeDo: string;
  results: string;
  date: string;
  projectImg: string;
};

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params }: Props) {
  const { slug } = params;
  console.log(slug);
  const file = await fs.readFile(process.cwd() + '/public/project.json', 'utf8');
  const jsonProjects: Project[] = JSON.parse(file);

  const projectIndex = jsonProjects.findIndex((p) => p.id === slug);
  console.log(projectIndex)

  if (projectIndex === -1) {
    return notFound();
  }
   
  const project = jsonProjects[projectIndex];
  const previousProject = projectIndex > 0 ? jsonProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < jsonProjects.length - 1 ? jsonProjects[projectIndex + 1] : null;

  if(!project.description) {
    return <div className="min-h-screen project-page">
        <div className="flex flex-col justify-between container">


        <section className="inter-post-section">
        <div className={`inter-post-wrapper flex gap-5 ${nextProject && previousProject ? "previous-and-next-links" : "only-one-link"}`}>
          {previousProject && (
            <Link
              href={`/project/${previousProject.id}`}
              className="els-text-link els-text-link--blue inter-post-link previous-link"
            >
              <span className="inter-post-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-chevrons-left lucide"
                >
                  <path d="m11 17-5-5 5-5" />
                  <path d="m18 17-5-5 5-5" />
                </svg>
              </span>
              <span className="inter-post-text">Précédent</span>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/project/${nextProject.id}`}
              className="els-text-link els-text-link--blue inter-post-link next-link"
            >
              <span className="inter-post-text">Suivant</span>
              <span className="inter-post-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-chevrons-right lucide"
                >
                  <path d="m6 17 5-5-5-5" />
                  <path d="m13 17 5-5-5-5" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </section>
      <div className="flex justify-center items-center">
        <p className="text-center">Ce projet est en cours de rédaction. En attendant vous pouvez consulter les autres projets.</p>
      </div>
  
        </div>
      
    
        </div>
  }

 

  return (
    <div className="mx-auto px-5 min-h-screen project-page">
      <div className="container">
        <section className="row section-title">
          <div className="col-12">
            <h1 className="pre-title pre-title--centered">{project.title}</h1>
          </div>
        </section>

        <ProjectBlock project={project} nextProject={nextProject} previousProject={previousProject} />

     
      </div>
    </div>
  );
}
