// utils/mailer.js
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTokenEmail(to, token) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM, // debe estar verificado en SendGrid
    subject: "Acceso a tu encuesta",
    html: `
      <h2>Hola 👋</h2>
      <p>Gracias por tu compra. Aquí está tu token de acceso:</p>
      <p><b>${token}</b></p>
      <p>Puedes acceder a la encuesta aquí: 
        <a href="https://encuestapoppins.web.app/">Ir a la encuesta</a>
      </p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Correo enviado a:", to);
    return { success: true, message: "Correo enviado con éxito" };
  } catch (error) {
    console.error("Error al enviar el correo:", error.response?.body || error);
    return { success: false, error };
  }
}

module.exports = { sendTokenEmail };
