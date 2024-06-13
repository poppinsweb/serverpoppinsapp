// controllers/childrenDAtaResponse.controller.js
const ChildrenDataResponse = require('../models/ChildrenDataResponse');

const createChildrenDataResponse = async (req, res) => {
  try {
    const { responses } = req.body;
    const newChildrenDataResponse = new ChildrenDataResponse({ responses });
    await newChildrenDataResponse.save();
    res.status(201).json(newChildrenDataResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating childrenData response', error });
  }
};

module.exports = { createChildrenDataResponse };
