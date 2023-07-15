import nodeMailer from "nodemailer";

const adminEmail = process.env.MAIL_USER;
const adminPassword = process.env.MAIL_PASSWORD;
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;

const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // use SSL - TLS
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  const mailOptions = {
    from: adminEmail,
    to,
    subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions); // This defalt return a promise
};

module.exports = sendMail;
