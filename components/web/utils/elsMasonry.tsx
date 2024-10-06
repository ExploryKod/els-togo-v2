import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { MyButton } from '@/components/Button';

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
            <Link className="no-underline hover:!no-underline cursor-pointer" key={project.id} href={`/project/project-${project.id}`} >
            <div className="relative flex flex-col gap-3 group">
              <Image
                className={`group-hover:scale-105 masonry-img shadow rounded-xl w-full h-[${project.height}px]`}
                src={project.imgUrl === 'placeholder' ? "/assets/img/projects/placeholder/placeholder-project.jpg": project.imgUrl}
                width={232}
                height={parseInt(project.height)}
                alt={`Image ${project.title}`}
                style={{ width: '100%', height:`${project.height}px` }}
              />
              <div className={`p-4 group/inner rounded-xl grow opacity-100`} style={{background: `var(--${project.background})`, textDecoration: 'none'}}>
                <div className="group-hover:opacity-50">
                  <div className="flex justify-between gap-2">
                    <p  className="" style={{color: `${project.color}`, textDecoration: 'none'}}>{project.date}</p>
                    <p  className="" style={{color: `${project.color}`, textDecoration: 'none'}}>{project.place}</p>
                  </div>
                  <h3 className={`mb-2 font-bold text-lg group-hover:!no-underline`} style={{color: `${project.color}`}}>{project.title}</h3>
              
                  <p className={`mt-4`} style={{color: `${project.color}`, textDecoration: 'none'}}>
                    {project.description.length > 150 ? `${project.description.slice(0, 150)}...` : project.description}
                  </p>
                </div>
                <MyButton className='w-full z-10 opacity-0 event-none group-hover:opacity-100'>Découvrir</MyButton>
              </div>
            </div>
            </Link>
          ))}
      </div>
    ))}
  </div>
  );
};

export default ElsMasonry;
