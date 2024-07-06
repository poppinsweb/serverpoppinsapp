const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const EvaluationTokenSchema = new Schema({
  email: { type: String, required: true },
  userId: { type: ObjectId, required: true },
  evaluationToken: { type: String, default: uuidv4, unique: true },
  usageCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const EvaluationToken = mongoose.model('EvaluationToken', EvaluationTokenSchema);

module.exports = EvaluationToken;
