const express = require("express");
const router = express.Router();
const { saveEvaluationResponses } = require('../controllers/evaluationResponses.controller');

router.post('/responses', saveEvaluationResponses);

module.exports = router;
