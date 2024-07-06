// controllers/evaluationTokenController.js
const evaluationTokenService = require('../services/useEvaluationToken');

const createTokenController = async (req, res) => {
  const { email, userId } = req.body;

  try {
    const token = await evaluationTokenService.createEvaluationToken(email, userId);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const useTokenController = async (req, res) => {
  const { token } = req.body;

  try {
    const message = await evaluationTokenService.useEvaluationToken(token);
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllTokensController = async (req, res) => {
  try {
    const tokens = await evaluationTokenService.getAllEvaluationTokens();
    res.status(200).send({ tokens });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteTokenController = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await evaluationTokenService.deleteEvaluationToken(id);
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createTokenController,
  useTokenController,
  getAllTokensController,
  deleteTokenController,
};

