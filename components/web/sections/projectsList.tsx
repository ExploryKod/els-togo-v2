'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ProjectDto } from '@/lib/dto/ProjectDto';
import ElsMasonry from '@/components/web/utils/elsMasonry';
import clsx from 'clsx';

interface ProjectsListProps {
  initialProjects: ProjectDto[];
}

const PROJECTS_PER_PAGE = 6;

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState<ProjectDto[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProjects.length >= PROJECTS_PER_PAGE);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  // Derive available categories from current project list (initially from SSR data)
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach(p => p.category && set.add(p.category));
    projects.forEach(p => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [initialProjects, projects]);

  const loadMoreProjects = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page + 1),
        limit: String(PROJECTS_PER_PAGE),
      });
      if (query.trim()) params.set('q', query.trim());
      if (activeCategories.length > 0) params.set('categories', activeCategories.join(','));

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (response.ok) {
        const newProjects = await response.json();
        if (newProjects.length > 0) {
          setProjects(prev => [...prev, ...newProjects]);
          setPage(prev => prev + 1);
          setHasMore(newProjects.length === PROJECTS_PER_PAGE);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      // Silent fail on load-more
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, query, activeCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProjects();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreProjects, hasMore, loading]);

  // When filters change (query or categories), reset list and fetch first page with filters
  useEffect(() => {
    let cancelled = false;
    async function fetchFirstPage() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: '1', limit: String(PROJECTS_PER_PAGE) });
        if (query.trim()) params.set('q', query.trim());
        if (activeCategories.length > 0) params.set('categories', activeCategories.join(','));
        const response = await fetch(`/api/projects?${params.toString()}`);
        if (!cancelled && response.ok) {
          const firstPage = await response.json();
          setProjects(firstPage);
          setPage(1);
          setHasMore(firstPage.length === PROJECTS_PER_PAGE);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchFirstPage();
    return () => { cancelled = true; };
  }, [query, activeCategories]);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search bar */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => {
              const active = activeCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategories((prev) =>
                      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                    );
                  }}
                  className={clsx(
                    'px-3 py-1 rounded-full text-sm border transition-colors',
                    active
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ElsMasonry projects={projects} />
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Intersection observer target */}
      <div ref={observerRef} className="h-4" />
      
      {/* End of projects message */}
      {!hasMore && projects.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          Tous les projets ont été chargés
        </div>
      )}
    </div>
  );
}
