const express = require("express");
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/users.controller');

router.get('/users', getAllUsers);
router.post('/users', createUser);

module.exports = router;
