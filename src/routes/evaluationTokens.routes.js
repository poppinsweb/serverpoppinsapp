const express = require("express");
const router = express.Router();
const {
  createTokenController,
  useTokenController,
  getAllTokensController,
  deleteTokenController,
} = require("../controllers/evaluationTokens.controller");

router.post("/create-token", createTokenController);
router.post("/use-token", useTokenController);
router.get("/tokens", getAllTokensController);
router.delete("/delete-token/:id", deleteTokenController);

module.exports = router;
