// REQUIERE IMPLEMENTAR JWT
// @ts-ignore
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
    const { userName, password, password2, token, admin } = req.body;

    // Validación de campos requeridos
    if (!userName || !password || !token) {
      return res.status(400).json({ message: "Debe llenar todos los campos" });
    }

    // Normalizar token a array
    const tokenArray = Array.isArray(token) ? token : [token];

    // Verificar si el userName ya existe
    const existingUser = await User.findOne({ userName });
    console.log("🔎 Usuario existente?", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
    }

    // Verificar si el token ya fue registrado por otro usuario
    const tokenConflict = await User.findOne({ token: { $in: tokenArray } });
    if (tokenConflict) {
      return res.status(400).json({ message: "Alguno de los tokens ya fue registrado" });
    }

    // Si el usuario no es admin, verificar password2
    if (!admin) {
      if (!password2) {
        return res.status(400).json({ message: "Ingrese de nuevo su password" });
      }

      if (password !== password2) {
        return res.status(400).json({ message: "Las contraseñas no coinciden" });
      }
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = new User({
      userName,
      password: hashedPassword,
      token: tokenArray,
      admin: !!admin, // Si no se manda, será false
      email: req.body.email || undefined, // Si no se manda, será cadena vacía
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).json({ message: "Error creando el usuario", error: error.message });
  }
};

const addTokenToUser = async (req, res) => {
  try {
    const { token } = req.body;
    const { id } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Debe enviar un token" });
    }

    // Validar que el token no esté usado
    const tokenConflict = await User.findOne({ token: token });
    if (tokenConflict) {
      return res.status(400).json({ message: "El token ya está vinculado a otro usuario" });
    }

    // Agregar el token al array del usuario
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { token: token } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Token agregado correctamente", user: updatedUser });
  } catch (error) {
    console.error("💥 Error en addTokenToUser:", error);
    res.status(500).json({ message: "Error al agregar token", error: error.message });
  }
};

const deleteUser = async(req, res) => {
  try {
    const { id } = req.params;
    const delUserId = await User.findOneAndDelete({ _id: id });
    res.json({ message: "Usuario eliminado" });
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
  const { userName, email, password } = req.body;

  try {
    let user;
    // Si se proporciona email, buscar por email, de lo contrario por userName
    if (userName){
      user = await User.findOne({ userName });
    } else if (email) {
      user = await User.findOne({ email });
    }
    
    if (!user) {
      return res.status(400).json({ message: "No se pudo autenticar el usuario" });
    }

    // console.log("backend user:", user);
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "No se pudo autenticar el usuario" });
    }

    // Almacenamiento de la info del user en la sesión
    req.session.user = {
      id: user._id,
      userName: user.userName,
      email: user.email,
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

module.exports = { getAllUsers, createUser, deleteUser, loginUser, logoutUser, verifyUser, addTokenToUser };
