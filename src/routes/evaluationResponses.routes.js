const express = require("express");
const router = express.Router();
const { saveEvaluationResponses, getEvaluationResponses } = require('../controllers/evaluationResponses.controller');

router.post('/evaluationresponses', saveEvaluationResponses);
router.get('/evaluationresponses', getEvaluationResponses);

module.exports = router;
