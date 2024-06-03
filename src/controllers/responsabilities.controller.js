const Evaluations = require("../models/Evaluations");

const getResponsabilities = async (req, res) => {
    try {
      const responsabilities = await Evaluations.aggregate([
        { $unwind: '$questions' },
        { $match: { 'questions.id': { $in: [41, 42, 43, 44, 45, 46, 47, 48] } } },
        { $group: {
          _id: '$_id',
          title: { $first: '$title' },
          version: { $first: '$version' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          questions: { $push: '$questions' }
        }}
      ])
      res.json(responsabilities);
      console.log(responsabilities);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { getResponsabilities };
