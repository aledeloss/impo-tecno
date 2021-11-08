const nodemailer = require('nodemailer');

const sendEmail = async ({
  to = process.env.USER_EMAIL,
  subject = 'Gracias por contactarte con IMPORTADORA',
  html,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports TODO: va a cambiar en producción
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
      tls: {
        rejectUnauthorized: false, // para que no rechace gmail
      },
    });

    const info = await transporter.sendMail({
      from: '"IMPORTADOR" <no-replay@importadora.com>',
      to,
      subject,
      html,
    });
    console.log(info);
    return info.messageId;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = { sendEmail };
