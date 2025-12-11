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
    usageCount: 0,
    isUsed: false,
  });

  await newToken.save();
  await emailService.sendTokenEmail(email, tokenString); // 👈 delegar envío

  return newToken;
}

// Usar token para diligenciar encuesta
async function useEvaluationToken(tokenString, evaluationId, responses) {
  const token = await EvaluationToken.findOne({ evaluationToken: tokenString });
  if (!token) throw new Error("Token not found");
  if (token.usageCount >= 2) throw new Error("Token already used twice");

  let evaluation = await CompleteEvaluation.findOne({ evaluationtoken: tokenString, evaluationId });

  if (!evaluation) {
    // Primera aplicación
    evaluation = new CompleteEvaluation({
      evaluationtoken: tokenString,
      evaluationId,
      responses,
      firstAppliedAt: new Date(),
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
      throw new Error("Second evaluation must be between 1 and 7 months after the first.");
    }

    evaluation.responses2 = responses;
    evaluation.secondAppliedAt = now;
    await evaluation.save();
  }

  // 👇 factorizar actualización de token
  token.usageCount += 1;
  token.isUsed = true;
  await token.save();

  return { message: token.usageCount === 1 ? "First evaluation saved" : "Second evaluation saved", evaluation };
}

// Obtener todos los tokens
async function getAllEvaluationTokens() {
  const tokens = await EvaluationToken.find().lean();
  return tokens; // 👈 ya tienen isUsed en DB, no recalcular
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
      evaluationtoken: token.evaluationToken,
    }).lean();

    result.push({
      ...token,
      firstAppliedAt: evaluation?.firstAppliedAt || null,
      secondAppliedAt: evaluation?.secondAppliedAt || null,
      completed: token.usageCount >= 2, // 👈 ya diligenció ambas encuestas
      partiallyCompleted: token.usageCount === 1, // 👈 solo primera encuesta
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