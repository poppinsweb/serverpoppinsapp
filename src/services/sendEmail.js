const { sendTokenEmail } = require("../utils/mailer");
const EvaluationToken = require("../models/EvaluationToken");
const crypto = require("crypto");

async function createEvaluationToken(email, userId) {
  // Generar token único
  const token = crypto.randomBytes(16).toString("hex");

  // Guardar en DB
  const newToken = new EvaluationToken({
    evaluationToken: token,
    userId,
    email,
  });
  await newToken.save();

  // Enviar correo
  const mailResult = await sendTokenEmail(email, token);

  if (!mailResult.success) {
    throw new Error("Error al enviar correo: " + mailResult.error);
  }

  return token;
}

async function useEvaluationToken(token) {
  const existingToken = await EvaluationToken.findOne({ evaluationToken: token });
  if (!existingToken) throw new Error("Token inválido o no encontrado");

  await EvaluationToken.deleteOne({ _id: existingToken._id });
  return "Token válido y eliminado";
}

async function getAllEvaluationTokens() {
  return EvaluationToken.find();
}

async function deleteEvaluationToken(id) {
  await EvaluationToken.findByIdAndDelete(id);
  return "Token eliminado";
}

module.exports = {
  createEvaluationToken,
  useEvaluationToken,
  getAllEvaluationTokens,
  deleteEvaluationToken,
};
