const mongoose = require("mongoose");
const evaluationTokenService = require("../services/sendEmail");

// Crea un token y envía correo. Acepta body plano o envuelto en { data: {...} }
const createToken = async (req, res) => {
  // Permitir tanto body plano como envuelto en `data`
  const payload = req.body && req.body.data ? req.body.data : req.body;

  // Soportar alias y distintas formas
  const email = payload?.email;
  const userId = payload?.userId || payload?.userID; // alias
  // id de evaluación opcional por ahora (no requerido para crear token)
  const evaluationId = payload?.id || payload?.evaluationId || (Array.isArray(payload?.productId) ? payload.productId[0] : payload?.productId);

  if (!email || !userId) {
    return res.status(400).json({ error: "Missing required fields: email and userId/userID" });
  }

  // Validar formato de ObjectId para userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "userId must be a valid Mongo ObjectId (24 hex chars)" });
  }

  try {
    // Si en el futuro es necesario validar evaluación, se puede reactivar esta sección
    // if (evaluationId) {
    //   const Evaluation = require("../models/Evaluation");
    //   if (!mongoose.Types.ObjectId.isValid(evaluationId)) {
    //     return res.status(400).json({ error: "evaluation id must be a valid ObjectId" });
    //   }
    //   const evaluation = await Evaluation.findById(evaluationId);
    //   if (!evaluation) {
    //     return res.status(404).json({ error: "Evaluation not found" });
    //   }
    // }

    // Delegar creación y envío de correo al servicio
    const token = await evaluationTokenService.createEvaluationToken(email, userId);
    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error creating token:", error);
    // Normalizar errores de casteo
    const message = /Cast to ObjectId failed/i.test(error.message)
      ? "Invalid userId format (must be a Mongo ObjectId)"
      : error.message;
    return res.status(500).json({ error: "Error creating token: " + message });
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
