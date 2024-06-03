const express = require("express");
const router = express.Router();

const { getIndependence } = require('../controllers/independence.controller');

router.get('/independence', getIndependence);

module.exports = router;
