import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse } from 'axios'

const qs = require('qs')

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

  const mail = await sendMail(body.name, body.email, body.message)
  if (mail.status !== 200) {
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

function sendMail (name: string, email: string, msg: string): Promise<AxiosResponse> {
  return axios.post('https://api.mailgun.net/v3/sandbox03a7b9ad9fa14a79bacee564d894d936.mailgun.org/messages', qs.stringify({
    from: 'Homepage API <homepage@rufusmaiwald.de>',
    'h:Reply-To': `${name} <${email}>`,
    to: process.env.RECEIVER_MAIL_ADDRESS,
    subject: 'Neue Kontaktanfrage über rufusmai.com',
    text: `
E-Mail von ${name} (${email})

Nachricht:
${msg}
        `
  }), {
    auth: { username: 'api', password: process.env.MAILGUN_SECRET },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
