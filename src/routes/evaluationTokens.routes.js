const express = require("express");
const router = express.Router();
const {
  createToken,
  useToken,
  getAllTokens,
  deleteToken,
} = require("../controllers/evaluationTokens.controller");

router.post("/create-token", createToken);
router.put("/use-token/:token", useToken);
router.get("/tokens", getAllTokens);
// router.get("/tokens/:token", useToken);
router.delete("/delete-token/:id", deleteToken);
router.post("/tokens/:token/use", useToken);

module.exports = router;
