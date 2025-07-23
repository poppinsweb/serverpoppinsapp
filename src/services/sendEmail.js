// utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendTokenByEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,       // ejemplo: "tucorreo@gmail.com"
      pass: process.env.EMAIL_PASSWORD    // app password, no tu contraseña real
    },
  });

  const link = `https://encuesta.tudominio.com?token=${token}`;

  const mailOptions = {
    from: `"Poppins App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Tu acceso a la encuesta",
    html: `
      <h2>¡Gracias por tu compra!</h2>
      <p>Aquí tienes tu enlace de acceso a la encuesta:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Este enlace es válido para responder hasta 2 veces.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendTokenByEmail };
