import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse } from 'axios'

const qs = require('qs')

export default async (request: VercelRequest, response: VercelResponse) => {
  const {
    body,
    method
  } = request

  if (method !== 'POST') {
    return response.json({
      msg: 'Method not allowed!'
    }).status(405)
  }

  if (!(body && body.name && body.token && body.email && body.message)) {
    return response.json({
      msg: 'Missing parameter!'
    }).status(400)
  }

  const status = await verifyCaptcha(body.token, request.connection.remoteAddress)
  if (status.status !== 200) {
    return response.json({
      msg: 'Could not verify captcha!'
    }).status(500)
  }
  if (!status.data.success) {
    return response.json({
      msg: 'Captcha error!'
    }).status(403)
  }

  const mail = await sendMail(body.name, body.email, body.message)
  if (mail.status !== 200) {
    return response.json({
      msg: 'The message could not be sent!'
    }).status(500)
  }

  return response.json({
    msg: 'Message sent!'
  }).status(200)
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
