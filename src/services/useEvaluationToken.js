const EvaluationToken = require("../models/EvaluationToken");
const { v4: uuidv4 } = require("uuid");

const createEvaluationToken = async (email, userId) => {
  try {
    const token = new EvaluationToken({
      email,
      userId,
      evaluationToken: uuidv4(), // Generate a unique token using uuid
    });
    await token.save();
    await sendTokenByEmail(email, token);
    return token;
  } catch (error) {
    throw new Error("Error creating token: " + error.message);
  }
};

const useEvaluationToken = async (token) => {
  try {
    const evaluationToken = await EvaluationToken.findOne({ evaluationToken: token });

    if (!evaluationToken) {
      throw new Error("Token not found.");
    }
    if (evaluationToken.usageCount >= 2) {
      throw new Error("Token has been used the maximum number of times allowed.");
    } else {
    evaluationToken.usageCount += 1;
    await evaluationToken.save();
    res.status(200).json({ message: "Token usage updated successfully" })};
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllEvaluationTokens = async () => {
  try {
    const tokens = await EvaluationToken.find({});
    return tokens;
  } catch (error) {
    throw new Error("Error fetching tokens: " + error.message);
  }
};

const deleteEvaluationToken = async (id) => {
  try {
    await EvaluationToken.findByIdAndDelete(id);
    return "Token deleted successfully.";
  } catch (error) {
    throw new Error("Error deleting token: " + error.message);
  }
};

module.exports = {
  createEvaluationToken,
  useEvaluationToken,
  getAllEvaluationTokens,
  deleteEvaluationToken,
};
