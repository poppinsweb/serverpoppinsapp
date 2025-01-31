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
    responses: { type: [ResponseSchema], required: true },
    responses2: { type: [ResponseSchema] }, // Nuevo campo para las segundas respuestas
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "completevaluations" }
);

const CompleteEvaluation = mongoose.model(
  "CompleteEvaluation",
  CompleteEvaluationSchema
);

module.exports = CompleteEvaluation;
