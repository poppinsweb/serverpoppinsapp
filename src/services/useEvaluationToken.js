const sendEmail = require("../services/sendEmail");

const createToken = async (req, res) => {
  try {
    const { email, userId } = req.body;
    const token = await sendEmail.createEvaluationToken(email, userId);

    return res.status(201).json({
      message: "Token created and email sent successfully.",
      token: token.evaluationToken
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const useToken = async (req, res) => {
  const { token } = req.params;

  try {
    const message = await sendEmail.useEvaluationToken(token);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllTokens = async (req, res) => {
  try {
    const tokens = await sendEmail.getAllEvaluationTokens();
    return res.status(200).json({ tokens });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteToken = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await sendEmail.deleteEvaluationToken(id);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createToken,
  useToken,
  getAllTokens,
  deleteToken,
};
