import React from 'react';
import Image from 'next/image'; // Next.js Image for optimization
import Link from 'next/link';

// Define the type for the project
export interface Project {
  id: number;
  column: number;
  title: string | number | undefined;
  height: string;
  date: string;
  place: string;
  imgUrl: string;
  alt: string; 
  description: string;
  background: string;
  color: string;
}




interface MasonryProps {
  projects: Project[];
}


function ElsMasonry({projects}:MasonryProps) {

  return (
        <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1">
    {[1, 2, 3].map((colNumber) => (
      <div key={colNumber} className="gap-4 grid">
        {projects?.filter((_, index:number) => (index % 3) + 1 === colNumber)
          .map((project:Project) => (
            <div key={project.id} className="relative flex flex-col gap-3 cursor-pointer group">
              <Image
                className={`group-hover:scale-105 masonry-img shadow rounded-xl w-full h-[${project.height}px]`}
                src={project.imgUrl}
                width={232}
                height={parseInt(project.height)}
                alt={`Image ${project.title}`}
                style={{ width: '100%', height:`${project.height}px` }}
              />
              <div className="">
                <Link className="px-5 py-2" href={"#"} />
              </div>
              <div className={`p-4 rounded-xl grow`} style={{background: `var(--${project.background})`}}>
                <div className="flex justify-between gap-2">
                <p  style={{color: `${project.color}`}}>{project.date}</p>
                <p  style={{color: `${project.color}`}}>{project.place}</p>
                  </div>
                <h3 className={`mb-2 font-bold text-lg`} style={{color: `${project.color}`}}>{project.title}</h3>
             
                <p className={`mt-4`} style={{color: `${project.color}`}}>{project.description}</p>
              </div>
            </div>
          ))}
      </div>
    ))}
  </div>
  );
};

export default ElsMasonry;
