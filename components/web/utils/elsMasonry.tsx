import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { ProjectDto, MasonryProjectDto } from '@/lib/dto/ProjectDto';
import { ProjectMapper } from '@/lib/mappers/ProjectMapper';

interface MasonryProps {
  projects: ProjectDto[];
}


function ElsMasonry({projects}:MasonryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project:ProjectDto, index:number) => {
        const masonryProject = ProjectMapper.toMasonry(project, index);
        return (
          <Link 
            className="no-underline hover:!no-underline cursor-pointer group" 
            key={masonryProject.id} 
            href={`/project/${masonryProject.slug}`}
          >
            <div className="relative flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  className="group-hover:scale-110 transition-transform duration-300"
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
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content Container */}
              <div className={`p-6 flex flex-col flex-grow bg-${masonryProject.colorClass}-50 border-t-4 border-${masonryProject.colorClass}-200`}>
                {/* Date and Place */}
                <div className="flex justify-between gap-2 mb-3">
                  <span className={`text-sm font-medium text-${masonryProject.colorClass}-600 bg-${masonryProject.colorClass}-100 px-2 py-1 rounded-full`}>
                    {masonryProject.date}
                  </span>
                  <span className={`text-sm font-medium text-${masonryProject.colorClass}-600 bg-${masonryProject.colorClass}-100 px-2 py-1 rounded-full`}>
                    {masonryProject.place}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className={`text-xl font-bold text-${masonryProject.colorClass}-800 mb-3 group-hover:text-${masonryProject.colorClass}-900 transition-colors duration-300`}>
                  {masonryProject.title}
                </h3>
                
                {/* Description */}
                <p className={`text-${masonryProject.colorClass}-700 text-sm leading-relaxed mb-4 flex-grow`}>
                  {masonryProject.displayText}
                </p>
                
                {/* Button */}
                <div className="mt-auto">
                  <span className="button button--secondary button--small w-full text-center block">
                    Découvrir
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ElsMasonry;
