const Evaluations = require("../models/Evaluation");

const getSkillsGrooming = async (req, res) => {
    try {
      const skillsGrooming = await Evaluations.aggregate([
        { $unwind: '$questions' },
        { $match: { 'questions.id': { $in: [5, 6, 7, 8, 9, 10, 11, 12, 13] } } },
        { $group: {
          _id: '$_id',
          title: { $first: '$title' },
          version: { $first: '$version' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          questions: { $push: '$questions' }
        }}
      ])
      res.json(skillsGrooming);
      console.log(skillsGrooming);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = { getSkillsGrooming };
