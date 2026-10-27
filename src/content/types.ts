import type { StaticImageData } from 'next/image';

import type { Locale } from '@/i18n/routing';

export type Localized<T = string> = Record<Locale, T>;

export type Brand = 'consulting' | 'labs';

export interface ProjectLogo {
  src: StaticImageData;
  /** Rendered on a white tile, so every client logo sits on the same ground. */
  alt: string;
}

export interface CaseStudy {
  idea: Localized;
  role: Localized;
  architecture: Localized<string[]>;
  highlights: Localized<string[]>;
  outcome: Localized;
  /** Work beyond the demoed site, e.g. the product behind a landing page. */
  beyond?: { title: Localized; body: Localized };
}

export interface Project {
  slug: string;
  brand: Brand;
  title: string;
  subtitle: Localized;
  summary: Localized;
  client?: string;
  years: string;
  role: Localized;
  stack: string[];
  image: StaticImageData;
  /** A tall screenshot that scrolls inside the preview frame on cards */
  scrollImage?: StaticImageData;
  logo: ProjectLogo;
  /** Live demo snapshot on demo.rufusmai.com */
  demoUrl?: string;
  liveUrl?: string;
  /** Short proof points for cards and the consulting page */
  highlights: Localized<string[]>;
  caseStudy?: CaseStudy;
  /** Labs projects: how the product works, step by step */
  steps?: Localized<string[]>;
  status?: Localized;
  snapshotNote?: Localized;
  credits?: { name: string; role: Localized }[];
}

export interface TimelineEntry {
  organisation: string;
  title: Localized;
  period: Localized;
  description: Localized;
  current?: boolean;
}
