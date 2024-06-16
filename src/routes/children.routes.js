const express = require("express");
const router = express.Router();
const { getChildrenForm } = require('../controllers/children.controller');
const { saveChildResponse } = require('../controllers/childrenResponse.controller');

router.get('/children', getChildrenForm);
router.post('/childrenres', saveChildResponse);

module.exports = router;
