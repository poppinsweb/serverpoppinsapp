const express = require("express");
const router = express.Router();

const { getHabitsSleeping } = require('../controllers/habitsSleeping.controller');

router.get('/habitssleeping', getHabitsSleeping);

module.exports = router;
