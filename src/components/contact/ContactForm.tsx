'use client';

import {
  CircleCheckIcon,
  LoaderCircleIcon,
  RotateCcwIcon,
  SendIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useActionState, useState } from 'react';

import {
  type ContactState,
  sendContactMessage,
} from '@/app/[locale]/contact/actions';
import type { ContactField } from '@/app/[locale]/contact/schema';
import { Button } from '@/components/ui/button';
import { Input, Label, Textarea } from '@/components/ui/input';
import { profile } from '@/content/profile';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const INITIAL_STATE: ContactState = { status: 'idle' };

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations('contact.form');
  const tValidation = useTranslations('contact.validation');
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    INITIAL_STATE
  );
  // The success state the visitor closed to write another message
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const [formKey, setFormKey] = useState(0);

  const failed =
    state.status === 'invalid' ||
    state.status === 'error' ||
    state.status === 'bot';
  const values = failed ? state.values : undefined;
  const errors = state.status === 'invalid' ? state.errors : undefined;
  const sent = state.status === 'success' && state !== dismissed;

  const fieldError = (field: ContactField) => {
    const key = errors?.[field];
    return key ? tValidation(key) : undefined;
  };

  return (
    <div
      className={cn(
        'relative rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex min-h-96 flex-col items-center justify-center gap-4 text-center"
          >
            <motion.span
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <CircleCheckIcon className="size-8" />
            </motion.span>
            <h2 className="text-h3 font-bold">{t('successTitle')}</h2>
            <p className="max-w-sm text-muted-foreground">{t('successBody')}</p>
            <Button
              variant="outline"
              onClick={() => {
                setDismissed(state);
                // Remounting the form clears its fields
                setFormKey((key) => key + 1);
              }}
            >
              <RotateCcwIcon />
              {t('again')}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key={`form-${formKey}`}
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-h3 font-bold">{t('title')}</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={t('name')} error={fieldError('name')}>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  defaultValue={values?.name}
                  aria-invalid={Boolean(fieldError('name'))}
                  aria-describedby={
                    fieldError('name') ? 'name-error' : undefined
                  }
                />
              </Field>
              <Field id="email" label={t('email')} error={fieldError('email')}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  defaultValue={values?.email}
                  aria-invalid={Boolean(fieldError('email'))}
                  aria-describedby={
                    fieldError('email') ? 'email-error' : undefined
                  }
                />
              </Field>
            </div>

            <Field
              id="company"
              label={
                <>
                  {t('company')}{' '}
                  <span className="font-normal text-muted-foreground">
                    ({t('optional')})
                  </span>
                </>
              }
              error={fieldError('company')}
            >
              <Input
                id="company"
                name="company"
                autoComplete="organization"
                maxLength={120}
                defaultValue={values?.company}
                aria-invalid={Boolean(fieldError('company'))}
              />
            </Field>

            <Field
              id="message"
              label={t('message')}
              error={fieldError('message')}
            >
              <Textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                placeholder={t('messagePlaceholder')}
                defaultValue={values?.message}
                aria-invalid={Boolean(fieldError('message'))}
                aria-describedby={
                  fieldError('message') ? 'message-error' : undefined
                }
              />
            </Field>

            {/* Honeypot for bots, hidden from people and assistive tech */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] size-px overflow-hidden"
            >
              <label htmlFor="website">{t('honeypot')}</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {t.rich('privacy', {
                link: (chunks) => (
                  <Link
                    href="/privacy"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>

            {(state.status === 'error' || state.status === 'bot') && (
              <p
                role="alert"
                className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {t(state.status === 'bot' ? 'botError' : 'error', {
                  email: profile.email,
                })}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="w-fit"
            >
              {pending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <SendIcon />
              )}
              {pending ? t('sending') : t('submit')}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
