// const sendEmail = async (req, res) => {
//   try {
//   } catch (e) {
//     console.error(e);
//     res.sendStatus(500);
//   }
// };

('use strict');
const nodemailer = require('nodemailer');

const sendEmail = async ({
  to = process.env.USER_EMAIL,
  subject = 'Prueba de mail',
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

    return info.messageId;

    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = { sendEmail };
