import 'server-only';

import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';

const MAIL_FROM = 'Homepage API <homepage@rufusmai.com>';

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const client =
  AWS_REGION && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY
    ? new SESv2Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      })
    : null;

type SendMailInput = {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
};

export async function sendMail({ to, replyTo, subject, text }: SendMailInput) {
  if (!client) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Mail is not configured: AWS credentials are missing.');
    }
    // Local development without AWS credentials
    console.info(
      `[mail] to ${to} (reply to ${replyTo})\n${subject}\n\n${text}`
    );
    return;
  }

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: MAIL_FROM,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: { Text: { Data: text, Charset: 'UTF-8' } },
        },
      },
    })
  );
}
