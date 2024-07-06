// services/evaluationTokenService.js
const EvaluationToken = require('../models/EvaluationToken');

const createEvaluationToken = async (email, userId) => {
  try {
    const evaluationToken = new EvaluationToken({ email, userId });
    await evaluationToken.save();
    return evaluationToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

const useEvaluationToken = async (token) => {
  try {
    const evaluationToken = await EvaluationToken.findOne({ evaluationToken: token });

    if (!evaluationToken) {
      throw new Error('Token no encontrado.');
    }

    if (evaluationToken.usageCount >= 2) {
      throw new Error('Token ha sido usado el máximo de veces permitido.');
    }

    // Incrementar el contador de uso
    evaluationToken.usageCount += 1;
    await evaluationToken.save();

    return 'Token utilizado con éxito.';
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllEvaluationTokens = async () => {
  try {
    const tokens = await EvaluationToken.find();
    return tokens;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEvaluationToken = async (id) => {
  try {
    await EvaluationToken.findByIdAndDelete(id);
    return 'Token eliminado';
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createEvaluationToken,
  useEvaluationToken,
  getAllEvaluationTokens,
  deleteEvaluationToken,
};

