const express = require("express");
const router = express.Router();

const { getHabitsFeeding } = require('../controllers/habitsFeeding.controller');

router.get('/habitsfeeding', getHabitsFeeding);

module.exports = router;
