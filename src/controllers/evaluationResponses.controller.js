const EvaluationResponses = require("../models/EvaluationResponse");
const mongoose = require("mongoose");

// const categories = {
//   skillsGrooming: { start: 5, end: 13 },
//   skillsDressing: { start: 14, end: 18 },
//   skillsFeeding: { start: 19, end: 21 },
//   habitsFeeding: { start: 22, end: 36 },
//   habitsSleeping: { start: 37, end: 40 },
//   responsabilities: { start: 41, end: 48 },
//   aditional: { start: 49, end: 51 },
// };

const saveEvaluationResponses = async (req, res) => {
  const { userId, evaluationId, responses, evaluationtoken } = req.body;

  if (!userId || !evaluationId || !responses ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!evaluationtoken) {
    return res.status(400).json({ message: "Evaluation token is required" });
  }

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(evaluationId)
    ) {
      return res
        .status(400)
        .json({ error: "ID de usuario o evaluación no válido" });
    }

    // Crear el documento de respuestas de evaluación
    const evaluationResponses = new EvaluationResponses({
      userId,
      evaluationId,
      responses,
      evaluationtoken,
    });

    // Guardar en la base de datos
    await evaluationResponses.save();
    return res
      .status(201)
      .json({
        message: "Response saved successfully",
        evaluationResponses,
      });
  } catch (error) {
    console.error("Error al guardar las respuestas de evaluación:", error);
    return res
      .status(500)
      .json({
        error: "Error creating evaluation",
      });
  }
};

const getEvaluationResponses = async (req, res) => {
  try {
    const evaluationResponses = await EvaluationResponses.find();
    res.json(evaluationResponses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { saveEvaluationResponses, getEvaluationResponses };
