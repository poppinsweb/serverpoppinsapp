const Evaluations = require("../models/Evaluation");

const getIndependence = async (req, res) => {
    try {
      const independence = await Evaluations.aggregate([
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
      ])
      res.json(independence);
      console.log(independence);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { getIndependence };
