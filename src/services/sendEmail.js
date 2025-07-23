const EvaluationToken = require("../models/EvaluationToken");
const { v4: uuidv4 } = require("uuid");
const { sendTokenByEmail } = require("../utils/mailer"); // Asegúrate de la ruta correcta

/**
 * Crea un token y envía un correo al usuario.
 * @param {String} email
 * @param {String} userId
 * @returns {Object} token creado
 */
const createEvaluationToken = async (email, userId) => {
  try {
    const tokenValue = uuidv4();

    const token = new EvaluationToken({
      email,
      userId,
      evaluationToken: tokenValue,
    });

    await token.save();
    await sendTokenByEmail(email, tokenValue); // Enviando correo con token

    return token;
  } catch (error) {
    throw new Error("Error creating token: " + error.message);
  }
};

/**
 * Usa un token para incrementar su uso hasta un máximo de 2 veces.
 * @param {String} tokenValue
 * @returns {String} mensaje de éxito
 */
const useEvaluationToken = async (tokenValue) => {
  try {
    const evaluationToken = await EvaluationToken.findOne({ evaluationToken: tokenValue });

    if (!evaluationToken) {
      throw new Error("Token not found.");
    }
    if (evaluationToken.usageCount >= 2) {
      throw new Error("Token has been used the maximum number of times allowed.");
    }

    evaluationToken.usageCount += 1;
    await evaluationToken.save();

    return "Token usage updated successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Obtiene todos los tokens guardados en la base de datos.
 * @returns {Array} lista de tokens
 */
const getAllEvaluationTokens = async () => {
  try {
    const tokens = await EvaluationToken.find({});
    return tokens;
  } catch (error) {
    throw new Error("Error fetching tokens: " + error.message);
  }
};

/**
 * Elimina un token por su ID.
 * @param {String} id
 * @returns {String} mensaje de éxito
 */
const deleteEvaluationToken = async (id) => {
  try {
    await EvaluationToken.findByIdAndDelete(id);
    return "Token deleted successfully.";
  } catch (error) {
    throw new Error("Error deleting token: " + error.message);
  }
};

module.exports = {
  createEvaluationToken,
  useEvaluationToken,
  getAllEvaluationTokens,
  deleteEvaluationToken,
};
