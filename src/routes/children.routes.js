const express = require("express");
const router = express.Router();
const { getChildrenForm } = require('../controllers/children.controller');

router.get('/children', getChildrenForm);

module.exports = router;
