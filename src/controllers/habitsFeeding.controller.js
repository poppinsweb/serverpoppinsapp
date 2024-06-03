const Evaluations = require("../models/Evaluations");

const getHabitsFeeding = async (req, res) => {
    try {
      const habitsFeeding = await Evaluations.aggregate([
        { $unwind: '$questions' },
        { $match: { 'questions.id': { $in: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] } } },
        { $group: {
          _id: '$_id',
          title: { $first: '$title' },
          version: { $first: '$version' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          questions: { $push: '$questions' }
        }}
      ])
      res.json(habitsFeeding);
      console.log(habitsFeeding);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { getHabitsFeeding };
