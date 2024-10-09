import Contact from "@/components/web/sections/contact";
import Hero from "@/components/web/sections/hero";
import Mission from "@/components/web/sections/mission";
import { ProjectSection } from "@/components/web/sections/project";
import Team from "@/components/web/sections/team";
import ElsMasonry from "@/components/web/utils/elsMasonry";
import dynamic from "next/dynamic";
import { PROJECTS } from "./front-project"

async function getProjectData() {
  const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
  const res = await fetch(SERVER_PATH + '/api/projects')
  // The return value is *not* serialized
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
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
  // const file = await fs.readFile(process.cwd() + '/public/front-projects.json', 'utf8');
  // const projects = JSON.parse(file);
  // console.log(process.cwd());
  
console.log(projects);


  const sections = {
    intro: [
      {
        pretitle: 'Association ELS - Togo',
        title: 'Nous promouvons l\'éduction, les loisirs et la santé',
        text: 'Nous pensons que chacun a le droit d\'être éduqué, soigné et protégé.Nous apportons notre pierre pour que chacun puisse vivre dans un environnement sain.',
        buttonData: {
          url: '#contact',
          text: 'S\'engager avec nous',
        },
      },
    ],
    project: [
      {
        pretitle: 'Nos projets',
        text: 'Découvrez nos projets communautaires axés sur l\'autonomisation, l\'éducation et l\'environnement.'
      }
    ],
    mission: [
      {
        pretitle: 'Notre Mission & nos valeurs',
        text: 'Nous pensons que chacun a le droit d\'être éduqué, soigné et protégé.',
      },
    ],
    members: [
      {
        pretitle: 'Notre équipe',
        title: 'Une équipe engagée pour rendre le monde meilleur',
        text: 'Voici notre équipe dynamique et engagée qui travaille chaque jour pour faire une différence dans le monde.',
      },
    ],
    contact: [
      {
        title: 'Nous contacter',
        text: `Si vous voulez vous engager avec nous, nous serons très heureux de vous accueillir:
        contactez-nous par email ou téléphone.`,
      },
    ]
  };

  const contacts = [
    {
      address: '123 Rue de Exemple, Lomé, Togo',
      schedules: 'Lundi - Vendredi: 8h - 17h',
      phone: '(+228) 90 00 00 00',
      email: 'contact@example.com',
    },
  ];

  const cards = {
    mission: [
      {
        imgSource: '/assets/img/icons/5236.jpg',
        imgAltText: 'Personnes tenant des feuilles',
        title: 'Dignité',
        text: 'Nous respectons chaque personne et groupe que nous aidons.',
      },
      {
        imgSource: '/assets/img/icons/5236.jpg',
        imgAltText: 'Mains assemblant un puzzle',
        title: 'Amour',
        text: 'Nos engagements se font grâce à la formidable force que nous donne l\'amour.',
      },
      {
        imgSource: '/assets/img/icons/5236.jpg',
        imgAltText: 'Mains assemblant un puzzle',
        title: 'Franchise',
        text: 'Nous valorisons l\'authenticité et l\'intégrité.',
      },
    ],
  };

  const members = [
    {
      nom: 'Kpeglo Bessou',
      prenom: 'Kokou Jacques',
      img: { src: '/assets/img/persons/persons-man.jpg', alt: 'personne' },
      email: 'email@mail.com',
      role: "Président du Conseil d'Administration",
    },
    {
      nom: 'Azanli',
      prenom: 'Koffi Djifa',
      img: { src: '/assets/img/persons/persons-man.jpg', alt: 'personne' },
      email: 'email@mail.com',
      role: 'Directeur exécutif',
    },
    {
      nom: 'Dewa Kassa',
      prenom: 'Kodjo Akonta Florent',
      img: { src: '/assets/img/persons/persons-man.jpg', alt: 'personne' },
      email: 'email@mail.com',
      role: 'Responsable planification et suivi',
    },
    {
      nom: 'Tate',
      prenom: 'Yawo Akponi',
      img: { src: '/assets/img/persons/persons-man.jpg', alt: 'personne' },
      email: 'email@mail.com',
      role: "Coordonnateur de l'association",
    },
  ];


  return (
    <>
    <Hero sections={sections} />
    {cards && cards.mission.length > 0 ? (<Mission sections={sections} cards={cards} />) : null}
    {projects && projects.length > 0 ? (
         <ProjectSection sections={sections}>
          <ElsMasonry projects={projects} />
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
