// CONTIENE EL MODELO DE LAS PREGUNTAS DEL FORMULARIO DE LOS DATOS DE LOS NIÑOS
const mongoose = require("mongoose");
const { Schema } = mongoose;

const OptionSchema = new Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }
});

const CategorySchema = new Schema({
  category: { type: String, required: true },
  options: [OptionSchema]
});

const ChildFormSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  categories: { type: [CategorySchema], required: true }
}, { collection: 'childrenform'});

const ChildForm = mongoose.model('ChildForm', ChildFormSchema);

module.exports = ChildForm;
