// MODELO QUE CONTIENE LAS RESPUESTAS DE CADA NIÑO A LA ENCUESTA
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Esquema para las respuestas
const ResponseSchema = new Schema({
  questionId: { type: Number, required: true },
  optionId: { type: Number, required: true },
  description: { type: String, required: true },
  answer: { type: Schema.Types.Mixed, required: true },
});

// Esquema principal para CompleteEvaluation
const CompleteEvaluationSchema = new Schema(
  {
    evaluationtoken: { type: String, required: true },

    evaluationId: {
      type: Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true,
    },

    // Primera aplicación
    responses: { type: [ResponseSchema], required: true },
    firstAppliedAt: { type: Date }, // 👈 fecha de primera aplicación

    // Segunda aplicación
    responses2: { type: [ResponseSchema] },
    secondAppliedAt: { type: Date }, // 👈 fecha de segunda aplicación

    // Metadata
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "completevaluations",
  }
);

// Middleware para actualizar updatedAt automáticamente
CompleteEvaluationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const CompleteEvaluation = mongoose.model(
  "CompleteEvaluation",
  CompleteEvaluationSchema
);

module.exports = CompleteEvaluation;