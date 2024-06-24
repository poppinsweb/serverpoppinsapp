const express = require("express");
const router = express.Router();
const { saveEvaluationResponses, getEvaluationResponses } = require('../controllers/evaluationResponses.controller');

router.post('/responses', saveEvaluationResponses);
router.get('/evalresponses', getEvaluationResponses);

module.exports = router;
