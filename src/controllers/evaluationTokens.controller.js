const mongoose = require("mongoose");
const evaluationTokenService = require("../services/sendEmail");
// const EvaluationToken = require("../models/EvaluationToken"); // Solo si lo necesitas

// ✅ Crear token y enviar correo
const createToken = async (req, res) => {
  try {
    // Permitir tanto body plano como envuelto en { data: {...} }
    const payload = req.body && req.body.data ? req.body.data : req.body;

    const email = payload?.email;
    const userId = payload?.userId || payload?.userID;
    const evaluationId =
      payload?.id ||
      payload?.evaluationId ||
      (Array.isArray(payload?.productId)
        ? payload.productId[0]
        : payload?.productId);

    if (!email || !userId) {
      return res
        .status(400)
        .json({ error: "Missing required fields: email and userId/userID" });
    }

    // Validar que userId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ error: "userId must be a valid Mongo ObjectId (24 hex chars)" });
    }

    // Llamar al servicio encargado de crear y enviar el token
    const token = await evaluationTokenService.createEvaluationToken(
      email,
      userId,
      evaluationId
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error creating token:", error);
    const message = /Cast to ObjectId failed/i.test(error.message)
      ? "Invalid userId format (must be a Mongo ObjectId)"
      : error.message;
    res.status(500).json({ error: "Error creating token: " + message });
  }
};

// ✅ Usar token
const useToken = async (req, res) => {
  const { token } = req.params;
  try {
    const message = await evaluationTokenService.useEvaluationToken(token);
    res.status(200).json({ message });
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
  const { id } = req.params;
  try {
    const message = await evaluationTokenService.deleteEvaluationToken(id);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error deleting token:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createToken,
  useToken,
  getAllTokens,
  deleteToken,
};
