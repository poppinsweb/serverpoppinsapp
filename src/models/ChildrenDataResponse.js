// models/ChildrenDataResponse.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChildrenDataResponseSchema = new Schema({
  responses: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'childrendataresponses'});

const ChildrenDataResponse = mongoose.model('ChildrenDataResponse', ChildrenDataResponseSchema);

module.exports = ChildrenDataResponse;
