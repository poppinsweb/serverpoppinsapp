// utils/mailer.js
const nodemailer = require('nodemailer');
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? 'Set' : 'Not set');

const transporter = nodemailer.createTransport({
  service: 'gmail', // o el proveedor que uses
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendTokenEmail(to, token) {
  const mailOptions = {
    from: '"Evaluación Poppins 👶" <' + process.env.EMAIL_USER + '>',
    to,
    subject: 'Acceso a tu encuesta',
    html: `
      <h2>Hola 👋</h2>
      <p>Gracias por tu compra. Aquí está tu token de acceso:</p>
      <p><b>${token}</b></p>
      <p>Puedes acceder a la encuesta aquí: <a href="https://encuestapoppins.web.app">Ir a la encuesta</a></p>
    `
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
    return { success: true, message: "Correo enviado con éxito" };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return { success: false, error };
  }
}

module.exports = { sendTokenEmail };
    