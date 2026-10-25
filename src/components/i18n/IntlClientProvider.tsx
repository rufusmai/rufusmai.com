import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider, useMessages } from 'next-intl';

interface IntlClientProviderProps {
  /** Message namespaces (dot paths allowed) the client components need. */
  partial: string[];
  children: React.ReactNode;
}

/** Sends only the given namespaces to the client instead of all messages. */
export function IntlClientProvider({
  partial,
  children,
}: IntlClientProviderProps) {
  const messages = useMessages() as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={pickMessages(messages, partial)}>
      {children}
    </NextIntlClientProvider>
  );
}

function pickMessages(messages: AbstractIntlMessages, paths: string[]) {
  const picked: AbstractIntlMessages = {};

  for (const path of paths) {
    const keys = path.split('.');
    let source = messages;
    let target = picked;

    for (const [index, key] of keys.entries()) {
      const value = source[key];
      if (value === undefined) break;

      if (index === keys.length - 1 || typeof value === 'string') {
        target[key] = value;
        break;
      }

      const existing = target[key];
      const next = typeof existing === 'object' ? existing : {};
      target[key] = next;
      target = next;
      source = value;
    }
  }

  return picked;
}
