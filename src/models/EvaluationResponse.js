const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResponseSchema = new Schema({
    questionId: { type: Number, required: true },
    optionId: { type: Number, required: true },
    answer: { type: String, required: false }
});

const EvaluationResponsesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    evaluationId: { type: Schema.Types.ObjectId, required: true, ref: 'Evaluation' },
    responses: { type: [ResponseSchema], required: true },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
}, { collection: 'evaluationresponses'});

const EvaluationResponses = mongoose.model('EvaluationResponses', EvaluationResponsesSchema);

module.exports = EvaluationResponses;
