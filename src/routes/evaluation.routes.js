const express = require("express");
const router = express.Router();
const { saveEvaluationResponses, getEvaluationResponses } = require('../controllers/evaluationResponses.controller');
const { getEvaluations } = require("../controllers/evaluations.controller");

router.post('/responses', saveEvaluationResponses);
router.get('/evalresponses', getEvaluationResponses);
router.get('/evaluation', getEvaluations);

module.exports = router;
