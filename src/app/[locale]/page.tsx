import {
  ArrowRightIcon,
  BriefcaseIcon,
  FlaskConicalIcon,
  GraduationCapIcon,
  type LucideIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { ContactCard } from '@/components/contact/ContactCard';
import { Hero } from '@/components/hero/Hero';
import { FlightPath } from '@/components/motion/FlightPath';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectLinks } from '@/components/projects/ProjectLinks';
import { ProjectLogo } from '@/components/projects/ProjectLogo';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { CtaBand } from '@/components/site/CtaBand';
import { JsonLd } from '@/components/site/JsonLd';
import {
  Chip,
  Eyebrow,
  Section,
  SectionHeader,
} from '@/components/site/Section';
import { Button } from '@/components/ui/button';
import { education, experience, profile } from '@/content/profile';
import { getProjectsByBrand } from '@/content/projects';
import type { TimelineEntry } from '@/content/types';
import type { LocaleParams } from '@/i18n/request';
import { Link, type Locale } from '@/i18n/routing';
import { getPageMetadata, HOST } from '@/lib/metadata';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return getPageMetadata({
    href: '/',
    locale,
    title: t('title'),
    description: t('description'),
    absoluteTitle: true,
  });
}

export default function HomePage({ params }: LocaleParams) {
  const locale = use(params).locale as Locale;
  setRequestLocale(locale);
  const t = useTranslations('home');
  const tMeta = useTranslations('meta');

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${HOST}/#person`,
              name: profile.name,
              url: HOST,
              email: `mailto:${profile.email}`,
              image: `${HOST}${profile.portrait.src}`,
              jobTitle: 'Senior Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'numi solutions GmbH',
              },
              alumniOf: [
                'Ludwig-Maximilians-Universität München',
                'Universität Hamburg',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hamburg',
                addressCountry: 'DE',
              },
              sameAs: [profile.links.linkedin, profile.links.github],
            },
            {
              '@type': 'ProfessionalService',
              '@id': `${HOST}/#consulting`,
              name: 'rufusmai consulting',
              description: tMeta('description'),
              url: HOST,
              email: profile.email,
              founder: { '@id': `${HOST}/#person` },
              areaServed: ['DE', 'EU'],
              knowsAbout: [
                'Web development',
                'Web applications',
                'Backend development',
                'Cloud infrastructure',
                'AI integration',
              ],
            },
          ],
        }}
      />

      <FlightPath>
        <Hero
          copy={{
            eyebrow: t('hero.eyebrow'),
            name: profile.name,
            title: t('hero.title'),
            lead: t('hero.lead'),
            ctaConsulting: t('hero.ctaConsulting'),
            ctaLabs: t('hero.ctaLabs'),
            ctaContact: t('hero.ctaContact'),
            scroll: t('hero.scroll'),
          }}
        />

        <About locale={locale} />
        <Brands />
        <LabsProjects locale={locale} />
        <ConsultingProjects />
        <Journey locale={locale} />

        <CtaBand
          title={t('cta.title')}
          body={t('cta.body')}
          button={t('cta.button')}
          // The beetle lands on top of the band
          flight="0.9,-0.07"
        />
      </FlightPath>
    </>
  );
}

