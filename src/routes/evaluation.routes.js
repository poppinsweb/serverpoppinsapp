const express = require("express");
const router = express.Router();
const { getEvaluations } = require('../controllers/evaluations.controller');
const { getIndependence } = require('../controllers/independence.controller');
const { getSkillsGrooming } = require('../controllers/skillsGrooming.controller');
const { getSkillsFeeding } = require('../controllers/skillsFeeding.controller');
const { getSkillsDressing } = require('../controllers/skillsDressing.controller');
const { getResponsabilities } = require('../controllers/responsabilities.controller');
const { getHabitsSleeping } = require('../controllers/habitsSleeping.controller');
const { getHabitsFeeding } = require('../controllers/habitsFeeding.controller');

router.get('/evaluation', getEvaluations);
router.get('/independence', getIndependence);
router.get('/skillsgrooming', getSkillsGrooming);
router.get('/skillsfeeding', getSkillsFeeding);
router.get('/skillsdressing', getSkillsDressing);
router.get('/responsabilities', getResponsabilities);
router.get('/habitssleeping', getHabitsSleeping);
router.get('/habitsfeeding', getHabitsFeeding);

module.exports = router;

