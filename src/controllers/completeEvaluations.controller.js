// CONTROLADOR QUE CONTIENE EL CRUD DE LAS RESPUESTAS DE LA ENCUESTA
const { saveCompleteEvaluation, fetchAllCompleteEvaluations } = require("../services/evaluationService");
const CompleteEvaluation = require("../models/CompleteEvaluation");

// Crear una nueva CompleteEvaluation (primera o segunda aplicación)
const createCompleteEvaluation = async (req, res) => {
  try {
    const { evaluationtoken, evaluationId, responses } = req.body;

    const result = await saveCompleteEvaluation(evaluationtoken, evaluationId, responses);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todas las CompleteEvaluations con estado
const getCompleteEvaluations = async (req, res) => {
  try {
    const completeEvaluations = await fetchAllCompleteEvaluations();

    // enriquecer con estado
    const enriched = completeEvaluations.map(ev => ({
      ...ev,
      completed: !!ev.secondAppliedAt, // ya diligenció ambas
      partiallyCompleted: !!ev.firstAppliedAt && !ev.secondAppliedAt, // solo primera
    }));

    res.status(200).json(enriched);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una CompleteEvaluation por ID
const getCompleteEvaluationById = async (req, res) => {
  try {
    const completeEvaluation = await CompleteEvaluation.findById(req.params.id);
    if (!completeEvaluation) {
      return res.status(404).json({ message: "CompleteEvaluation no encontrada" });
    }

    res.status(200).json({
      ...completeEvaluation.toObject(),
      completed: !!completeEvaluation.secondAppliedAt,
      partiallyCompleted: !!completeEvaluation.firstAppliedAt && !completeEvaluation.secondAppliedAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una CompleteEvaluation (ej. corregir respuestas)
const updateCompleteEvaluation = async (req, res) => {
  try {
    const { responses, responses2 } = req.body;

    const updateFields = {};
    if (responses) updateFields.responses = responses;
    if (responses2) updateFields.responses2 = responses2;

    const completeEvaluation = await CompleteEvaluation.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!completeEvaluation) {
      return res.status(404).json({ message: "CompleteEvaluation no encontrada" });
    }

    res.status(200).json(completeEvaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar una CompleteEvaluation
const deleteCompleteEvaluation = async (req, res) => {
  try {
    const completeEvaluation = await CompleteEvaluation.findByIdAndDelete(req.params.id);
    if (!completeEvaluation) {
      return res.status(404).json({ message: "CompleteEvaluation no encontrada" });
    }
    res.status(200).json({ message: "CompleteEvaluation eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompleteEvaluation,
  getCompleteEvaluations,
  getCompleteEvaluationById,
  updateCompleteEvaluation,
  deleteCompleteEvaluation,
};