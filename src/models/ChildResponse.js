// CONTIENE EL MODELO DE LOS DATOS DILIGENCIADOS DE UN NIÑO
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChildResponseSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    evaluationtoken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    responses: [
      {
        category: { type: String, required: true },
        value: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  { collection: "childrenresponses" }
);

const ChildResponse = mongoose.model("ChildResponse", ChildResponseSchema);

module.exports = ChildResponse;
