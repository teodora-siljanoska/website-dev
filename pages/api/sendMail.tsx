import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as Sentry from "@sentry/nextjs";

type FormData = {
  name: any;
  email: any;
  message: string;
  phone?: string;
  service?: string;
  company?: string;
};

export default async function sendFormMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailTo = process.env.MAIL_CONTACT_US;

  if (req.method === 'POST') {
    const { name, email, message, phone, company, service }: FormData =
      req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.MAILGUN_SERVER,
      port: parseInt(process.env.MAILGUN_PORT || '587'),
      secure:
        process.env.MAILGUN_SECURE === 'false'
          ? false
          : process.env.MAILGUN_SECURE === 'true'
            ? true
            : false,
      auth: {
        user: `${process.env.MAIL_SMTP_CONTACT_USER}`,
        pass: `${process.env.MAIL_SMTP_CONTACT_PASS}`,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_SMTP_CONTACT_FROM,
        to: emailTo,
        replyTo: email,
        subject: `Pre-Sales Enquiry.`,
        text: `
        Name: ${name},
        Email: ${email},
        Company Name: ${company},
        Service: ${service},
        Details: ${message},`,
      });
      return res.status(200).end();
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).end();
    }
  } else {
    return res.status(405).end();
  }
}
