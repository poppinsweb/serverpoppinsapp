const CompleteEvaluation = require("../models/CompleteEvaluation");
// const ChildResponse = require('../models/ChildResponse');
const Evaluation = require("../models/Evaluation");

// Crear una nueva CompleteEvaluation
const createCompleteEvaluation = async (req, res) => {
  try {
    const { evaluationtoken, evaluationId, responses } = req.body;

    // Verificar que el evaluation exista
    const evaluation = await Evaluation.findById(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation no encontrado" });
    }

    const completeEvaluation = new CompleteEvaluation({
      evaluationtoken,
      evaluationId,
      responses,
    });

    await completeEvaluation.save();
    res.status(201).json(completeEvaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todas las CompleteEvaluations
const getCompleteEvaluations = async (req, res) => {
  try {
    const completeEvaluations = await CompleteEvaluation.find();
    res.status(200).json(completeEvaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una CompleteEvaluation por ID
const getCompleteEvaluationById = async (req, res) => {
  try {
    const completeEvaluation = await CompleteEvaluation.findById(req.params.id);
    if (!completeEvaluation) {
      return res
        .status(404)
        .json({ message: "CompleteEvaluation no encontrada" });
    }
    res.status(200).json(completeEvaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una CompleteEvaluation
const updateCompleteEvaluation = async (req, res) => {
  try {
    const { evaluationtoken, evaluationId, responses } = req.body;

    // Verificar que el evaluation exista
    const evaluation = await Evaluation.findById(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation no encontrado" });
    }

    const completeEvaluation = await CompleteEvaluation.findByIdAndUpdate(
      req.params.id,
      { evaluationtoken, evaluationId, responses },
      { new: true }
    );

    if (!completeEvaluation) {
      return res
        .status(404)
        .json({ message: "CompleteEvaluation no encontrada" });
    }

    res.status(200).json(completeEvaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar una CompleteEvaluation
const deleteCompleteEvaluation = async (req, res) => {
  try {
    const completeEvaluation = await CompleteEvaluation.findByIdAndDelete(
      req.params.id
    );
    if (!completeEvaluation) {
      return res
        .status(404)
        .json({ message: "CompleteEvaluation no encontrada" });
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
