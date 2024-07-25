const CompleteEvaluation = require('../models/CompleteEvaluation');
const EvaluationToken = require('../models/EvaluationToken');

const saveCompleteEvaluation = async (evaluationtoken, evaluationId, responses) => {
  try {
    const evaluationToken = await EvaluationToken.findOne({ evaluationToken: evaluationtoken });

    if (!evaluationToken) {
      throw new Error('Token not found');
    }

    if (evaluationToken.usageCount >= 2) {
      throw new Error('Token has been used the maximum number of times allowed');
    }

    const completeEvaluation = new CompleteEvaluation({
      evaluationtoken,
      evaluationId,
      responses,
    });

    await completeEvaluation.save();

    evaluationToken.usageCount += 1;
    await evaluationToken.save();

    return completeEvaluation;
  } catch (error) {
    console.error('Error saving complete evaluation:', error);
    throw error;
  }
};

// **********************************************************************************
// Función para guardar o actualizar respuestas parciales
const savePartialResponse = async (
  evaluationtoken,
  childId,
  userId,
  questionId,
  optionId,
  answer
) => {
  try {
    // Buscar si ya existe una respuesta parcial para este usuario y pregunta
    let response = await EvaluationResponses.findOne({
      evaluationtoken,
      childId,
      userId,
      questionId,
    });

    if (response) {
      // Si la respuesta ya existe, actualizarla
      response.optionId = optionId;
      response.answer = answer;
      response.updatedAt = Date.now();

      await response.save();
    } else {
      // Si no existe, crear una nueva respuesta
      response = new EvaluationResponses({
        evaluationtoken,
        childId,
        userId,
        questionId,
        optionId,
        answer,
      });

      await response.save();
    }

    return response;
  } catch (error) {
    console.error("Error saving evaluation response:", error);
    throw error;
  }
};

module.exports = { saveCompleteEvaluation, savePartialResponse };
