import Contact from "@/components/web/sections/contact";
import Hero from "@/components/web/sections/hero";
import Mission from "@/components/web/sections/mission";
import Team from "@/components/web/sections/team";
import ElsMasonry from "@/components/web/utils/elsMasonry";
import dynamic from "next/dynamic";
import { useMemo } from "react";

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


  const sections = {
    intro: [
      {
        pretitle: 'Welcome to Our NGO',
        title: 'We promote education and health',
        text: 'We believe that every child deserves an opportunity for education and good health.',
        buttonData: {
          url: '#contact',
          text: 'Get Involved',
        },
      },
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
    <Mission sections={sections} cards={cards}/>
    <ElsMasonry />
    <Team sections={sections} members={members} />
    <Contact contacts={contacts} sections={sections} >
        <Map posix={[6.26, 1.25]} />
    </Contact>
    </>
  );
}
