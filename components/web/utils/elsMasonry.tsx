import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { MyButton } from '@/components/Button';
import { ProjectDto, MasonryProjectDto } from '@/lib/dto/ProjectDto';
import { ProjectMapper } from '@/lib/mappers/ProjectMapper';

interface MasonryProps {
  projects: ProjectDto[];
}


function ElsMasonry({projects}:MasonryProps) {
  return (
        <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1">
    {[1, 2, 3].map((colNumber) => (
      <div key={colNumber} className="gap-4 grid">
        {projects?.filter((_, index:number) => (index % 3) + 1 === colNumber)
          .map((project:ProjectDto, index:number) => {
            const masonryProject = ProjectMapper.toMasonry(project, index);
            return (
            <Link className="no-underline hover:!no-underline cursor-pointer" key={masonryProject.id} href={`/project/${masonryProject.slug}`} >
            <div className="relative flex flex-col gap-3 group">
              <div className="relative overflow-hidden rounded-xl" style={{ height: `${masonryProject.height}px` }}>
                <Image
                  className={`group-hover:scale-105 masonry-img shadow rounded-xl`}
                  src={
                    masonryProject.projectImg && masonryProject.projectImg.trim() !== "" && masonryProject.projectImg !== 'placeholder'
                      ? masonryProject.projectImg
                      : "/assets/img/projects/placeholder/placeholder-project.jpg"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={`Image ${masonryProject.title || 'Project'}`}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={`p-4 group/inner rounded-xl grow opacity-100 bg-${masonryProject.colorClass}-50 border border-${masonryProject.colorClass}-200`}>
                <div className="group-hover:opacity-50">
                  <div className="flex justify-between gap-2">
                    <p className={`text-${masonryProject.colorClass}-600`}>{masonryProject.date}</p>
                    <p className={`text-${masonryProject.colorClass}-600`}>{masonryProject.place}</p>
                  </div>
                  <h3 className={`mb-2 font-bold text-lg group-hover:!no-underline text-${masonryProject.colorClass}-800`}>{masonryProject.title}</h3>
              
                  <p className={`mt-4 text-${masonryProject.colorClass}-700`}>
                    {masonryProject.displayText}
                  </p>
                </div>
                <MyButton className='w-full z-10 opacity-0 event-none group-hover:opacity-100'>Découvrir</MyButton>
              </div>
            </div>
            </Link>
            );
          })}
      </div>
    ))}
  </div>
  );
};

export default ElsMasonry;
