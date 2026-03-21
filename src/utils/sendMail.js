import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

export const sendEmail = async ({ from, to, subject, html }) => {
  return transporter.sendMail({
    from,
    to,
    subject,
    html
  });
};
