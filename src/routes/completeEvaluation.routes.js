const express = require("express");
const router = express.Router();
const {
  createCompleteEvaluation,
  getCompleteEvaluations,
  getCompleteEvaluationById,
  updateCompleteEvaluation,
  deleteCompleteEvaluation,
} = require("../controllers/completeEvaluations.controller");

router.post("/completevaluation", createCompleteEvaluation);
router.put("/completevaluations/:id", updateCompleteEvaluation);
router.get("/completevaluations", getCompleteEvaluations);
router.get("/completevaluations/:id", getCompleteEvaluationById);
router.delete("/completeevaluations/:id", deleteCompleteEvaluation); 

module.exports = router;