function About({ locale }: { locale: Locale }) {
  const t = useTranslations('home.about');
  const since = profile.freelanceSince;
  const facts: { icon: LucideIcon; label: string }[] = [
    { icon: BriefcaseIcon, label: t('facts.role') },
    { icon: FlaskConicalIcon, label: t('facts.freelance', { since }) },
    { icon: GraduationCapIcon, label: t('facts.study') },
  ];

  return (
    <Section
      id="about"
      className="scroll-mt-16"
      data-flight="0.97,0.45;0.97,0.93"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <div className="flex flex-col gap-6">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <div className="flex items-center gap-5">
              <Image
                src={profile.portrait}
                alt={t('photoAlt')}
                placeholder="blur"
                sizes="96px"
                className="size-20 rounded-2xl object-cover sm:size-24"
              />
              <h2 className="text-h2 font-bold">{t('title')}</h2>
            </div>
            <p className="text-lead text-muted-foreground">
              {t('body', { since })}
            </p>
            <ul className="flex flex-col gap-3">
              {facts.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <p className="sr-only">{profile.location[locale]}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <ContactCard />
        </Reveal>
      </div>
    </Section>
  );
}

function Brands() {
  const t = useTranslations('home.brands');
  const brands = [
    { key: 'consulting', href: '/consulting', icon: BriefcaseIcon },
    { key: 'labs', href: '/labs', icon: FlaskConicalIcon },
  ] as const;

  return (
    <Section className="pt-0 sm:pt-0" data-flight="0.03,0.04;0.03,0.9">
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
      <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
        {brands.map(({ key, href, icon: Icon }) => (
          <StaggerItem key={key}>
            <Link
              href={href}
              className="group flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="text-h3 font-bold">
                rufusmai <span className="text-primary">{key}</span>
              </h3>
              <p className="text-muted-foreground">{t(`${key}.body`)}</p>
              <span className="mt-auto inline-flex items-center gap-2 font-medium text-primary">
                {t(`${key}.cta`)}
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function LabsProjects({ locale }: { locale: Locale }) {
  const t = useTranslations('home.labs');
  const tCommon = useTranslations('common');

  return (
    <Section className="bg-muted/40" data-flight="0.97,0.07;0.97,0.93">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
        />
        <Button asChild variant="outline" className="group">
          <Link href="/labs">
            {t('cta')}
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {getProjectsByBrand('labs').map((project) => (
          <Reveal key={project.slug}>
            <article className="grid items-center gap-8 rounded-3xl border border-border bg-card p-4 shadow-card sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
              <ProjectPreview
                image={project.image}
                url={project.liveUrl}
                alt={project.title}
                className="shadow-none"
              />
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <ProjectLogo logo={project.logo} />
                  <div>
                    <h3 className="text-h3 font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.subtitle[locale]}
                    </p>
                  </div>
                </div>
                {project.status && (
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 font-caption text-caption">
                    <span className="size-2 animate-pulse-dot rounded-full bg-primary" />
                    <span className="sr-only">{tCommon('status')}: </span>
                    {project.status[locale]}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {project.summary[locale]}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 6).map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
                <ProjectLinks project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ConsultingProjects() {
  const t = useTranslations('home.consulting');

  return (
    <Section data-flight="0.03,0.06;0.03,0.94">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
        />
        <Button asChild variant="outline" className="group">
          <Link href="/consulting">
            {t('cta')}
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
      <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
        {getProjectsByBrand('consulting').map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function Journey({ locale }: { locale: Locale }) {
  const t = useTranslations('home.journey');

  return (
    <Section className="bg-muted/40" data-flight="0.97,0.07;0.97,0.9">
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <Timeline
          title={t('experience')}
          icon={BriefcaseIcon}
          entries={experience}
          locale={locale}
          currentLabel={t('current')}
        />
        <Timeline
          title={t('education')}
          icon={GraduationCapIcon}
          entries={education}
          locale={locale}
          currentLabel={t('current')}
        />
      </div>
    </Section>
  );
}

function Timeline({
  title,
  icon: Icon,
  entries,
  locale,
  currentLabel,
}: {
  title: string;
  icon: LucideIcon;
  entries: TimelineEntry[];
  locale: Locale;
  currentLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="flex items-center gap-3 text-h3 font-bold">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        {title}
      </h3>
      <Stagger
        as="ol"
        className="relative flex flex-col gap-8 border-l border-border pl-6"
      >
        {entries.map((entry) => (
          <StaggerItem
            as="li"
            key={`${entry.organisation}-${entry.title.en}`}
            className="relative flex flex-col gap-1.5"
          >
            <span
              className={`absolute top-1.5 left-[-1.95rem] size-3 rounded-full border-2 border-background ${
                entry.current ? 'bg-primary' : 'bg-border'
              }`}
            />
            <p className="flex flex-wrap items-center gap-2 font-caption text-caption text-muted-foreground">
              {entry.period[locale]}
              {entry.current && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                  {currentLabel}
                </span>
              )}
            </p>
            <p className="font-heading text-lg font-semibold">
              {entry.title[locale]}
            </p>
            <p className="text-sm font-medium">{entry.organisation}</p>
            <p className="text-sm text-muted-foreground">
              {entry.description[locale]}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
