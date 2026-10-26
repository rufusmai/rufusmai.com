import {
  AppWindowIcon,
  ArrowRightIcon,
  AwardIcon,
  CheckIcon,
  CompassIcon,
  EyeIcon,
  GlobeIcon,
  HandshakeIcon,
  type LucideIcon,
  MessagesSquareIcon,
  ServerIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { ProcessSteps } from '@/components/consulting/ProcessSteps';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { ProjectLinks } from '@/components/projects/ProjectLinks';
import { ProjectLogo } from '@/components/projects/ProjectLogo';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { CtaBand } from '@/components/site/CtaBand';
import { Logo } from '@/components/site/Logo';
import { Chip, Section, SectionHeader } from '@/components/site/Section';
import { Button } from '@/components/ui/button';
import { getProjectsByBrand } from '@/content/projects';
import type { LocaleParams } from '@/i18n/request';
import { Link, type Locale } from '@/i18n/routing';
import { getPageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const dynamic = 'force-static';

const SERVICES = [
  { key: 'websites', icon: GlobeIcon, wide: true },
  { key: 'apps', icon: AppWindowIcon, wide: true },
  { key: 'backend', icon: ServerIcon, wide: false },
  { key: 'lead', icon: CompassIcon, wide: false },
  { key: 'ai', icon: SparklesIcon, wide: false },
] as const satisfies readonly {
  key: string;
  icon: LucideIcon;
  wide: boolean;
}[];

const STEPS = ['call', 'offer', 'build', 'care'] as const;

const REASONS = [
  { key: 'partnerships', icon: HandshakeIcon },
  { key: 'senior', icon: AwardIcon },
  { key: 'direct', icon: MessagesSquareIcon },
  { key: 'transparent', icon: EyeIcon },
  { key: 'ai', icon: ZapIcon },
] as const satisfies readonly { key: string; icon: LucideIcon }[];

const STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Tailwind CSS',
  'shadcn/ui',
  'PostgreSQL',
  'Drizzle',
  'Payload CMS',
  'next-intl',
  'AWS',
  'Vercel',
  'Docker',
  'Python',
  'OpenAI & Claude',
];

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'consulting.meta' });

  return getPageMetadata({
    href: '/consulting',
    locale,
    title: t('title'),
    description: t('description'),
    absoluteTitle: true,
  });
}

export default function ConsultingPage({ params }: LocaleParams) {
  const locale = use(params).locale as Locale;
  setRequestLocale(locale);
  const t = useTranslations('consulting');

  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_20%,color-mix(in_oklab,var(--brand-wing)_16%,transparent),transparent_70%)]"
        />
        <Logo
          variant="icon"
          aria-hidden="true"
          className="pointer-events-none absolute top-28 -right-16 -z-10 hidden size-96 rotate-12 opacity-[0.07] lg:block"
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
            >
              <div className="flex flex-wrap gap-3 pt-4">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    {t('hero.cta')}
                    <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#work">{t('hero.secondary')}</a>
                </Button>
              </div>
            </SectionHeader>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeader
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
        />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map(({ key, icon: Icon, wide }) => (
            <StaggerItem
              key={key}
              className={cn(wide ? 'lg:col-span-3' : 'lg:col-span-2')}
            >
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-h3 font-bold">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`services.items.${key}.body`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                eyebrow={t('process.eyebrow')}
                title={t('process.title')}
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessSteps
              steps={STEPS.map((step) => ({
                title: t(`process.steps.${step}.title`),
                body: t(`process.steps.${step}.body`),
              }))}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={t('why.eyebrow')} title={t('why.title')} />
        <Stagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ key, icon: Icon }) => (
            <StaggerItem key={key} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-lg font-semibold">
                  {t(`why.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`why.items.${key}.body`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="work" className="scroll-mt-16 bg-muted/40">
        <SectionHeader
          eyebrow={t('work.eyebrow')}
          title={t('work.title')}
          lead={t('work.lead')}
        />
        <div className="mt-12 flex flex-col gap-16 lg:gap-24">
          {getProjectsByBrand('consulting').map((project, index) => (
            <Reveal key={project.slug}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <ProjectPreview
                  image={project.image}
                  url={project.liveUrl ?? project.demoUrl}
                  alt={project.title}
                  className={cn(index % 2 === 1 && 'lg:order-last')}
                />
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <ProjectLogo logo={project.logo} />
                    <div>
                      <h3 className="text-h3 font-bold">{project.title}</h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {[project.client, project.years]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {project.summary[locale]}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {project.highlights[locale].map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
                        <span>{highlight}</span>
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

      <Section>
        <SectionHeader eyebrow={t('stack.eyebrow')} title={t('stack.title')} />
        <Stagger as="ul" className="mt-10 flex flex-wrap gap-2.5">
          {STACK.map((tech) => (
            <StaggerItem as="li" key={tech}>
              <Chip className="px-4 py-2 text-sm text-foreground">{tech}</Chip>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        button={t('cta.button')}
      />
    </>
  );
}
