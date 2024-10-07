"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  goal: string;
  howWeDo: string;
  results: string;
  date: string;
  projectImg: string;
};

type ProjectBlockProps = {
  project: Project;
  previousProject: Project | null;
  nextProject: Project | null;
};

export default function ProjectBlock({
  project,
  previousProject,
  nextProject,
}: ProjectBlockProps) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<"description" | "goal" | "how-we-do" | "results">("description");

  // Tab list
  const tabs = [
    { id: "description", label: "Description", content: project.description },
    { id: "goal", label: "Objectifs", content: project.goal },
    { id: "how-we-do", label: "Démarche", content: project.howWeDo },
    { id: "results", label: "Nos résultats", content: project.results },
  ].filter(tab => tab.content); // Only show tabs that have content

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);

      if (event.key === "ArrowRight") {
        const nextIndex = (activeTabIndex + 1) % tabs.length;
        setActiveTab(tabs[nextIndex].id as typeof activeTab);
      } else if (event.key === "ArrowLeft") {
        const prevIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
        setActiveTab(tabs[prevIndex].id as typeof activeTab);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, tabs]);

  return (
    <>
      <section className="inter-post-section">
        <div className={`inter-post-wrapper ${nextProject && previousProject ? "previous-and-next-links" : "only-one-link"}`}>
          {previousProject && (
            <Link
              href={`/project/${previousProject.id}`}
              className="els-text-link els-text-link--blue inter-post-link previous-link"
            >
              <span className="inter-post-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-chevrons-left lucide"
                >
                  <path d="m11 17-5-5 5-5" />
                  <path d="m18 17-5-5 5-5" />
                </svg>
              </span>
              <span className="inter-post-text">Précédent</span>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/project/${nextProject.id}`}
              className="els-text-link els-text-link--blue inter-post-link next-link"
            >
              <span className="inter-post-text">Suivant</span>
              <span className="inter-post-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-chevrons-right lucide"
                >
                  <path d="m6 17 5-5-5-5" />
                  <path d="m13 17 5-5-5-5" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="row section-project">
        <div className="col-12 col-md-4 project__image">
          <div className="img-wrapper">
            <Image
              height={300}
              width={300}
              src={
                project.projectImg ??
                "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg"
              }
              alt={project.title}
              className="w-full h-full"
            />
          </div>
          <div className="subtext-wrapper">
            <span className="els-text--bold els-text--light els-text-xs">
              {project.date}
            </span>
          </div>
        </div>

        <div className="col-12 col-md-8 project__content">
          <div className="content__tabs-wrapper">
            <nav>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pill js-tab-pill ${activeTab === tab.id ? "active" : ""}`}
                  data-tab={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  {tab.label}
                </div>
              ))}
            </nav>
          </div>

          <div className="content__text-wrapper">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                data-content={tab.id}
                className={`content__text js-content__text ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.content ? tab.content : ""}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
