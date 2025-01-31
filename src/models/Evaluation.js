// MODELO QUE CONTIENE LAS PREGUNTAS DE LA ENCUESTA
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para las opciones
const OptionSchema = new Schema({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  score: { type: Number, required: true }
});

// Esquema para las preguntas
const QuestionSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [OptionSchema], required: true }
});

// Esquema principal
const EvaluationSchema = new Schema({
  title: { type: String, required: true },
  version: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  questions: { type: [QuestionSchema], required: true }
}, { collection: 'evaluations' }); // Especificar el nombre de la colección

const Evaluation = mongoose.model('evaluations', EvaluationSchema);

module.exports = Evaluation;

