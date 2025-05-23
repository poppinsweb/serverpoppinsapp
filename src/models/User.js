// MODELO QUE CONTIENE LOS USUARIOS REGISTRADOS
const mongoose = require("mongoose");
const { Schema } = mongoose;
// const { v4: uuidv4 } = require('uuid');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // evaluationtoken: { type: String, default: uuidv4, unique: true },
  admin: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
