const EvaluationResponses = require('../models/EvaluationResponse');
const mongoose = require('mongoose');

const saveEvaluationResponses = async(req, res) => {

  const { userId, evaluationId, responses } = req.body;

    if (!userId || !evaluationId || !responses) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        // Validar que el userId y evaluationId sean ObjectId válidos
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(evaluationId)) {
            return res.status(400).json({ error: 'ID de usuario o evaluación no válido' });
        }

        // Crear el documento de respuestas de evaluación
        const evaluationResponses = new EvaluationResponses({
            userId,
            evaluationId,
            responses,
        });

        // Guardar en la base de datos
        await evaluationResponses.save();

        return res.status(201).json({ message: 'Respuestas de evaluación guardadas exitosamente', evaluationResponses });
    } catch (error) {
        console.error('Error al guardar las respuestas de evaluación:', error);
        return res.status(500).json({ error: 'Error del servidor al guardar las respuestas de evaluación' });
    }
};

module.exports = { saveEvaluationResponses };
