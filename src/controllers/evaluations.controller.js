const Evaluations = require("../models/Evaluations");

// Obtiene la encuesta completa desde la db
const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluations.find();
    res.json(evaluations);
    // console.log('Evaluation data retrieved:', evaluations);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEvaluations };
