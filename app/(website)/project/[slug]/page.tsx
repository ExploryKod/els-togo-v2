import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import Link from 'next/link'
import ProjectBlock from "@/components/web/blocks/projectBlock";
import NotFoundWithProps from "@/components/utilities/NotFoundWithProps";
import { MyButton } from "@/components/Button";

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

async function getData() {
  const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
  const res = await fetch(SERVER_PATH + '/api/projects/details')
  // The return value is *not* serialized
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Page({ params }: Props) {
  const { slug } = params;
 
  const emptyProject:Project = { 
    id: "",
    slug: "",
    title: "Projet non trouvé",
    description: "",
    goal: "",
    howWeDo: "",
    results: "",
    date: "",
    projectImg: "",
  }
  let projectIndex:number;
  let jsonProjects: Project[] = [];
  let nextProject:Project = emptyProject;
  let previousProject:Project = emptyProject;

  jsonProjects = await getData();
  console.log(jsonProjects);
  projectIndex = jsonProjects.findIndex((p) => p.id === slug);
  
  // if(process.env.NEXT_PUBLIC_MOD === "production") {
  //   const file = await fs.readFile(process.env.ROOT_PATH + '/project.json', 'utf8');
  //   const jsonProjects: Project[] = JSON.parse(file);
  //   projectIndex = jsonProjects.findIndex((p) => p.id === slug);
  // } else {
  //   const file = await fs.readFile(process.cwd() + '/public/project.json', 'utf8');
  //   const jsonProjects: Project[] = JSON.parse(file);
  //   projectIndex = jsonProjects.findIndex((p) => p.id === slug);
  // }
 
  if (projectIndex === -1) {
    return <NotFoundWithProps isError={true} message={{text:"Projet en cours de rédaction", color:""}} subject={{text:"En attendant, consultez les autres projets", color:"primary"}} isTextColumn={true}/>  
  }

  console.log(projectIndex);
  const project: Project = projectIndex >= 0 ? jsonProjects[projectIndex] : emptyProject;
  previousProject = projectIndex > 0 ? jsonProjects[projectIndex - 1] : emptyProject;
  nextProject = projectIndex < jsonProjects.length - 1 ? jsonProjects[projectIndex + 1] : emptyProject;

  if(!project) {
    return <div className="min-h-screen project-page">
        <div className="flex flex-col gap-5 container">
            <section className="inter-post-section">
            <div className={`inter-post-wrapper flex gap-5 ${nextProject && previousProject ? "previous-and-next-links" : "only-one-link"}`}>
            {previousProject && previousProject.id !== "" ? (
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
            ): null}

            {nextProject && nextProject.id !== "" ? (
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
            ):null}
            </div>
        </section>
      
        <div  className="flex flex-col justify-center items-center w-full">
            <div className={`min-w-[360px] max-w-[800px] border border-2 border-secondary rounded-lg`}>
              <div className="my-[20px] px-4 py-2">
                <p className="font-bold text-4xl text-center text-primary">Projet en cours de rédaction ou sans contenu encore. Bientôt disponible !</p>
                <p className="font-bold text-4xl text-center text-primary">Cliquez sur les flèches pour consulter d&apos;autres projets ou revenez à l&apos;accueil.</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 bg-background-secondary px-4 py-2 rounded-b-lg">
              <a className="" href={`/#nos-projets`}>
                <MyButton className="w-full" rounded variant={"secondary"} size='medium'>
                  <span className="before:z-lg">Retour aux projets de l&apos;accueil</span>
                </MyButton>
              </a>
              </div>
            </div>

          </div>
        </div>
        </div>
  }

  if(project && !project.title) {
    return notFound();
  }
 
  return (
    <div className="mx-auto px-5 min-h-screen project-page">
      <div className="container">
        <section className="row section-title">
          <div className="col-12">
            <h1 className="pre-title pre-title--centered">{project?.title}</h1>
          </div>
        </section>

        <ProjectBlock project={project} nextProject={nextProject} previousProject={previousProject} />

     
      </div>
    </div>
  );
}
