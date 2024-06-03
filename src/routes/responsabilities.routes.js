const express = require("express");
const router = express.Router();

const { getResponsabilities } = require('../controllers/responsabilities.controller');

router.get('/responsabilities', getResponsabilities);

module.exports = router;
