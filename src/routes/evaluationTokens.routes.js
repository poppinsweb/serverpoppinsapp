// routes/evaluationTokenRoutes.js
const express = require('express');
const router = express.Router();
const evaluationTokenController = require('../controllers/evaluationTokens.controller'); 

// Ruta para crear un token
router.post('/create-token', evaluationTokenController.createTokenController);

// Ruta para usar el token
router.post('/use-token', evaluationTokenController.useTokenController);

// Ruta para obtener todos los tokens (opcional)
router.get('/tokens', evaluationTokenController.getAllTokensController);

router.delete('/delete-token/:id', evaluationTokenController.deleteTokenController);

module.exports = router;
