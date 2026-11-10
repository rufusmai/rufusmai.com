import type { StaticImageData } from 'next/image';

import ludwigSpaceImage from '@/assets/projects/ludwig-space.jpg';
import ludwigSpaceFullImage from '@/assets/projects/ludwig-space-full.jpg';
import ludwigSpaceLogo from '@/assets/projects/ludwig-space-logo.png';
import numiImage from '@/assets/projects/numi.jpg';
import numiFullImage from '@/assets/projects/numi-full.jpg';
import numiLogoSvg from '@/assets/projects/numi-logo.svg';
import pounceImage from '@/assets/projects/pounce.jpg';
import pounceLogoSvg from '@/assets/projects/pounce-logo.svg';

import type { Brand, Project } from './types';

// Next.js types SVG imports as `any`; they are static image objects.
const numiLogo = numiLogoSvg as StaticImageData;
const pounceLogo = pounceLogoSvg as StaticImageData;

const pounce: Project = {
  slug: 'pounce',
  brand: 'labs',
  title: 'Pounce',
  subtitle: {
    de: 'Schneller beim besten Angebot',
    en: 'First to the best deal',
  },
  summary: {
    de: 'Pounce durchsucht Kleinanzeigen und eBay rund um die Uhr, bewertet jede neue Anzeige mit KI und meldet nur die Treffer, die wirklich passen – per Telegram, WhatsApp oder E-Mail.',
    en: 'Pounce watches Kleinanzeigen and eBay around the clock, rates every new listing with AI and only reports the matches that really fit – via Telegram, WhatsApp or e-mail.',
  },
  years: '2026',
  role: {
    de: 'Idee, Design & Entwicklung',
    en: 'Idea, design & development',
  },
  stack: [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Neon Postgres',
    'Drizzle',
    'Better Auth',
    'OpenAI',
    'Node.js worker',
    'Docker',
  ],
  image: pounceImage,
  logo: { src: pounceLogo, alt: 'Pounce' },
  demoUrl: 'https://pounce.demo.rufusmai.com',
  liveUrl: 'https://pounce.rufusmai.com',
  status: { de: 'Invite-only Beta', en: 'Invite-only beta' },
  highlights: {
    de: [
      'Suchaufträge für Kleinanzeigen und eBay, Vinted ist in Planung',
      'KI-Bewertung von Preis, Vertrauenswürdigkeit und Betrugsmustern',
      'Fahrzeit zur Abholung mit Auto oder ÖPNV',
      'Automatische Nachricht an den Verkäufer, bevor andere die Anzeige sehen',
    ],
    en: [
      'Search jobs for Kleinanzeigen and eBay, Vinted is planned',
      'AI rating of price, trustworthiness and scam patterns',
      'Pickup travel time by car or public transport',
      'Automatic message to the seller before anyone else sees the listing',
    ],
  },
  steps: {
    de: [
      'Suchauftrag anlegen: Gesuchtes, Preisrahmen und Umkreis.',
      'Pounce prüft Kleinanzeigen und eBay rund um die Uhr auf neue Anzeigen.',
      'Jede Anzeige wird gefiltert und von KI bewertet: Preis, Vertrauen, Betrugssignale und Fahrzeit.',
      'Passende Treffer kommen sofort per Telegram, WhatsApp oder E-Mail.',
      'Auf Wunsch schreibt Pounce dem Verkäufer direkt – bevor andere die Anzeige überhaupt gesehen haben.',
    ],
    en: [
      'Create a search job: what you want, your price range and your area.',
      'Pounce checks Kleinanzeigen and eBay for new listings around the clock.',
      'Every listing is filtered and rated by AI: price, trust, scam signals and travel time.',
      'Matches reach you instantly via Telegram, WhatsApp or e-mail.',
      'If you like, Pounce messages the seller right away – before anyone else has even seen the listing.',
    ],
  },
};

