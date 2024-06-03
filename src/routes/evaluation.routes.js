const express = require("express");
const router = express.Router();

const { getEvaluations } = require('../controllers/evaluations.controller');

router.get('/', getEvaluations);

module.exports = router;
