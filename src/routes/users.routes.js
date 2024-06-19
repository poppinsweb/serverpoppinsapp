const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, loginUser, logoutUser, verifyUser } = require('../controllers/users.controller');

router.get('/users', getAllUsers);
router.post('/register', createUser);
router.post('/auth/login', loginUser);
router.post('/auth/logout', logoutUser);
router.get('/auth/verify', verifyUser);

module.exports = router;
