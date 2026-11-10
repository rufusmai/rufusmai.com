import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  FlaskConicalIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { ProjectLogo } from '@/components/projects/ProjectLogo';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { Chip, Section, SectionHeader } from '@/components/site/Section';
import { Button } from '@/components/ui/button';
import { getProjectsByBrand } from '@/content/projects';
import type { Project } from '@/content/types';
import type { LocaleParams } from '@/i18n/request';
import { Link, type Locale } from '@/i18n/routing';
import { getPageMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'labs.meta' });

  return getPageMetadata({
    href: '/labs',
    locale,
    title: t('title'),
    description: t('description'),
    absoluteTitle: true,
  });
}

export default function LabsPage({ params }: LocaleParams) {
  const locale = use(params).locale as Locale;
  setRequestLocale(locale);
  const t = useTranslations('labs');

  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent)] [background-size:24px_24px]"
        />
        <div className="container">
          <Reveal>
            <SectionHeader
              as="h1"
              eyebrow={t('hero.eyebrow')}
              title={t('hero.title')}
              titleLower={t('hero.titleLower')}
              lead={t('hero.lead')}
              className="max-w-4xl"
            />
          </Reveal>
        </div>
      </section>

      {getProjectsByBrand('labs').map((project) => (
        <LabProject key={project.slug} project={project} locale={locale} />
      ))}

      <Section>
        <Reveal>
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-dashed border-border p-8 sm:p-12">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FlaskConicalIcon className="size-6" />
            </span>
            <h2 className="text-h3 font-bold">{t('more.title')}</h2>
            <p className="max-w-2xl text-muted-foreground">{t('more.body')}</p>
            <Button asChild variant="outline" className="group">
              <Link href="/contact">
                {t('more.cta')}
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function LabProject({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations('labs.project');
  const tCommon = useTranslations('common');

  return (
    <Section id={project.slug} className="scroll-mt-16 bg-muted/40">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center gap-4">
            <ProjectLogo logo={project.logo} className="size-14" />
            <div>
              <h2 className="text-h2 font-bold">{project.title}</h2>
              <p className="text-muted-foreground">
                {project.subtitle[locale]}
              </p>
            </div>
          </div>
          {project.status && (
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-caption text-caption">
              <span className="size-2 animate-pulse-dot rounded-full bg-primary" />
              <span className="sr-only">{tCommon('status')}: </span>
              {project.status[locale]}
            </p>
          )}
          <p className="text-lead text-muted-foreground">
            {project.summary[locale]}
          </p>
          <div>
            <h3 className="mb-2 font-caption text-caption tracking-[0.2em] text-primary uppercase">
              {t('problemTitle')}
            </h3>
            <p>{t('pounceProblem')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.liveUrl && (
              <Button asChild size="lg" className="group">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('visit', { title: project.title })}
                  <ArrowUpRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">{tCommon('opensInNewTab')}</span>
                </a>
              </Button>
            )}
            {/* The demo shell frames the live app, with insights on its tech */}
            {project.demoUrl && (
              <Button asChild size="lg" variant="outline" className="group">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tCommon('liveDemo')}
                  <ArrowUpRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">{tCommon('opensInNewTab')}</span>
                </a>
              </Button>
            )}
          </div>
        </Reveal>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <Reveal delay={0.1}>
            <ProjectPreview
              image={project.image}
              url={project.liveUrl}
              alt={project.title}
            />
          </Reveal>
          {project.steps && (
            <div>
              <h3 className="mb-5 font-caption text-caption tracking-[0.2em] text-primary uppercase">
                {t('howTitle')}
              </h3>
              <Stagger as="ol" className="flex flex-col gap-4">
                {project.steps[locale].map((step, index) => (
                  <StaggerItem
                    as="li"
                    key={step}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-caption text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
          <div>
            <h3 className="mb-4 font-caption text-caption tracking-[0.2em] text-primary uppercase">
              {t('techTitle')}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Chip className="bg-card">{tech}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
