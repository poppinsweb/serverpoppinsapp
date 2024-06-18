const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, loginUser, logoutUser } = require('../controllers/users.controller');

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/auth/login', loginUser);
router.get('/auth/logout', logoutUser);

module.exports = router;
