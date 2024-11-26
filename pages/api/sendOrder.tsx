import { promises } from 'dns';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as Sentry from "@sentry/nextjs";

type FormData = {
  domainName: any;
  email: any;
  fullName: any;
  companyName?: any;
  emailTo?: any;
  domainNames: string[];
  phone?: any;
  sslOption?: string; // Add sslOption to the FormData type
};

export default async function sendOrderMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      fullName,
      email,
      phone,
      domainName,
      domainNames,
      companyName,
      sslOption, // Get the selected SSL option from the request body
    }: FormData = req.body;

    const emailTo = process.env.MAIL_SSL_USER;

    const transporter = nodemailer.createTransport({
      host: process.env.MAILGUN_SERVER,
      port: parseInt(process.env.MAILGUN_PORT || '587'),
      secure:
        process.env.MAILGUN_SECURE === 'false'
          ? false
          : process.env.MAILGUN_SECURE === 'true'
            ? true
            : false, // use STARTTLS
      auth: {
        user: process.env.MAIL_SMTP_SSL_USER,
        pass: process.env.MAIL_SMTP_SSL_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_SMTP_SSL_FROM,
        to: emailTo,
        replyTo: email, // Add the reply-to header with the customer's email address
        subject: `Urgent - SSL Quote Request`,
        text: `
        Name: ${fullName},
        Company: ${companyName},
        Email Address: ${email},
        Telephone: ${phone},

        Product: ${sslOption ? sslOption : 'Basic Multi-domain'},
        Domain(s):${domainName ? domainName : ''} ${domainNames ? domainNames.join(', ') : ''
          }.`, // Include SSL option in the email text
      });

      console.log(`Message sent: ${info.messageId}`);
      return res.status(200).end();
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).end();
    }
  } else {
    return res.status(405).end();
  }
}
