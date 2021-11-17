const nodemailer = require('nodemailer');

const sendEmail = async (
  to,
  html,
  subject = 'Recibimos la orden de compra a TecnoBox'
) => {
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
      from: '"TecnoBox" <no-replay@tecnobox.com>',
      to,
      bbc: process.env.ADMIN_EMAIL,
      subject,
      html,
      attachments: [
        {
          filename: 'logo.png',
          path: 'assets/logo.png',
          cid: 'logo@nodemailer.com',
        },
      ],
    });
    console.log(info);
    return info.messageId;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = { sendEmail };
