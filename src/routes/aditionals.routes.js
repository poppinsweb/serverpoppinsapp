const express = require("express");
const router = express.Router();

const { getAditionals } = require('../controllers/aditionals.controller');

router.get('/aditionals', getAditionals);

module.exports = router;