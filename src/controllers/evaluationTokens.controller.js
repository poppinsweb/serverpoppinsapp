const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const EvaluationToken = require("../models/evaluationToken.model"); // tu modelo de tokens

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // tu correo Gmail
    pass: process.env.EMAIL_PASS, // App Password generada en Google
  },
});

/**
 * Crear un nuevo token y enviarlo por correo
 */
const createToken = async (req, res) => {
  try {
    console.log("DB_URI:", process.env.DB_URI); 
    const { email, userId, productId } = req.body.data;

    if (!email || !userId) {
      return res.status(400).json({ message: "Email y userId son requeridos" });
    }

    // Crear token único
    const token = uuidv4();

    // Guardar token en DB
    const newToken = new EvaluationToken({
      token,
      email,
      userID,
      productId,
      createdAt: new Date(),
      used: false,
    });

    await newToken.save();

    // Enviar correo
    const mailOptions = {
      from: `"PoppinsApp" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Tu token de acceso",
      text: `Hola 👋, este es tu token de acceso: ${token}`,
      html: `<p>Hola 👋,</p>
             <p>Este es tu token de acceso:</p>
             <h2>${token}</h2>
             <p>⚠️ Recuerda no compartirlo.</p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Token enviado a ${email}: ${token}`);
    res.status(200).json({ message: "Token creado y enviado por correo", token });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al crear token o enviar correo", error });
  }
};

const useToken = async (req, res) => {
  try {
    const { token } = req.params;
    const existing = await EvaluationToken.findOne({ token });

    if (!existing) {
      return res.status(404).json({ message: "Token no encontrado" });
    }
    if (existing.used) {
      return res.status(400).json({ message: "Token ya fue usado" });
    }

    existing.used = true;
    await existing.save();

    res.status(200).json({ message: "Token usado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al usar token", error });
  }
};

const getAllTokens = async (req, res) => {
  try {
    const tokens = await EvaluationToken.find();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tokens", error });
  }
};

const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    await EvaluationToken.findByIdAndDelete(id);
    res.status(200).json({ message: "Token eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar token", error });
  }
};

module.exports = {
  createToken,
  useToken,
  getAllTokens,
  deleteToken,
};
