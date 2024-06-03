const Evaluations = require('../models/Evaluations');

const getSkillsDressing = async (req, res) => {
  try {
    const skillsDressing = await Evaluations.aggregate([
      { $unwind: '$questions' },
        { $match: { 'questions.id': { $in: [14, 15, 16, 17, 18] } } },
        { $group: {
          _id: '$_id',
          title: { $first: '$title' },
          version: { $first: '$version' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          questions: { $push: '$questions' }
        }}
    ])
    res.json(skillsDressing);
    console.log(skillsDressing);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSkillsDressing };
