const mongoose = require("mongoose");

const evaluationTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // expira en 7 días
  },
});

// 👇 Previene el OverwriteModelError
module.exports =
  mongoose.models.EvaluationToken ||
  mongoose.model("EvaluationToken", evaluationTokenSchema);
