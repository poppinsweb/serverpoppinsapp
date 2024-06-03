const Evaluations = require("../models/Evaluations");

const getHabitsSleeping = async (req, res) => {
    try {
      const habitsSleeping = await Evaluations.aggregate([
        { $unwind: '$questions' },
        { $match: { 'questions.id': { $in: [37, 38, 39, 40] } } },
        { $group: {
          _id: '$_id',
          title: { $first: '$title' },
          version: { $first: '$version' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          questions: { $push: '$questions' }
        }}
      ])
      res.json(habitsSleeping);
      console.log(habitsSleeping);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { getHabitsSleeping };
