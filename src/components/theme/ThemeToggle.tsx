'use client';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/useMounted';

const ORDER = ['system', 'light', 'dark'] as const;
type Mode = (typeof ORDER)[number];

const ICONS = { system: MonitorIcon, light: SunIcon, dark: MoonIcon };

export function ThemeToggle() {
  const t = useTranslations('theme');
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current: Mode =
    mounted && ORDER.includes(theme as Mode) ? (theme as Mode) : 'system';
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = ICONS[current];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={t('label', { mode: t(current) })}
      title={t('label', { mode: t(current) })}
    >
      <Icon className="size-[1.15rem]" />
    </Button>
  );
}
