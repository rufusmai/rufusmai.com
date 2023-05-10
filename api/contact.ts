import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse } from 'axios'
import { SendEmailCommand, SendEmailCommandOutput, SESClient } from '@aws-sdk/client-ses'

const qs = require('qs')
const sesClient = new SESClient({ region: process.env.AWS_SES_REGION })

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const {
    body,
    method
  } = req

  if (method !== 'POST') {
    res
      .status(405)
      .json({
        msg: 'Method not allowed!'
      })
    return
  }

  if (!(body && body.name && body.token && body.email && body.message)) {
    res
      .status(400)
      .json({
        msg: 'Missing parameter!'
      })
    return
  }

  const status = await verifyCaptcha(body.token, req.connection.remoteAddress)
  if (status.status !== 200) {
    res
      .status(500)
      .json({
        msg: 'Could not verify captcha!'
      })
    return
  }
  if (!status.data.success) {
    res
      .status(403)
      .json({
        msg: 'Captcha error!'
      })
    return
  }

  try {
    await sendMail(body.name, body.email, body.message)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({
        msg: 'The message could not be sent!'
      })
    return
  }

  res
    .status(200)
    .json({
      msg: 'Message sent!'
    })
}

function verifyCaptcha (token: string, remoteAddress: string): Promise<AxiosResponse> {
  return axios.post('https://www.google.com/recaptcha/api/siteverify', qs.stringify({
    secret: process.env.RECAPTCHA_SECRET,
    response: token,
    remoteip: remoteAddress
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

function sendMail (name: string, email: string, msg: string): Promise<SendEmailCommandOutput> {
  return sesClient.send(new SendEmailCommand({
    Source: 'Homepage API <homepage@rufusmai.com>',
    Destination: {
      ToAddresses: [process.env.RECEIVER_MAIL_ADDRESS]
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
