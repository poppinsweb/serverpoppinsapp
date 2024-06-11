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

const ChildrenSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  categories: { type: [CategorySchema], required: true }
}, { collection: 'childrenData'});

const ChildrenData = mongoose.model('childrendData', ChildrenSchema);

module.exports = ChildrenData;
