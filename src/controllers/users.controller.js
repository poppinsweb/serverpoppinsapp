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
    console.log("📥 Datos recibidos en /register:", req.body);

    const { userName, password, password2, token, admin } = req.body;

    // Validación de campos requeridos
    if (!userName || !password || !token) {
      console.log("❌ Faltan campos requeridos");
      return res.status(400).json({ message: "Debe llenar todos los campos" });
    }

    // Verificar si el userName ya existe
    const existingUser = await User.findOne({ userName });
    console.log("🔎 Usuario existente?", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
    }

    // Verificar si el token ya fue registrado por otro usuario
    const existingToken = await User.findOne({ token });
    console.log("🔎 Token existente?", existingToken);
    if (existingToken) {
      return res.status(400).json({ message: "El token ya fue registrado" });
    }

    // Si el usuario no es admin, verificar password2
    if (!admin) {
      if (!password2) {
        console.log("❌ Password2 no recibido");
        return res.status(400).json({ message: "Ingrese de nuevo su password" });
      }

      if (password !== password2) {
        console.log("❌ Passwords no coinciden");
        return res.status(400).json({ message: "Las contraseñas no coinciden" });
      }
    }

    console.log("🔑 Hasheando password...");
    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = new User({
      userName,
      password: hashedPassword,
      token,
      admin: !!admin, // Si no se manda, será false
    });

    console.log("💾 Guardando usuario en BD:", newUser);
    await newUser.save();

    console.log("✅ Usuario creado correctamente");
    res.status(201).json({ message: "Usuario creado" });

  } catch (error) {
    console.error("💥 Error en createUser:", error);
    res.status(500).json({ message: "Error creando el usuario", error: error.message });
  }
};

// const createUser = async (req, res) => {
//   try {
//     const { userName, password, password2, token, admin } = req.body;

//     // Validación de campos requeridos
//     if (!userName || !password || !token) {
//       return res.status(400).json({ message: "Debe llenar todos los campos" });
//     }

//     // Verificar si el userName ya existe
//     const existingUser = await User.findOne({ userName });
//     if (existingUser) {
//       return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
//     }

//     // Verificar si el token ya fue registrado por otro usuario***
//     const existingToken = await User.findOne({ token });
//     if (existingToken) {
//       return res.status(400).json({ message: "El token ya fue registrado" });
//     }

//     // Si el usuario no es admin, verificar password2
//     if (!admin) {
//       if (!password2) {
//         return res.status(400).json({ message: "Ingrese de nuevo su password" });
//       }

//       if (password !== password2) {
//         return res.status(400).json({ message: "Las contraseñas no coinciden" });
//       }
//     }

//     const hashedPassword = await bcrypt.hash(password, 6);

//     const newUser = new User({
//       userName,
//       password: hashedPassword,
//       token,
//       admin: !!admin, // Si no se manda, será false
//     });

//     await newUser.save();
//     res.status(201).json({ message: "Usuario creado" });

//   } catch (error) {
//     res.status(500).json({ message: "Error creando el usuario", error: error.message });
//   }
// };

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

module.exports = { getAllUsers, createUser, deleteUser, loginUser, logoutUser, verifyUser };
