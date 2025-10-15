
"use client"
import React, { PropsWithChildren } from 'react';

interface SectionText {
  pretitle?: string;
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
          {(() => {
            const first = sections?.project?.[0];
            const pretitle = first?.pretitle || 'Nos projets';
            const text = first?.text || '';
            return (
              <>
                <h1 className="mb-2 font-bold text-3xl text-left">{pretitle}</h1>
                {text ? (
                  <p className="mb-4 text-left text-lg">{text}</p>
                ) : null}
              </>
            );
          })()}
          {children}
          </div>
          </section>
    )
}