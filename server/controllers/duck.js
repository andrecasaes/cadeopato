// controllers/duck.js
const Duck = require('../models/duck');

exports.getAllDucks = async (req, res) => {
  try {
    const ducks = await Duck.find();
    res.json(ducks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDuck = async (req, res) => {
  try {
    const { type, location, photo, house } = req.body;
    const duck = new Duck({ type, location, photo, house });
    await duck.save();
    res.status(201).json(duck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDuck = async (req, res) => {
  try {
    const { id } = req.params;
    const { found, foundBy, foundAt } = req.body;
    const duck = await Duck.findByIdAndUpdate(id, { found, foundBy, foundAt }, { new: true });
    if (!duck) return res.status(404).json({ message: 'Duck not found' });
    res.json(duck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
