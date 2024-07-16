// REQUIERE IMPLEMENTAR JWT
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, evaluationtoken, admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 6);
    const newUser = new User({
      email,
      password: hashedPassword,
      evaluationtoken,
      admin,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const deleteUser = async(req, res) => {
  try {
    const delUserId = await User.findOneAndDelete(req.params.id)
    if(!delUserId) {
      return res
      .status(404)
      .json( { message: "No se pudo eliminar usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Authentication failed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Authentication failed" });
    }

    // Almacenamiento de la info del user en la sesión
    req.session.user = {
      id: user._id,
      email: user.email,
      evaluationtoken: user.evaluationtoken,
      admin: user.admin,
    };

    res.json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logout successful" });
  });
};

const verifyUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ user: req.session.user });
};

module.exports = { getAllUsers, createUser, deleteUser, loginUser, logoutUser, verifyUser };
