
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
  className?: string;
} & PropsWithChildren

export const ProjectSection = ({sections, children, className = ''}:ProjectProps) => {

    return(
        <section id="nos-projets" className={`projects-section ${className}`}>
        <div className="container">
          {(() => {
            const first = sections?.project?.[0];
            const pretitle = first?.pretitle || 'Nos projets';
            const text = first?.text || '';
            return (
              <>
                <div className="pre-title">{pretitle}</div>
                <h1 className="mb-2 font-bold text-3xl text-left">{first?.title || 'Découvrez nos réalisations'}</h1>
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