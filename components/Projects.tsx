import React, { useMemo, useState } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { Activity, ArrowUpRight, ExternalLink, Github, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectsProps {
  data?: any[];
  loading?: boolean;
}

const filters = [
  { label: 'All', value: 'all' },
  { label: 'EdTech', value: 'EdTech' },
  { label: 'FinTech', value: 'FinTech' },
];

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <button
        type="button"
        onClick={onClick}
        className="h-full w-full text-left rounded-lg border border-white/10 bg-surface/45 p-5 md:p-6 backdrop-blur-sm transition-all hover:border-accent/45 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10">
            <Sparkles className="text-accent" size={22} />
          </div>
          {project.live && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Live
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold leading-snug text-white transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        <div className="mb-4 flex items-start gap-2 text-xs text-slate-400">
          <Activity size={14} className="mt-0.5 flex-shrink-0 text-secondary" />
          <span className="font-mono uppercase tracking-wide leading-5">{project.category}</span>
        </div>

        <p className="mb-5 text-sm leading-6 text-slate-300">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tech.map((tech: string, index: number) => (
            <span
              key={`${tech}-${index}`}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium leading-5 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-accent">
          <span>View Details</span>
          <ArrowUpRight size={17} />
        </div>
      </button>
    </motion.article>
  );
};

const ProjectDetail = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const hasLiveUrl = Boolean(project.live && project.url && project.url !== '#');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 18 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-[#0B1524] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close project details"
        >
          <X size={20} />
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 pr-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-primary">
              <Sparkles size={24} className="text-white" />
            </div>
            {project.live && (
              <span className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-300">
                Live Project
              </span>
            )}
          </div>

          <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-4xl">
            {project.title}
          </h2>
          <p className="mb-7 text-base leading-7 text-slate-300">
            {project.description}
          </p>

          <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-white">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-accent to-secondary" />
            Technology Stack
          </h3>
          <div className="mb-7 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {project.tech.map((tech: string, index: number) => (
              <div
                key={`${tech}-${index}`}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200"
              >
                {tech}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {hasLiveUrl && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
              >
                <ExternalLink size={18} />
                Launch Project
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Github size={18} />
                View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const displayProjects = data && data.length > 0 ? data : PROJECTS;

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return displayProjects;
    return displayProjects.filter((project: any) => project.category.includes(activeFilter));
  }, [activeFilter, displayProjects]);

  return (
    <>
      <Section id="projects" title="Featured Projects">
        <div className="mb-8 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                activeFilter === filter.value
                  ? 'bg-accent text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project: any) => (
            <ProjectCard
              key={`${project.title}-${project.category}`}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
