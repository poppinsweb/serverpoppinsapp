const Users = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers };
