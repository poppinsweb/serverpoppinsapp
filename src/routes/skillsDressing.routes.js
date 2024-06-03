const express = require('express');
const router = express.Router();

const { getSkillsDressing } = require('../controllers/skillsDressing.controller');

router.get('/skillsdressing', getSkillsDressing);

module.exports = router;
