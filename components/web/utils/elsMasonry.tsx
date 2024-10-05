import React from 'react';
import Image from 'next/image'; // Next.js Image for optimization

// Define the type for the project
interface Project {
  id: number;
  column: number;
  title: string | number | undefined;
  height: string;
  date: string;
  place: string;
  imgUrl: string;
  alt: string; 
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    column: 1,
    title: "Projet 1",
    height: "290",
    date: "2023-09-01",
    place: "Lomé, Togo",
    imgUrl: "https://picsum.photos/232/290?random=1",
    alt: "",
    description: "Projet communautaire pour l'autonomisation locale.",
  },
  {
    id: 2,
    column: 1,
    title: "Projet 2",
    height: "290",
    date: "2023-07-15",
    place: "Kara, Togo",
    imgUrl: "https://picsum.photos/232/290?random=2",
    alt: "",
    description: "Initiative de reforestation.",
  },
  {
    id: 3,
    column: 1,
    title: "Projet 3",
    height: "174",
    date: "2023-05-22",
    place: "Atakpamé, Togo",
    imgUrl: "https://picsum.photos/232/174?random=3",
    alt: "",
    description: "Projet éducatif pour les jeunes.",
  },
  {
    id: 4,
    column: 2,
    title: "Projet 4",
    height: "155",
    date: "2023-09-01",
    place: "Lomé, Togo",
    imgUrl: "https://picsum.photos/232/155?random=4",
    alt: "",
    description: "Projet communautaire pour l'autonomisation locale.",
  },
  {
    id: 5,
    column: 2,
    title: "Projet 5",
    height: "349",
    date: "2023-07-15",
    place: "Kara, Togo",
    imgUrl: "https://picsum.photos/232/349?random=5",
    alt: "",
    description: "Initiative de reforestation.",
  },
  {
    id: 6,
    column: 2,
    title: "Projet 6",
    height: "250",
    date: "2023-05-22",
    place: "Atakpamé, Togo",
    imgUrl: "https://picsum.photos/232/250?random=6",
    alt: "",
    description: "Projet éducatif pour les jeunes.",
  },
  {
    id: 7,
    column: 3,
    title: "Projet 7",
    height: "349",
    date: "2023-05-22",
    place: "Atakpamé, Togo",
    imgUrl: "https://picsum.photos/232/349?random=7",
    alt: "",
    description: "Projet éducatif pour les jeunes.",
  },
  {
    id: 8,
    column: 3,
    title: "Projet 8",
    height: "155",
    date: "2023-05-22",
    place: "Atakpamé, Togo",
    imgUrl: "https://picsum.photos/232/155?random=8",
    alt: "",
    description: "Projet éducatif pour les jeunes.",
  },
  {
    id: 9,
    column: 3,
    title: "Projet 9",
    height: "250",
    date: "2023-05-22",
    place: "Atakpamé, Togo",
    imgUrl: "https://picsum.photos/232/250?random=9",
    alt: "",
    description: "Projet éducatif pour les jeunes.",
  },
];

const ElsMasonry: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center bg-slate-50 min-h-screen overflow-hidden">
      <div className="mx-auto px-4 md:px-6 py-20 w-full max-w-7xl">
        <h2 className="mb-2 font-bold text-3xl text-center">Nos Projets</h2>
        <p className="mb-4 text-center text-lg">
          Découvrez nos projets communautaires axés sur l&apos;autonomisation, l&apos;éducation et l&apos;environnement.
        </p>


        <div className="gap-4 grid sm:grid-cols-auto lg:grid-cols-3 grid-col-1">

        <div className="gap-4 grid">
        {projects.filter(project => project.column === 1).map((project, index) => (
            <div key={project.id} className="flex flex-col gap-3">
                <Image className="shadow rounded-xl w-full" src={project.imgUrl} width={232} height={parseInt(project.height)} alt="Image 01" />
                <div className="bg-white p-4 rounded-xl">
                    <h3 className="mb-2 font-bold text-lg">{project.title}</h3>
                    <p className="text-gray-500">{project.date}</p>
                    <p className="text-gray-700">{project.place}</p>
                    <p className="mt-4 text-gray-600">{project.description}</p>
                  </div>
            </div>
            ))}
        </div> 

        <div className="gap-4 grid">
        {projects.filter(project => project.column === 2).map((project, index) => (
            <div key={project.id} className="flex flex-col gap-3">
                <Image className="shadow rounded-xl w-full" src={project.imgUrl} width={232}  height={parseInt(project.height)}  alt="Image 01" />
                <div className="bg-white p-4 rounded-xl">
                    <h3 className="mb-2 font-bold text-lg">{project.title}</h3>
                    <p className="text-gray-500">{project.date}</p>
                    <p className="text-gray-700">{project.place}</p>
                    <p className="mt-4 text-gray-600">{project.description}</p>
                  </div>
            </div>
            ))}
        </div>
      
        <div className="gap-4 grid">
        {projects.filter(project => project.column === 3).map((project, index) => (
          <div key={project.id} className="flex flex-col gap-3">
              <Image className="shadow rounded-xl w-full" src={project.imgUrl}  width={232} height={parseInt(project.height)}  alt="Image 01" />
              <div className="bg-white p-4 rounded-xl">
                  <h3 className="mb-2 font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-500">{project.date}</p>
                  <p className="text-gray-700">{project.place}</p>
                  <p className="mt-4 text-gray-600">{project.description}</p>
                </div>
          </div>
          ))}
          </div> 

        </div>
      </div>
    </section>
  );
};

export default ElsMasonry;
