// const EvaluationToken = require("../models/EvaluationToken");
const evaluationTokenService = require("../services/useEvaluationToken");

const createToken = async (req, res) => {
  try {
    const { email, userId } = req.body;
    const token = await evaluationTokenService.createEvaluationToken(email, userId);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const useToken = async (req, res) => {
  const { token } = req.params;

  try {
    const message = await evaluationTokenService.useEvaluationToken(token);
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllTokens = async (req, res) => {
  try {
    const tokens = await evaluationTokenService.getAllEvaluationTokens();
    res.status(200).send({ tokens });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteToken = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await evaluationTokenService.deleteEvaluationToken(id);
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// const secondEvaluationToken = async (req, res) => {
//   const { token } = req.params;
//   try {
    
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

module.exports = {
  createToken,
  useToken,
  getAllTokens,
  deleteToken,
  // secondEvaluationToken,
};
