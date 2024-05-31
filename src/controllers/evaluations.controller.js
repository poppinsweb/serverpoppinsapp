const Evaluations = require("../models/Evaluations");

// Obtiene la encuesta completa desde la db
const getEvaluations = async (req, res) => {
  try {
    const evaluation = await Evaluations.find();
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEvaluations };
