const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use the MONGODB_URL from environment variables, fallback to a default value
const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/duckdb';

// Connect to MongoDB
mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Define the schemas
const houseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
});

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  profilePicture: String, // Path to the profile picture file
});

const duckSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  type: String,
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  photo: String, // Path to the photo file
  found: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who found the duck
});

// Define the models
const House = mongoose.model('House', houseSchema);
const User = mongoose.model('User', userSchema);
const Duck = mongoose.model('Duck', duckSchema);

// Use environment variables to determine the upload directory
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads/');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the dynamic path from the environment variable
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + path.basename(file.originalname);
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the uploads folder
app.use('/uploads', express.static(uploadDir));

// Routes

// Get all houses
app.get('/houses', async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new house
app.post('/houses', async (req, res) => {
  const { name, address } = req.body;
  const newHouse = new House({
    _id: new mongoose.Types.ObjectId(),
    name,
    address,
  });

  try {
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('house');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user with profile picture
app.post('/users', upload.single('profilePicture'), async (req, res) => {
  const { username, houseId } = req.body;
  const profilePicture = req.file ? `uploads/${req.file.filename}` : null;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    house: houseId,
    profilePicture,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing user by ID with profile picture
app.put('/users/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { username, houseId } = req.body;
    if (username !== undefined) user.username = username;
    if (houseId !== undefined) user.house = houseId;
    if (req.file) user.profilePicture = `uploads/${req.file.filename}`; // Update profile picture if a new file is uploaded

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all ducks
app.get('/ducks', async (req, res) => {
  try {
    const ducks = await Duck.find().populate('user').populate('house');
    res.json(ducks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search ducks
app.get('/ducks/search', async (req, res) => {
  try {
    const { id, type, houseId, userId, found, sortBy, order } = req.query;
    const query = {};

    if (id) query.id = id;
    if (type) query.type = type;
    if (houseId) query.house = houseId;  // Query by house ID in the nested house object
    if (userId) query.user = userId;    // Query by user ID in the nested user object
    if (found !== undefined) query.found = found === 'true';

    const sortOrder = order === 'desc' ? -1 : 1;

    const ducks = await Duck.find(query)
      .sort({ [sortBy || 'id']: sortOrder })
      .populate('user')  // Populate the user reference
      .populate('house');  // Populate the house reference

    res.json(ducks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a single duck by ID
app.get('/ducks/:id', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id).populate('foundBy').populate('house');
    if (!duck) return res.status(404).json({ message: 'Duck not found' });
    res.json(duck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get rankings based on found ducks, by house or by user
app.get('/rankings', async (req, res) => {
  try {
    const { by } = req.query; // Get the query parameter 'by', which can be 'house' or 'user'
    
    const ducks = await Duck.find().populate('house').populate('user');
    
    // Determine how to accumulate points based on the 'by' parameter
    const pointsAccumulator = ducks.reduce((acc, duck) => {
      if (duck.found) {
        if (by === 'user' && duck.user) {
          acc[duck.user.username] = (acc[duck.user.username] || 0) + 1;
        } else if (by === 'house' && duck.house) {
          acc[duck.house.name] = (acc[duck.house.name] || 0) + 1;
        }
      }
      return acc;
    }, {});

    // Convert the accumulated points into a sortable array
    const rankings = Object.entries(pointsAccumulator).map(([entity, points]) => ({ entity, points }))
      .sort((a, b) => b.points - a.points);

    res.json(rankings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new duck with photo upload
app.post('/ducks', upload.single('photo'), async (req, res) => {
  const { id, type, houseId, userId, found } = req.body;
  const photo = req.file ? `uploads/${req.file.filename}` : null;

  const newDuck = new Duck({
    _id: new mongoose.Types.ObjectId(),
    id,
    type,
    house: houseId, 
    photo,
    found,
    user: userId,
  });

  try {
    const savedDuck = await newDuck.save();
    res.status(201).json(savedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing duck by ID with photo upload
app.put('/ducks/:id', upload.single('photo'), async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    const { id, type, houseId, found, userId } = req.body;
    if (id !== undefined) duck.id = id;
    if (type !== undefined) duck.type = type;
    if (houseId !== undefined) duck.house = houseId;
    if (found !== undefined) duck.found = found;
    if (userId !== undefined) duck.user = userId;
    if (req.file) duck.photo = `uploads/${req.file.filename}`; // Update photo if a new file is uploaded

    const updatedDuck = await duck.save();
    res.json(updatedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a duck's foundBy field when a duck is found
app.put('/ducks/:id/found', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    duck.found = true;

    const updatedDuck = await duck.save();
    res.json(updatedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete all ducks
app.delete('/ducks', async (req, res) => {
  try {
    const result = await Duck.deleteMany({});
    res.status(200).json({ message: 'All ducks deleted successfully', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all users
app.delete('/users', async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ message: 'All users deleted successfully', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all houses
app.delete('/houses', async (req, res) => {
  try {
    const result = await House.deleteMany({});
    res.status(200).json({ message: 'All houses deleted successfully', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a duck by ID
app.delete('/ducks/:id', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    await duck.deleteOne();
    res.json({ message: 'Duck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Load SSL certificate and key based on environment
const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  ca: process.env.SSL_CA_PATH ? fs.readFileSync(process.env.SSL_CA_PATH) : undefined,
};

// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
