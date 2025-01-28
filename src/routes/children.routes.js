const express = require("express");
const router = express.Router();
const { getChildrenForm } = require('../controllers/children.controller');
const { saveChildResponse, getChildrenResponse, deleteChild, exportChildrenToExcel } = require('../controllers/childrenResponse.controller');

router.get('/children', getChildrenForm);
router.post('/childrenres', saveChildResponse);
router.get('/childrenres', getChildrenResponse);
router.delete('/delete-child/:id', deleteChild);

// router.get('/export', exportChildrenToExcel);

module.exports = router;
