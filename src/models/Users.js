const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  title: { type: String, required: true },
  personalData: [
    {
      id: { type: Number, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      admin: { type: Boolean, required: true },
    },
  ],
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
