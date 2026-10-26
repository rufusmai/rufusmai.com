import { useLocale } from 'next-intl';

import { Chip } from '@/components/site/Section';
import type { Project } from '@/content/types';

import { ProjectLinks } from './ProjectLinks';
import { ProjectLogo } from './ProjectLogo';
import { ProjectPreview } from './ProjectPreview';

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();

  return (
    <article className="group flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-4 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6">
      <ProjectPreview
        image={project.image}
        url={project.liveUrl ?? project.demoUrl}
        alt={project.title}
        className="shadow-none"
      />
      <div className="flex grow flex-col gap-4 px-1">
        <div className="flex items-start gap-4">
          <ProjectLogo logo={project.logo} />
          <div className="flex flex-col gap-1">
            <h3 className="text-h3 font-bold">{project.title}</h3>
            <p className="font-caption text-caption text-muted-foreground">
              {[project.client, project.years].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">{project.summary[locale]}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <ProjectLinks project={project} size="sm" />
        </div>
      </div>
    </article>
  );
}