const ludwigSpace: Project = {
  slug: 'ludwig-space',
  brand: 'consulting',
  title: 'ludwig space',
  subtitle: {
    de: 'Website für eine Münchner Galerie für zeitgenössische Kunst',
    en: 'Website for a Munich gallery of contemporary art',
  },
  summary: {
    de: 'Eine Galerie-Website, die sich wie ein Ausstellungsraum anfühlt – und die das Team seit dem Launch täglich selbst pflegt, ganz ohne Entwickler.',
    en: 'A gallery website that feels like an exhibition space – and that the team has updated on its own every day since launch, without a developer.',
  },
  client: 'ludwig space – Dietlinde Behncke',
  years: '2022–2025',
  role: {
    de: 'Design, Konzeption & Entwicklung',
    en: 'Design, concept & development',
  },
  stack: [
    'Next.js',
    'React Server Components',
    'TypeScript',
    'TinaCMS',
    'Framer Motion',
    'Tailwind CSS',
    'next-intl',
    'Vercel',
  ],
  image: ludwigSpaceImage,
  scrollImage: ludwigSpaceFullImage,
  logo: { src: ludwigSpaceLogo, alt: 'ludwig space' },
  demoUrl: 'https://ludwig-space.demo.rufusmai.com',
  snapshotNote: {
    de: 'Die Demo zeigt den Stand vor dem Redesign 2025. Formulare und Newsletter sind dort deaktiviert.',
    en: 'The demo shows the state before the 2025 redesign. Forms and newsletter are disabled there.',
  },
  highlights: {
    de: [
      'Über 2.800 Commits, die meisten davon Content-Updates des Galerie-Teams',
      'Git-basiertes CMS mit rund 170 Einträgen in 9 Collections',
      'Gezielte Cache-Invalidierung per signiertem Webhook',
      'Import von Werkdaten direkt aus dem Galerie-System Artlogic',
    ],
    en: [
      'Over 2,800 commits, most of them content updates by the gallery team',
      'Git-based CMS with around 170 entries in 9 collections',
      'Targeted cache invalidation through a signed webhook',
      'Artwork data imported straight from the gallery system Artlogic',
    ],
  },
  caseStudy: {
    idea: {
      de: 'ludwig space ist eine Galerie für zeitgenössische Kunst in München. Die Website sollte sich wie ein Ausstellungsraum anfühlen: viel Weißraum, große Bilder, ruhige Bewegungen – und trotzdem täglich vom Galerie-Team ohne Entwickler gepflegt werden können. Künstler:innen, Werke, Ausstellungen, Messen, Gallery Talks und News sind eng miteinander verknüpft.',
      en: 'ludwig space is a gallery for contemporary art in Munich. The website should feel like an exhibition space: lots of white space, large images, calm motion – while the gallery team updates it daily without a developer. Artists, artworks, exhibitions, fairs, gallery talks and news are all closely linked.',
    },
    role: {
      de: 'Ich habe die Seite von der ersten Skizze bis zum Betrieb allein verantwortet: Konzept, Design, Entwicklung, Hosting und Support für das Galerie-Team.',
      en: 'I was solely responsible for the site from the first sketch to day-to-day operation: concept, design, development, hosting and support for the gallery team.',
    },
    architecture: {
      de: [
        'Next.js App Router mit React Server Components – Inhalte werden auf dem Server geladen und statisch ausgeliefert, nur interaktive Teile laufen im Browser.',
        'TinaCMS als Git-basiertes CMS – alle Inhalte liegen als YAML im Repository. Das Team bearbeitet sie visuell, jede Änderung ist ein Commit mit voller Historie.',
        'Zweisprachig (DE/EN) mit next-intl und Spracherkennung per Accept-Language.',
        'Hosting auf Vercel mit Preview-Deployments für den dev-Branch.',
      ],
      en: [
        'Next.js App Router with React Server Components – content is loaded on the server and served statically, only interactive parts run in the browser.',
        'TinaCMS as a Git-based CMS – all content lives as YAML in the repository. The team edits it visually, and every change is a commit with full history.',
        'Bilingual (DE/EN) with next-intl and language detection via Accept-Language.',
        'Hosted on Vercel with preview deployments for the dev branch.',
      ],
    },
    highlights: {
      de: [
        'Gezielte Cache-Invalidierung: Ein GitHub-Webhook ruft die Revalidierung auf, prüft die HMAC-Signatur und invalidiert nur die betroffenen Cache-Tags – getrennt nach Production und Preview.',
        'Artlogic-Import: Ein eigener Endpunkt übernimmt Werkdaten aus dem Galerie-System Artlogic, gleicht Künstler:innen ab und legt die Werke direkt als CMS-Einträge an.',
        'Animationen mit Framer Motion: Seitenübergänge, gestaffelte Einblendungen beim Scrollen und eine Hero-Slideshow – über zentrale Varianten konsistent gehalten.',
        'Newsletter-Anbindung an MailerLite und Anfrage-E-Mails mit React Email.',
      ],
      en: [
        'Targeted cache invalidation: a GitHub webhook triggers revalidation, verifies the HMAC signature and only invalidates the affected cache tags – separately for production and preview.',
        'Artlogic import: a dedicated endpoint pulls artwork data from the gallery system Artlogic, matches artists and creates the artworks directly as CMS entries.',
        'Animations with Framer Motion: page transitions, staggered reveals on scroll and a hero slideshow – kept consistent through shared variants.',
        'Newsletter integration with MailerLite and inquiry e-mails built with React Email.',
      ],
    },
    outcome: {
      de: 'Seit dem Launch Anfang 2023 pflegt die Galerie sämtliche Inhalte selbst. Über 2.800 Commits – der Großteil davon Content-Updates des Teams über das CMS – zeigen, wie intensiv die Seite im Alltag genutzt wurde.',
      en: 'Since launching in early 2023, the gallery has maintained all of its content on its own. More than 2,800 commits – most of them content updates by the team through the CMS – show how intensively the site is used day to day.',
    },
  },
};

