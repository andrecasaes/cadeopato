// models/duck.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const duckSchema = new Schema({
  type: { type: String, required: true }, // 'plain' or 'sunglasses'
  location: { type: String, required: true },
  photo: { type: String }, // URL or file path
  house: { type: String, required: true },
  found: { type: Boolean, default: false },
  foundBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  foundAt: { type: Date },
});

module.exports = mongoose.model('Duck', duckSchema);
