const express = require('express');
const router = express.Router();
const { createChildrenDataResponse } = require('../controllers/childrenDataResponse.controller');

router.post('/childrenres', createChildrenDataResponse);

module.exports = router;
