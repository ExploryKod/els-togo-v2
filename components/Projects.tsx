"use client"
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from "flowbite-react";
import Image from 'next/image'
import ImageContainer from '@/src/components/ImageContainer'
import GithubIcon from '/public/github/github-simple.svg'
import websiteIcon from '/public/globe.svg'
import { projects } from '@/src/data/projects'
import type { Project } from '@/src/types/project/project'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import  { MyButton } from './Button'


interface ProjectProps {
    locale: string
}

export const Projects = ({locale}: ProjectProps) => {
  const t = useTranslations('')
  const tm = useTranslations("load-more")
  const router = useRouter()
  let projectNumber:number = 6; 
  const [next, setNext] = useState<number>(projectNumber);
  let totalprojects:number = 0
  const [query, setQuery] = useState<string>('');
 
const searchFilter = (
    items: Partial<Project[] | null>, 
    query: string
  ): (Project | undefined)[] => {
  
    const searchRecursively = (obj: any): boolean => {
      if (!obj) return false;
      
      if (typeof obj === 'string') {
        return obj.toLowerCase().includes(query.toLowerCase());
      }
  
      if (typeof obj === 'object') {
        return Object.values(obj).some(value => searchRecursively(value));
      }
  
      return false;
    };
  
    return items ? items.filter((el) => {
      if (!el) return false;
      
      return searchRecursively(el);
    }) : [];
  };

  
  const filtered = searchFilter(projects, query);

  if(projects) {
    totalprojects = projects.length
  } else {
    totalprojects = 0
  }

  const [remainingProjects, setRemainingProjects] = useState<number | null>(totalprojects - projectNumber);

  const handleMoreProjects = () => {
    setNext(next + projectNumber);
    setRemainingProjects(totalprojects - projectNumber)
  };

//Handling the input on our search bar
const handleChange = (e: any) => {
    setQuery(e.target.value.toLowerCase())
}

const handleReset = () => {
    setQuery("")
    setNext(projectNumber)
}

const colors = ["teal", "green", "yellow", "orange"]

return (
<>
    <div className="mx-auto mt-5 mb-[60px] w-full">
        <h2 className='my-5 font-extrabold text-3xl md:text-4xl leading-tight'>
        <span className="bg-clip-text bg-span-bg text-transparent">{t('My_project_title_first')}{' '}</span>
        {t('My_project_title')}{' '}
        </h2>
        
        <div className='flex md:flex-row flex-col flex-wrap justify-between items-start md:items-center gap-2 md:gap-0'>
            <div className="flex flex-wrap gap-4">
            {Array.from(new Set(projects ? projects.map(p => p?.category): [])).map((category, i) => {
                return category && (
                <div key={category} className="mb-1">
                    <Button onClick={() => setQuery(category)} color={`${colors[i]}`} pill >{t(`${category}`)}</Button>
                </div>
            )
                })}
            <div>
                <MyButton onClick={handleReset} className="sm:ms-5" rounded size='medium'>
                    <span className="font-bold whitespace-nowrap">{t('Reset Filters')}</span>
                </MyButton>
            </div>
            </div>
            <label className="block max-sm:w-full sm:min-w-[350px]">
                <input 
                onChange={handleChange} type='text' placeholder={t('Rechercher un projet')}
                className="block border-slate-300 focus:border-sky-500 focus:invalid:border-pink-500 disabled:border-slate-200 invalid:border-pink-500 bg-white disabled:bg-slate-50 shadow-sm disabled:shadow-none px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 focus:invalid:ring-pink-500 w-full text-sm disabled:text-slate-500 invalid:text-pink-600 placeholder-slate-400 focus:outline-none"/>
            </label>
        </div>
    </div>
    {filtered.length > 0 ? (<>
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto w-full">
  
  {filtered?.filter(project => project && project.id).slice(0, next).map((project) => {
  return project?.image ? (
 
  <div key={project.id} 
  onClick={() => project.slug ? router.push(`/${locale}/projects/${project.slug}`): notFound()}
  className="relative flex flex-col justify-between bg-[#fafafa] shadow-md hover:shadow-lg rounded-lg min-w-[350px] max-w-[600px] transition duration-300 cursor-pointer group">            

      <div className="flex justify-between">
          <div className="flex flex-wrap gap-4 px-2 py-4">
              {project.website && project.website.length > 0 ?
              (<a href={project.website} className="z-lg hover:opacity-75">
                  <ImageContainer classNames="w-[24px] h-[24px]">
                  <Image
                      height={24}
                      width={24}
                      src={websiteIcon}
                      alt={"Site web"}
                  />
                  </ImageContainer>
              </a>) : null}

              {project.github && project.github.length > 0 ?
              (<a href={project.github} className="z-lg hover:opacity-75"><ImageContainer classNames="w-[24px] h-[24px]">
                  <Image
                      height={24}
                      width={24}
                      src={GithubIcon}
                      alt={"Repository"}
                  />
              </ImageContainer></a>) : null}

              {project.external && (project.external.url.length > 0 && project.external.imageUrl) ?
              (<a href={project.external.url} className="z-lg hover:opacity-75"><ImageContainer classNames="w-[24px] h-[24px]">
                  <Image
                      height={24}
                      width={24}
                      src={project.external.imageUrl}
                      alt={project.external.alt}
                      className="border-[#000] border-1 border rounded-full"
                  />
              </ImageContainer></a>) : null}
          </div>
      

          <h2 className="bg-button p-2 rounded-tr-lg rounded-bl-lg font-bold text-2xl text-white">{project.title}</h2>

      </div>
      
      <>
          {project.image.url && project.image.alt ?
              (<ImageContainer classNames="
                  mx-auto max-w-[300px] bg-[#fafafa] w-full p-4 img-rounded-lg rounded-lg">
                  <Image
                  src={project.image.url}
                  alt={project.image.alt}
                  className="mx-auto max-w-[200px]"
                  />
              </ImageContainer>) 
          : null}
      </>
      {project.description && project.description.length > 0 ?
      (<div className="flex justify-center items-center px-2 py-4">
          <p className="text-gray-600">{project.description}</p>
      </div>) : null}
      <div className="flex justify-between items-end bg-gray-0.5 rounded-t-lg">

      <div className={`${project.technos && project.technos.length > 0 ? 
              "flex items-center justify-between gap-2 px-2 mx-auto rounded-t-lg border-b-0 border border-1 border-button w-full max-w-[80%] h-[60px]" : 
              "hidden"}`}>
      <div className="bg-button my-2 px-4 py-2 rounded-xl font-bold text-sm text-white">
          <span>{t(`${project.category}`)}</span>
      </div>
          {project.technos ?
          (<div className="flex justify-center items-center gap-4">
          {project.technos?.map(techno => {
              return techno.url && techno.alt ? (<div key={techno.id}><ImageContainer isContain={true} classNames="
              bg-transparent w-full flex items-center justify-end">
              <Image
              height={30}
              width={30}
              src={techno.url}
              alt={techno.alt}
              />
              </ImageContainer></div>) : null
          })}
          </div>) : null}
      </div>
</div>

     

  </div> 
) 
  : null;
  })}
</div>

<div className={`${filtered && next >= filtered.length ? "hidden" : ""} flex flex-col gap-5 justify-center items-center mx-auto my-4 px-2 py-4 w-full`}>
  <MyButton onClick={handleMoreProjects}>{t("more-projects")}</MyButton>
</div>
    
    </>) : (<div className="flex flex-col justify-center items-center gap-5 mx-auto my-4 px-2 py-4 w-full">
            <p>{t('Aucun projet')}</p>
        </div>)}
 
</>
)

}

