const Users = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, token, admin } = req.body;
    const newUser = new Users({
      email,
      password,
      token,
      admin,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

module.exports = { getAllUsers, createUser };
