const express = require("express");
const router = express.Router();
const { getChildrenData } = require('../controllers/children.controller');

router.get('/children', getChildrenData);

module.exports = router;
