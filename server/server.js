const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/duckdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Duck Schema
const duckSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  type: String,
  house: String,
  photo: String,
  found: Boolean,
});

const Duck = mongoose.model('Duck', duckSchema);

// Routes

// Get all ducks
app.get('/ducks', async (req, res) => {
  try {
    const ducks = await Duck.find();
    res.json(ducks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search ducks
app.get('/ducks/search', async (req, res) => {
  try {
    const { id, type, house, found, sortBy, order } = req.query;
    const query = {};

    if (id) query.id = id;
    if (type) query.type = type;
    if (house) query.house = house;
    if (found !== undefined) query.found = found === 'true';

    // Define sort order, defaulting to ascending order if not specified
    const sortOrder = order === 'desc' ? -1 : 1;

    const ducks = await Duck.find(query).sort({ [sortBy || 'id']: sortOrder });

    res.json(ducks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single duck by ID
app.get('/ducks/:id', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });
    res.json(duck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/rankings', async (req, res) => {
  try {
    const ducks = await Duck.find();
    const housePoints = ducks.reduce((acc, duck) => {
      if (duck.found) {
        acc[duck.house] = (acc[duck.house] || 0) + 1;
      }
      return acc;
    }, {});

    const rankings = Object.entries(housePoints).map(([house, points]) => ({ house, points }))
      .sort((a, b) => b.points - a.points);

    res.json(rankings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new duck
app.post('/ducks', async (req, res) => {
  const { id, type, house, photo, found } = req.body;
  const newDuck = new Duck({
    _id: new mongoose.Types.ObjectId(),
    id,
    type,
    house,
    photo,
    found,
  });
  try {
    const savedDuck = await newDuck.save();
    res.status(201).json(savedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing duck by ID
app.put('/ducks/:id', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    const { id, type, house, photo, found } = req.body;
    if (id !== undefined) duck.id = id;
    if (type !== undefined) duck.type = type;
    if (house !== undefined) duck.house = house;
    if (photo !== undefined) duck.photo = photo;
    if (found !== undefined) duck.found = found;

    const updatedDuck = await duck.save();
    res.json(updatedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/ducks', async (req, res) => {
  try {
    const result = await Duck.deleteMany({});
    res.status(200).json({ message: 'All ducks deleted successfully', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a duck by ID
app.delete('/ducks/:id', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    await duck.remove();
    res.json({ message: 'Duck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
