// const EvaluationToken = require("../models/EvaluationToken");
const evaluationTokenService = require("../services/sendEmail");

const createToken = async (req, res) => {
    const { email, userId, id } = req.body; 
    if (!email || !userId || !id) {
      return res.status(400).json({ error: 'Missing required fields: email, userId, or id' });
    }
     try {
    // 🔍 Validar si la encuesta existe con ese ID
    const evaluation = await Evaluation.findById(id);
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    // Crear el token
    const uuid = require('uuid');
    const newToken = new EvaluationToken({
      email,
      userId,
      evaluationToken: uuid.v4(),
    });

    await newToken.save();

    // Enviar el correo
    await sendTokenEmail(email, newToken.evaluationToken);

    res.status(201).json({ token: newToken });
  } catch (error) {
    console.error('Error creating token:', error);
    res.status(500).json({ error: 'Error creating token: ' + error.message });
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
