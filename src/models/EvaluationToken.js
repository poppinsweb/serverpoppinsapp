const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const EvaluationTokenSchema = new Schema({
  email: { type: String, required: true },
  userId: { type: ObjectId, ref: "User", required: true },
  evaluationToken: { type: String, unique: true },
  usageCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const EvaluationToken = mongoose.model('EvaluationToken', EvaluationTokenSchema);

module.exports = EvaluationToken;
