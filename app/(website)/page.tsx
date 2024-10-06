import Contact from "@/components/web/sections/contact";
import Hero from "@/components/web/sections/hero";
import Mission from "@/components/web/sections/mission";
import { ProjectSection } from "@/components/web/sections/project";
import Team from "@/components/web/sections/team";
import ElsMasonry from "@/components/web/utils/elsMasonry";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Project } from "@/components/web/utils/elsMasonry";
import { UploadForm } from "@/components/uploadForm/uploadForm";
import { promises as fs } from 'fs';

export default async function Page() {
 
  const Map = useMemo(() => dynamic(
    () => import('@/components/web/utils/map'),
    {
        loading: () => <p>A map is loading...</p>,
        ssr: false
    }
), [])

const DATA = [
  { image: 'https://picsum.photos/seed/random101/500/500' },
  { image: 'https://picsum.photos/seed/random102/500/500' },
  { image: 'https://picsum.photos/seed/random103/500/500' },
]

  const file = await fs.readFile(process.cwd() + '/public/project.json', 'utf8');
  const jsonProjects = JSON.parse(file);
  console.log(process.cwd());


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

  const placeholder = "/assets/img/projects/placeholder/placeholder-project.jpg"
  const projects: Project[] = [
    {
      id: 1,
      column: 1,
      title: "Projet 1",
      height: "150",
      date: "2023-09-01",
      place: "Lomé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet communautaire pour l'autonomisation locale.",
      background: "els-horizon",
      color: "black",
    },
    {
      id: 2,
      column: 1,
      title: "Projet 2",
      height: "390",
      date: "2023-07-15",
      place: "Kara, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Initiative de reforestation.",
      background: "els-primary",
      color: "white",
    },
    {
      id: 3,
      column: 1,
      title: "Projet 3",
      height: "174",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-tertiary",
      color: "white",
    },
    {
      id: 4,
      column: 2,
      title: "Projet 4",
      height: "155",
      date: "2023-09-01",
      place: "Lomé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet communautaire pour l'autonomisation locale.",
      background: "els-primary",
      color: "white",
    },
    {
      id: 5,
      column: 2,
      title: "Projet 5",
      height: "100",
      date: "2023-07-15",
      place: "Kara, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Initiative de reforestation.",
      background: "els-secondary",
      color: "white",
     
    },
    {
      id: 6,
      column: 2,
      title: "Projet 6",
      height: "70",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-primary",
      color: "white",
    },
    {
      id: 7,
      column: 3,
      title: "Projet 7",
      height: "130",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-secondary",
      color: "white",
    },
    {
      id: 8,
      column: 3,
      title: "Projet 8",
      height: "120",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-secondary",
      color: "white",
    },
    {
      id: 9,
      column: 3,
      title: "Projet 9",
      height: "250",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-tertiary",
      color: "white",
    },
    {
      id: 10,
      column: 4,
      title: "Projet 10",
      height: "155",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl:placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-secondary",
      color: "white",
    },
    {
      id: 11,
      column: 4,
      title: "Projet 11",
      height: "250",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl:placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-primary",
      color: "white",
    },
    {
      id: 12,
      column: 4,
      title: "Projet 12",
      height: "250",
      date: "2023-05-22",
      place: "Atakpamé, Togo",
      imgUrl: placeholder,
      alt: "",
      description: "Projet éducatif pour les jeunes.",
      background: "els-primary",
      color: "white",
    },
    
  ];
  


  return (
    <>
    <Hero sections={sections} />
    <UploadForm />
    <Mission sections={sections} cards={cards} />
    <ProjectSection sections={sections}>
      <ElsMasonry projects={projects} />
    </ProjectSection>
    <Team sections={sections} members={members} />
    <Contact contacts={contacts} sections={sections}>
      <Map posix={[6.26, 1.25]} />
    </Contact>
    </>
  );
}
