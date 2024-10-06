
"use client"
import React, { PropsWithChildren } from 'react';

interface SectionText {
  title?: string;
  text?: string;
}

type ProjectProps = {
  sections: {
    project: SectionText[];
  };
} & PropsWithChildren

export const ProjectSection = ({sections, children}:ProjectProps) => {

    return(
        <section id="nos-projets" className="relative flex flex-col justify-center bg-slate-50 min-h-screen overflow-hidden">
        <div className="mx-auto px-4 md:px-6 py-20 w-full max-w-7xl">
          <h2 className="mb-2 font-bold text-3xl text-center">{sections.project[0].title}</h2>
          <p className="mb-4 text-center text-lg">
           {sections.project[0].text}
          </p>
          {children}
          </div>
          </section>
    )
}