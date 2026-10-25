import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/routing';

interface ProjectLinksProps {
  project: Project;
  /** Hide the case study link, e.g. on the case study page itself. */
  caseStudy?: boolean;
  size?: 'default' | 'sm';
}

export function ProjectLinks({
  project,
  caseStudy = true,
  size = 'default',
}: ProjectLinksProps) {
  const t = useTranslations('common');

  return (
    <div className="flex flex-wrap gap-2">
      {project.demoUrl && (
        <Button asChild size={size} className="group">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            {t('liveDemo')}
            <ArrowUpRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">{t('opensInNewTab')}</span>
          </a>
        </Button>
      )}
      {caseStudy && project.caseStudy && (
        <Button asChild size={size} variant="outline" className="group">
          <Link
            href={{
              pathname: '/projects/[slug]',
              params: { slug: project.slug },
            }}
          >
            {t('caseStudy')}
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      )}
      {project.liveUrl && (
        <Button
          asChild
          size={size}
          variant={project.demoUrl ? 'ghost' : 'default'}
          className="group"
        >
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {t('visitSite')}
            <ArrowUpRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">{t('opensInNewTab')}</span>
          </a>
        </Button>
      )}
    </div>
  );
}
