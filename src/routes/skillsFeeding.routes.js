const express = require("express");
const router = express.Router();

const { getSkillsFeeding } = require('../controllers/skillsFeeding.controller');

router.get('/skillsfeeding', getSkillsFeeding);

module.exports = router;
