const express = require('express');
const router = express.Router();
const Evaluation = require('../Evaluations');

// GET /evaluation - Get all evaluations
router.get('/', async (req, res) => {
    try {
        const evaluation = await Evaluation.find();
        res.json(evaluation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
