import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import type { SendEmailCommandOutput } from '@aws-sdk/client-ses'

const sesClient = new SESClient({ region: process.env.AWS_SES_REGION })

interface ContactBody {
  name?: string
  token?: string
  email?: string
  message?: string
}

interface CaptchaResult {
  success: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  if (!(body && body.name && body.token && body.email && body.message)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameter!', data: { msg: 'Missing parameter!' } })
  }

  const remoteAddress = getRequestIP(event, { xForwardedFor: true })

  let captcha: CaptchaResult
  try {
    captcha = await verifyCaptcha(body.token, remoteAddress)
  } catch (e) {
    console.error(e)
    throw createError({ statusCode: 500, statusMessage: 'Could not verify captcha!', data: { msg: 'Could not verify captcha!' } })
  }

  if (!captcha.success) {
    throw createError({ statusCode: 403, statusMessage: 'Captcha error!', data: { msg: 'Captcha error!' } })
  }

  try {
    await sendMail(body.name, body.email, body.message)
  } catch (e) {
    console.error(e)
    throw createError({ statusCode: 500, statusMessage: 'The message could not be sent!', data: { msg: 'The message could not be sent!' } })
  }

  return { msg: 'Message sent!' }
})

function verifyCaptcha (token: string, remoteAddress?: string): Promise<CaptchaResult> {
  return $fetch<CaptchaResult>('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET ?? '',
      response: token,
      remoteip: remoteAddress ?? ''
    }).toString()
  })
}

function sendMail (name: string, email: string, msg: string): Promise<SendEmailCommandOutput> {
  return sesClient.send(new SendEmailCommand({
    Source: 'Homepage API <homepage@rufusmai.com>',
    Destination: {
      ToAddresses: [process.env.RECEIVER_MAIL_ADDRESS as string]
    },
    ReplyToAddresses: [`${name} <${email}>`],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `
E-Mail von ${name} (${email})

Nachricht:
${msg}
        `
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Neue Kontaktanfrage über rufusmai.com'
      }
    }
  }))
}
