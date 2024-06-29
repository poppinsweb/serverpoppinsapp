// Supongamos que tienes una función para guardar o actualizar respuestas parciales
const savePartialResponse = async(evaluationtoken, childId, userId, questionId, optionId, answer) => {
  try {
      // Buscar si ya existe una respuesta parcial para este usuario y pregunta
      let response = await EvaluationResponses.findOne({
          evaluationtoken,
          childId,
          userId,
          questionId
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
              answer
          });

          await response.save();
      }

      return response;
  } catch (error) {
      console.error('Error saving evaluation response:', error);
      throw error;
  }
}

module.exports = { savePartialResponse };
