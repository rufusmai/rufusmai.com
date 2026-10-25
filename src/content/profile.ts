import portrait from '@/assets/rufus-maiwald.jpg';

import type { Localized, TimelineEntry } from './types';

export const profile = {
  name: 'Rufus Maiwald',
  email: 'mail@rufusmai.com',
  portrait,
  location: { de: 'Hamburg', en: 'Hamburg, Germany' } satisfies Localized,
  freelanceSince: 2020,
  links: {
    linkedin: 'https://www.linkedin.com/in/rufus-maiwald/',
    github: 'https://github.com/rufusmai',
  },
} as const;

/** From LinkedIn, most recent first. */
export const experience: TimelineEntry[] = [
  {
    organisation: 'numi solutions GmbH',
    title: {
      de: 'Senior Software Engineer',
      en: 'Senior Software Engineer',
    },
    period: { de: 'seit April 2025', en: 'since April 2025' },
    description: {
      de: 'Ich betreue langfristige interne Softwareprojekte und begleite und mentore das Entwicklungsteam. Seit Oktober 2026 neben dem Master in Teilzeit.',
      en: 'I oversee long-term internal software projects and guide and mentor the development team. Part-time alongside my Master’s since October 2026.',
    },
    current: true,
  },
  {
    organisation: 'rufusmai',
    title: {
      de: 'Freelance Full-Stack Engineer',
      en: 'Freelance Full-Stack Engineer',
    },
    period: { de: 'seit November 2020', en: 'since November 2020' },
    description: {
      de: 'Websites, Apps und Unternehmenssoftware für Firmen und Selbstständige – heute unter rufusmai consulting.',
      en: 'Websites, apps and business software for companies and independent professionals – today as rufusmai consulting.',
    },
    current: true,
  },
  {
    organisation: 'numi solutions GmbH',
    title: {
      de: 'Freelance Software Engineer',
      en: 'Freelance Software Engineer',
    },
    period: { de: 'Juni 2021 – März 2025', en: 'June 2021 – March 2025' },
    description: {
      de: 'Als erster Software Engineer nach den beiden Gründern habe ich die Full-Stack-Infrastruktur von numi von Grund auf entworfen und gebaut: Frontend und Backend, skalierbare Datenbanken und AWS.',
      en: 'As the first software engineer after the two co-founders, I designed and built numi’s full-stack infrastructure from the ground up: front end and back end, scalable databases and AWS.',
    },
  },
  {
    organisation: 'Ludwig-Maximilians-Universität München',
    title: { de: 'Tutor für C', en: 'Tutor for C programming' },
    period: { de: 'Okt. 2022 – Feb. 2023', en: 'Oct 2022 – Feb 2023' },
    description: {
      de: 'Tutorien zum Praktikum „Programmieren in C“.',
      en: 'Tutorials for the practical course “Programming in C”.',
    },
  },
  {
    organisation: 'Immoauk',
    title: {
      de: 'Full-Stack-Entwickler (Werkstudent)',
      en: 'Full-stack developer (working student)',
    },
    period: { de: 'Jan. – Mai 2021', en: 'Jan – May 2021' },
    description: {
      de: 'Laravel-Plattform für Immobilienauktionen: Auktionslogik und Frontend.',
      en: 'Laravel platform for real estate auctions: auction logic and front end.',
    },
  },
  {
    organisation: 'MC one',
    title: { de: 'Gründer & Maintainer', en: 'Founder & maintainer' },
    period: { de: '2014 – 2021', en: '2014 – 2021' },
    description: {
      de: 'Mit 14 gegründet: ein Minecraft-Netzwerk mit eigenen Server-Plugins und einem ehrenamtlichen Team von bis zu 20 Entwicklern und Moderatoren.',
      en: 'Founded at 14: a Minecraft network with self-built server plugins and a volunteer team of up to 20 developers and moderators.',
    },
  },
];

export const education: TimelineEntry[] = [
  {
    organisation: 'Universität Hamburg',
    title: {
      de: 'M.Sc. IT-Management und Consulting',
      en: 'M.Sc. IT Management and Consulting',
    },
    period: { de: 'seit Oktober 2026', en: 'since October 2026' },
    description: {
      de: 'Masterstudium mit Schwerpunkt auf IT-Strategie, Beratung und Digitalisierung.',
      en: 'Master’s programme focused on IT strategy, consulting and digital transformation.',
    },
    current: true,
  },
  {
    organisation: 'Ludwig-Maximilians-Universität München',
    title: { de: 'B.Sc. Informatik', en: 'B.Sc. Computer Science' },
    period: { de: '2019 – 2026', en: '2019 – 2026' },
    description: {
      de: 'Inklusive Erasmus-Semester an der Universität Warschau (2022/23).',
      en: 'Including an Erasmus semester at the University of Warsaw (2022/23).',
    },
  },
];
