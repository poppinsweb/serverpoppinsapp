const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para las respuestas
const ResponseSchema = new Schema({
  questionId: { type: Number, required: true },
  optionId: { type: Number, required: true },
  description: { type: String, required: true },
  answer: { type: Schema.Types.Mixed, required: true }
});

// Esquema principal para CompleteEvaluation
const CompleteEvaluationSchema = new Schema({
  evaluationtoken: { type: String, required: true },
  // childResponseId: { type: Schema.Types.ObjectId, ref: 'ChildResponse', required: true },
  evaluationId: { type: Schema.Types.ObjectId, ref: 'Evaluation', required: true },
  responses: { type: [ResponseSchema], required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'completevaluations' }); // Especificar el nombre de la colección

const CompleteEvaluation = mongoose.model('CompleteEvaluation', CompleteEvaluationSchema);

module.exports = CompleteEvaluation;
