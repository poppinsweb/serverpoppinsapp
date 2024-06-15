const Evaluations = require("../models/Evaluation");

const getSkillsFeeding = async (req, res) => {
  try {
    const skillsFeeding = await Evaluations.aggregate([
      { $unwind: '$questions' },
      { $match: { 'questions.id': { $in: [19, 20, 21] } } },
      { $group: {
        _id: '$_id',
        title: { $first: '$title' },
        version: { $first: '$version' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        questions: { $push: '$questions' }
      }}
    ])
    res.json(skillsFeeding);
    console.log(skillsFeeding);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSkillsFeeding };
