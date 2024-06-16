const express = require("express");
const router = express.Router();
const { getChildrenForm } = require('../controllers/children.controller');
const { saveChildResponse, getChildrenResponse } = require('../controllers/childrenResponse.controller');

router.get('/children', getChildrenForm);
router.post('/childrenres', saveChildResponse);
router.get('/childrenres', getChildrenResponse);
module.exports = router;
