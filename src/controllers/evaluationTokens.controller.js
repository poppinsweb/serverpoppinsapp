const mongoose = require("mongoose");
const evaluationTokenService = require("../services/EvaluationTokenService");

// ✅ Crear token
const createToken = async (req, res) => {
  try {
    const payload = req.body?.data || req.body;
    const { email, userId, evaluationId } = payload;

    if (!email || !userId) {
      return res.status(400).json({ error: "Missing required fields: email and userId" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const token = await evaluationTokenService.createEvaluationToken(email, userId, evaluationId);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Usar token
const useToken = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await evaluationTokenService.useEvaluationToken(token);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error using token:", error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Obtener todos los tokens
const getAllTokens = async (req, res) => {
  try {
    const tokens = await evaluationTokenService.getAllEvaluationTokens();
    res.status(200).json({ tokens });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Eliminar token
const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await evaluationTokenService.deleteEvaluationToken(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting token:", error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Exportar controladores
const getTokensWithEvaluations = async (req, res) => {
  try {
    const tokens = await evaluationTokenService.getTokensWithEvaluations();
    res.status(200).json({ tokens });
  } catch (error) {
    console.error("Error fetching tokens with evaluations:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createToken, useToken, getAllTokens, deleteToken, getTokensWithEvaluations };