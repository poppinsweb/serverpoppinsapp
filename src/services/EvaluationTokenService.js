const EvaluationToken = require("../models/EvaluationToken");
const CompleteEvaluation = require("../models/CompleteEvaluation");
const emailService = require("./emailService");
const crypto = require("crypto");

// Crear token y enviar correo
async function createEvaluationToken(email, userId, evaluationId) {
  const tokenString = crypto.randomBytes(16).toString("hex");

  const newToken = new EvaluationToken({
    evaluationToken: tokenString,
    userId,
    email,
    usageCount: 0
  });

  await newToken.save();

  // Si falla el correo, el token igual queda creado
  try {
    await emailService.sendTokenEmail(email, tokenString);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }

  return newToken;
}

// Usar token para diligenciar encuesta
async function useEvaluationToken(tokenString, evaluationId, responses) {
  const token = await EvaluationToken.findOne({ evaluationToken: tokenString });
  if (!token) throw new Error("Token not found");
  if (token.usageCount >= 2) throw new Error("Token already used twice");

  let evaluation = await CompleteEvaluation.findOne({
    evaluationtoken: tokenString,
    evaluationId
  });

  if (!evaluation) {
    // Primera aplicación
    evaluation = new CompleteEvaluation({
      evaluationtoken: tokenString,
      evaluationId,
      responses,
      firstAppliedAt: new Date()
    });
    await evaluation.save();
  } else if (token.usageCount === 1) {
    // Segunda aplicación → validar ventana temporal
    const firstDate = evaluation.firstAppliedAt;
    const now = new Date();

    const diffMonths =
      (now.getFullYear() - firstDate.getFullYear()) * 12 +
      (now.getMonth() - firstDate.getMonth());

    if (diffMonths < 1 || diffMonths > 7) {
      throw new Error(
        "Second evaluation must be between 1 and 7 months after the first."
      );
    }

    evaluation.responses2 = responses;
    evaluation.secondAppliedAt = now;
    await evaluation.save();
  }

  // ✅ Actualizar solo usageCount (isUsed ya no existe)
  token.usageCount += 1;
  await token.save();

  return {
    message:
      token.usageCount === 1
        ? "First evaluation saved"
        : "Second evaluation saved",
    evaluation
  };
}

// Obtener todos los tokens
async function getAllEvaluationTokens() {
  const tokens = await EvaluationToken.find().lean();
  return tokens;
}

// Eliminar token
async function deleteEvaluationToken(id) {
  await EvaluationToken.findByIdAndDelete(id);
  return { message: "Token deleted" };
}

async function getTokensWithEvaluations() {
  const tokens = await EvaluationToken.find().lean();

  const result = [];
  for (const token of tokens) {
    const evaluation = await CompleteEvaluation.findOne({
      evaluationtoken: token.evaluationToken
    }).lean();

    result.push({
      ...token,
      firstAppliedAt: evaluation?.firstAppliedAt || null,
      secondAppliedAt: evaluation?.secondAppliedAt || null,
      completed: token.usageCount >= 2,
      partiallyCompleted: token.usageCount === 1
    });
  }

  return result;
}

module.exports = {
  createEvaluationToken,
  useEvaluationToken,
  getAllEvaluationTokens,
  deleteEvaluationToken,
  getTokensWithEvaluations
};