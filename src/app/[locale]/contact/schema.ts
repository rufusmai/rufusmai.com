import { z } from 'zod';

import type messages from '../../../../locales/en.json';

export type ValidationKey = keyof (typeof messages)['contact']['validation'];

const error = (key: ValidationKey) => ({ error: key });

/** Error messages are translation keys from `contact.validation`. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, error('nameRequired'))
    .max(120, error('nameTooLong')),
  email: z.email(error('emailInvalid')).trim().max(254, error('emailInvalid')),
  company: z.string().trim().max(120, error('companyTooLong')),
  message: z
    .string()
    .trim()
    .min(10, error('messageTooShort'))
    .max(5000, error('messageTooLong')),
});

export type ContactField = keyof z.infer<typeof contactSchema>;
export type ContactValues = Record<ContactField, string>;
