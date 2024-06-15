const Evaluations = require("../models/Evaluation");

const getAditionals = async (req, res) => {
    try {
      const aditionals = await Evaluations.aggregate([
        { $unwind: '$questions' },
        { $match: { 'questions.id': { $in: [49, 50, 51] } } },
        { $group: {
          _id: '$_id',
          title: { $first: '$title' },
          version: { $first: '$version' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          questions: { $push: '$questions' }
        }}
      ])
      res.json(aditionals);
      console.log(aditionals);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { getAditionals };