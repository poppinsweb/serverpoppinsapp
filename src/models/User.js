// MODELO QUE CONTIENE LOS USUARIOS REGISTRADOS
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  admin: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
