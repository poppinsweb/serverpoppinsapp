const express = require("express");
const router = express.Router();

const { getSkillsGrooming } = require('../controllers/skillsGrooming.controller');

router.get('/skillsgrooming', getSkillsGrooming);

module.exports = router;
