import { ArrowLeftIcon, CheckIcon, InfoIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { Reveal } from '@/components/motion/Reveal';
import { ProjectLinks } from '@/components/projects/ProjectLinks';
import { ProjectLogo } from '@/components/projects/ProjectLogo';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { CtaBand } from '@/components/site/CtaBand';
import { Chip, Eyebrow } from '@/components/site/Section';
import { getCaseStudies, getProject } from '@/content/projects';
import { Link, type Locale } from '@/i18n/routing';
import { getPageMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';
export const dynamicParams = false;

type ProjectParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = () =>
  getCaseStudies().map((project) => ({ slug: project.slug }));

export async function generateMetadata({
  params,
}: ProjectParams): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  const t = await getTranslations({ locale, namespace: 'project.meta' });

  return getPageMetadata({
    href: { pathname: '/projects/[slug]', params: { slug } },
    locale,
    title: t('title', { title: project.title }),
    description: t('description', { subtitle: project.subtitle[locale] }),
  });
}

export default function ProjectPage({ params }: ProjectParams) {
  const { locale: rawLocale, slug } = use(params);
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = useTranslations('project');
  const tCommon = useTranslations('common');

  const project = getProject(slug);
  const study = project?.caseStudy;
  if (!project || !study) notFound();

  const meta = [
    { label: tCommon('client'), value: project.client },
    { label: tCommon('years'), value: project.years },
    { label: tCommon('role'), value: project.role[locale] },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value)
  );

  return (
    <>
      <section className="pt-32 pb-12 sm:pt-40">
        <div className="container flex flex-col gap-10">
          <Reveal className="flex flex-col gap-6">
            <Link
              href="/consulting"
              className="group inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeftIcon className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {t('back')}
            </Link>
            <div className="flex items-center gap-4">
              <ProjectLogo logo={project.logo} className="h-14" />
              <Eyebrow>{tCommon('caseStudy')}</Eyebrow>
            </div>
            <h1 className="text-display font-extrabold">{project.title}</h1>
            <p className="max-w-3xl text-lead text-muted-foreground">
              {project.subtitle[locale]}
            </p>
            <dl className="grid gap-6 border-y border-border py-6 sm:grid-cols-3">
              {meta.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="font-caption text-caption tracking-[0.2em] text-muted-foreground uppercase">
                    {label}
                  </dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <ProjectLinks project={project} caseStudy={false} />
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectPreview
              image={project.image}
              url={project.liveUrl ?? project.demoUrl}
              alt={project.title}
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container grid gap-12 lg:grid-cols-12">
          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-3 lg:sticky lg:top-28">
              <h2 className="font-caption text-caption tracking-[0.2em] text-primary uppercase">
                {tCommon('stack')}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
              </ul>
              {project.snapshotNote && (
                <p className="mt-4 flex gap-2 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                  <InfoIcon className="mt-0.5 size-4 shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">
                      {t('snapshot')}:{' '}
                    </span>
                    {project.snapshotNote[locale]}
                  </span>
                </p>
              )}
            </div>
          </aside>

          <div className="flex flex-col gap-12 lg:col-span-8">
            <CaseSection title={t('idea')}>
              <p>{study.idea[locale]}</p>
            </CaseSection>
            <CaseSection title={t('role')}>
              <p>{study.role[locale]}</p>
            </CaseSection>
            <CaseSection title={t('architecture')}>
              <List items={study.architecture[locale]} />
            </CaseSection>
            <CaseSection title={t('highlights')}>
              <List items={study.highlights[locale]} />
            </CaseSection>
            <CaseSection title={t('outcome')}>
              <p>{study.outcome[locale]}</p>
            </CaseSection>
            {study.beyond && (
              <CaseSection title={study.beyond.title[locale]}>
                <p>{study.beyond.body[locale]}</p>
              </CaseSection>
            )}
            {project.credits && (
              <CaseSection title={t('credits')}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.credits.map((credit) => (
                    <li key={credit.name} className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {credit.name}
                      </span>
                      <span className="text-sm">{credit.role[locale]}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        button={t('cta.button')}
      />
    </>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold">{title}</h2>
        <div className="text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckIcon className="mt-1.5 size-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
