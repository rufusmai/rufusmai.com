'use server';

import { checkBotId } from 'botid/server';

import { profile } from '@/content/profile';
import { sendMail } from '@/lib/mail';

import {
  type ContactField,
  contactSchema,
  type ContactValues,
  type ValidationKey,
} from './schema';

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'invalid' | 'error' | 'bot';
      errors?: Partial<Record<ContactField, ValidationKey>>;
      values: ContactValues;
    };

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  const field = (name: string) => {
    const value = formData.get(name);
    return typeof value === 'string' ? value : '';
  };
  const values: ContactValues = {
    name: field('name'),
    email: field('email'),
    company: field('company'),
    message: field('message'),
  };

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (field('website') !== '') {
    return { status: 'success' };
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    return { status: 'bot', values };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<ContactField, ValidationKey>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      errors[field] ??= issue.message as ValidationKey;
    }
    return { status: 'invalid', errors, values };
  }

  const { name, email, company, message } = parsed.data;
  try {
    await sendMail({
      to: process.env.RECEIVER_MAIL_ADDRESS ?? profile.email,
      replyTo: `${name.replace(/[<>"]/g, '')} <${email}>`,
      subject: `Neue Kontaktanfrage über rufusmai.com: ${name}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        company ? `Unternehmen: ${company}` : null,
        '',
        message,
      ]
        .filter((line) => line !== null)
        .join('\n'),
    });
  } catch (error) {
    console.error('Contact form: sending failed', error);
    return { status: 'error', values };
  }

  return { status: 'success' };
}
