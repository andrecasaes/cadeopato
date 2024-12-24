// models/clue.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clueSchema = new Schema({
  clue: { type: String, required: true },
  answer: { type: String, required: true },
  solved: { type: Boolean, default: false },
  duckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Duck', required: true },
});

module.exports = mongoose.model('Clue', clueSchema);