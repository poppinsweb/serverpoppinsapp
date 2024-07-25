const CompleteEvaluation = require('../models/CompleteEvaluation');
const EvaluationToken = require('../models/EvaluationToken');

const saveCompleteEvaluation = async (evaluationtoken, evaluationId, responses) => {
  try {
    const evaluationToken = await EvaluationToken.findOne({ evaluationToken: evaluationtoken });

    if (!evaluationToken) {
      throw new Error('Token not found');
    };

    if (evaluationToken.usageCount >= 2) {
      throw new Error('Token has been used the maximum number of times allowed');
    };

    const completeEvaluation = await CompleteEvaluation.findOne({ evaluationtoken, evaluationId });

    if (!completeEvaluation) {
     const newEvaluation = new CompleteEvaluation({
      evaluationtoken,
      evaluationId,
      responses,
    });
    await newEvaluation.save();
    evaluationToken.usageCount += 1;
    await evaluationToken.save();
    return newEvaluation;
  } else if (evaluationToken.usageCount === 1) {
    completeEvaluation.responses2 = responses;
    await completeEvaluation.save();
    evaluationToken.usageCount += 1;
    await evaluationToken.save();
    return completeEvaluation;
  } else {
    throw new Error("Token has been used the maximum number of times allowed");
  }
  } catch (error) {
    console.error('Error saving complete evaluation:', error);
    throw error;
  }
};

module.exports = { saveCompleteEvaluation };
