import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

export const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html
  });
};
