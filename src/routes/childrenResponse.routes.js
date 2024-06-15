const express = require('express');
const router = express.Router();
const { saveChildResponse } = require('../controllers/childrenResponse.controller');

router.post('/childrenres', saveChildResponse);

module.exports = router;
