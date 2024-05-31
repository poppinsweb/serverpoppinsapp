const express = require("express");
const router = express.Router();
const Evaluation = require("../models/Evaluations");

// GET /evaluation - Get all evaluations
router.get("/", async (req, res) => {
  try {
    const evaluation = await Evaluation.find();
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const independence = await Evaluation.aggregate([
      { $unwind: '$questions' },
      { $match: { 'questions.id': { $in: [1, 2, 3, 4] } } },
      { $group: {
        _id: '$_id',
        title: { $first: '$title' },
        version: { $first: '$version' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        questions: { $push: '$questions' }
      }}
    ]);

    console.log(independence);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