const numi: Project = {
  slug: 'numi',
  brand: 'consulting',
  title: 'numi',
  subtitle: {
    de: 'Landingpage und Plattform für KI-gestützte Supply-Chain-Planung',
    en: 'Landing page and platform for AI-powered supply chain planning',
  },
  summary: {
    de: 'Seit 2021 entwickle ich mit numi die Website und die Plattform dahinter – von der kleinen Startup-Seite zur mehrsprachigen Marketing-Plattform.',
    en: 'Since 2021 I have been building numi’s website and the platform behind it – from a small startup page to a multilingual marketing platform.',
  },
  client: 'numi solutions GmbH',
  years: '2021–2026',
  role: {
    de: 'Mitentwicklung, Architektur & technische Leitung der Website',
    en: 'Co-development, architecture & technical lead of the website',
  },
  stack: [
    'Next.js',
    'React',
    'TypeScript',
    'next-intl',
    'MDX',
    'Tailwind CSS',
    'shadcn/ui',
    'Lottie',
    'AWS',
  ],
  image: numiImage,
  scrollImage: numiFullImage,
  logo: { src: numiLogo, alt: 'numi' },
  demoUrl: 'https://numi.demo.rufusmai.com',
  liveUrl: 'https://numi.digital',
  snapshotNote: {
    de: 'Die Demo zeigt den Stand vor dem Relaunch im Frühjahr 2026. Formulare und Tracking sind dort deaktiviert.',
    en: 'The demo shows the state before the spring 2026 relaunch. Forms and tracking are disabled there.',
  },
  highlights: {
    de: [
      'Fünf Jahre Partnerschaft – vom ersten Commit bis zur Senior-Rolle',
      'SEO als Architektur: Sitemap, OpenGraph und JSON-LD für alle Seitentypen',
      'Migrationen im laufenden Betrieb bis Next.js 16 und Tailwind CSS v4',
      'Lokalisierte URLs mit Redirects von alten Pfaden',
    ],
    en: [
      'Five years of partnership – from the first commit to a senior role',
      'SEO as architecture: sitemap, OpenGraph and JSON-LD for every page type',
      'Live migrations all the way to Next.js 16 and Tailwind CSS v4',
      'Localised URLs with redirects from legacy paths',
    ],
  },
  caseStudy: {
    idea: {
      de: 'numi entwickelt eine KI-Plattform für Bedarfsplanung, Bestandsoptimierung und Einkauf. Die Landingpage muss ein erklärungsbedürftiges B2B-Produkt greifbar machen, für Google und KI-Suchen gut auffindbar sein und gleichzeitig schnell genug bleiben, um bei den Core Web Vitals zu bestehen – zweisprachig und mit vielen Produkt-, Lösungs- und Blogseiten.',
      en: 'numi builds an AI platform for demand planning, inventory optimisation and procurement. The landing page has to make a complex B2B product tangible, rank well on Google and AI search, and stay fast enough to pass the Core Web Vitals – bilingual and with many product, solution and blog pages.',
    },
    role: {
      de: 'Ich habe die Seite 2021 aufgesetzt und sie seitdem über mehrere Generationen technisch weiterentwickelt – zusammen mit einem kleinen Team aus Design, Entwicklung und Marketing.',
      en: 'I set the site up in 2021 and have evolved it technically across several generations since – together with a small team from design, development and marketing.',
    },
    architecture: {
      de: [
        'Next.js mit App Router, schrittweise migriert von Pages Router und next-i18next bis Next 16 mit Turbopack.',
        'Internationalisierung mit next-intl inklusive lokalisierter URLs und Redirects von alten Pfaden.',
        'MDX-Blog mit Frontmatter, automatisch generierten Meta-Beschreibungen und strukturierten Daten.',
        'Design-System auf Basis von Tailwind CSS v4 und shadcn/ui, animiert mit Framer Motion und Lottie.',
      ],
      en: [
        'Next.js with the App Router, migrated step by step from the Pages Router and next-i18next all the way to Next 16 with Turbopack.',
        'Internationalisation with next-intl including localised URLs and redirects from legacy paths.',
        'MDX blog with frontmatter, auto-generated meta descriptions and structured data.',
        'Design system based on Tailwind CSS v4 and shadcn/ui, animated with Framer Motion and Lottie.',
      ],
    },
    highlights: {
      de: [
        'SEO als Architektur: dynamisch generierte Sitemap und robots.txt, OpenGraph-Tags sowie JSON-LD für Organisation, Produkte, Blogposts und Breadcrumbs.',
        'Performance: Lottie-Animationen laden erst im Viewport, ein reduziertes Framer-Motion-Bundle und ein Cookie-Banner, der das Largest Contentful Paint nicht mehr blockiert.',
        'Migrationen im laufenden Betrieb: Tailwind CSS v4, wiederverwendbare shadcn-Komponenten und aktuelle Next.js- und next-intl-Versionen – ohne die Seite anzuhalten.',
        'Scroll-Animationen mit Spring-Smoothing für die Produktsektion und interaktive UI-Vorschauen der Plattform.',
      ],
      en: [
        'SEO as architecture: dynamically generated sitemap and robots.txt, OpenGraph tags and JSON-LD for the organisation, products, blog posts and breadcrumbs.',
        'Performance: Lottie animations only load in the viewport, a reduced Framer Motion bundle and a cookie banner that no longer blocks the Largest Contentful Paint.',
        'Migrations while live: Tailwind CSS v4, reusable shadcn components and current Next.js and next-intl versions – without taking the site down.',
        'Scroll animations with spring smoothing for the product section and interactive UI previews of the platform.',
      ],
    },
    outcome: {
      de: 'Die Seite ist über fünf Jahre mit dem Produkt mitgewachsen – von einer kleinen Startup-Seite zu einer mehrsprachigen Marketing-Plattform mit Produktseiten, Branchenlösungen, Kundenstories und Blog.',
      en: 'The site has grown with the product for five years – from a small startup page to a multilingual marketing platform with product pages, industry solutions, customer stories and a blog.',
    },
    beyond: {
      title: {
        de: 'Mehr als die Website',
        en: 'Beyond the website',
      },
      body: {
        de: 'Als erster Software Engineer nach den beiden Gründern habe ich auch die Plattform von numi von Grund auf mit aufgebaut: Frontend und Backend, skalierbare Datenbankarchitektur und die AWS-Infrastruktur. Seit 2025 betreue ich als Senior Software Engineer langfristige Softwareprojekte und begleite das Entwicklungsteam.',
        en: 'As the first software engineer after the two co-founders, I also helped build the numi platform from the ground up: front end and back end, a scalable database architecture and the AWS infrastructure. Since 2025 I have been leading long-term software projects and mentoring the development team as Senior Software Engineer.',
      },
    },
  },
  credits: [
    {
      name: 'Moritz Krol',
      role: { de: 'Design & Entwicklung', en: 'Design & development' },
    },
    { name: 'Skender Gashi', role: { de: 'Entwicklung', en: 'Development' } },
    { name: 'Marvin Hülsmann', role: { de: 'Entwicklung', en: 'Development' } },
    { name: 'Yulia Fedorova', role: { de: 'Content', en: 'Content' } },
    {
      name: 'Stefan Gaubatz',
      role: { de: 'Content & SEO', en: 'Content & SEO' },
    },
  ],
};

export const projects: Project[] = [pounce, ludwigSpace, numi];

export function getProjectsByBrand(brand: Brand) {
  return projects.filter((project) => project.brand === brand);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Projects that have their own case study page under /projects/[slug]. */
export function getCaseStudies() {
  return projects.filter((project) => project.caseStudy);
}
