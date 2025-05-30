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
  foundDate: { type: Date }, // Date when the duck was found
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who found the duck
  clues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clue' }], // Reference to the clues for the duck
});

const clueSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  clue: { type: String, required: true },
  answer: { type: String, required: true },
  solved: { type: Boolean, default: false },
});


// Define the models
const House = mongoose.model('House', houseSchema);
const User = mongoose.model('User', userSchema);
const Duck = mongoose.model('Duck', duckSchema);
const Clue = mongoose.model('Clue', clueSchema);

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
    const ducks = await Duck.find().populate('user').populate('house').populate('clues');
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
      .populate('house')
      .populate('clues');  // Populate the house reference

    res.json(ducks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a single duck by ID
app.get('/ducks/:id', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id).populate('user').populate('house').populate('clues');
    if (!duck) return res.status(404).json({ message: 'Duck not found' });
    res.json(duck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Set the competition start date
const competitionStartDate = new Date('2024-09-15');

// Function to get date at midnight to avoid time component issues
function getMidnightDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Get rankings based on found ducks, by house or by user
app.get('/rankings', async (req, res) => {
  try {
    const { by } = req.query; // 'by' can be 'house' or 'user'
    
    const ducks = await Duck.find().populate('house').populate('user');

    // Determine how to accumulate points based on the 'by' parameter
    const pointsAccumulator = ducks.reduce((acc, duck) => {
      if (duck.found && duck.foundDate) {
        // Get the dates at midnight to standardize them
        const competitionDate = getMidnightDate(competitionStartDate);
        const foundDate = getMidnightDate(new Date(duck.foundDate));

        // Calculate the number of weeks since the competition started
        const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
        const weeksSinceStart = Math.floor((foundDate - competitionDate) / millisecondsPerWeek);

        // Assign points based on the duck type and weeks since competition start
        let points = 1; // Default points for normal ducks
        if (duck.type === 'oclinhos') {
          if (weeksSinceStart < 0) {
            points = 5; // Found before competition start
          } else if (weeksSinceStart === 0) {
            points = 5; // First week
          } else if (weeksSinceStart === 1) {
            points = 5; // Second week
          } else if (weeksSinceStart === 2) {
            points = 4; // Third week
          } else if (weeksSinceStart === 3) {
            points = 3; // Fourth week
          } else if (weeksSinceStart === 4) {
            points = 2; // Fifth week
          } else {
            points = 1; // After fourth week
          }
        }

        // Accumulate points by user or house
        if (by === 'user' && duck.user) {
          acc[duck.user.username] = (acc[duck.user.username] || 0) + points;
        } else if (by === 'house' && duck.house) {
          acc[duck.house.name] = (acc[duck.house.name] || 0) + points;
        }
      }
      return acc;
    }, {});

    // Convert the accumulated points into a sortable array
    const rankings = Object.entries(pointsAccumulator)
      .map(([entity, points]) => ({ entity, points }))
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

    const { id, type, houseId, found, foundDate, userId } = req.body;
    
    if (id !== undefined) duck.id = id;
    if (type !== undefined) duck.type = type;
    if (houseId !== undefined) duck.house = houseId;
    if (found !== undefined) {
      duck.found = found;
      
      // If found is true and foundDate is not provided, set the current date
      if (found == true && !foundDate) {
        duck.foundDate = new Date();
      }
      
      if (found == false) {
        duck.foundDate = null;
      }
    }
    if (foundDate !== undefined) duck.foundDate = foundDate; // If the date is explicitly provided, set it
    if (userId !== undefined) duck.user = userId;
    if (req.file) duck.photo = `uploads/${req.file.filename}`; // Update photo if a new file is uploaded

    const updatedDuck = await duck.save();
    res.json(updatedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update only the image of an existing duck by custom ID
app.put('/ducks/image/:customId', upload.single('photo'), async (req, res) => {
  try {
    // Find duck by custom ID instead of internal _id
    const duck = await Duck.findOne({ id: req.params.customId });
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    // Update photo if a new file is uploaded
    if (req.file) {
      duck.photo = `uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'No photo file provided' });
    }

    const updatedDuck = await duck.save();
    res.json(updatedDuck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update a duck's foundBy field and foundDate when a duck is found
app.put('/ducks/:id/found', async (req, res) => {
  try {
    const duck = await Duck.findById(req.params.id);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    duck.found = true;
    duck.foundDate = new Date(); // Set the found date to the current date

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

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a house by ID
app.delete('/houses/:id', async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: 'House not found' });

    await house.deleteOne();
    res.json({ message: 'House deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk create ducks with photo upload
app.post('/ducks/bulk', upload.array('photos'), async (req, res) => {
  const ducksData = req.body.ducks;
  const files = req.files;

  const ducks = ducksData.map((duckData, index) => {
    const photo = files && files[index] ? `uploads/${files[index].filename}` : null;

    return new Duck({
      _id: new mongoose.Types.ObjectId(),
      id: duckData.id,
      type: duckData.type,
      house: duckData.houseId,
      photo,
      found: duckData.found,
      user: duckData.userId,
    });
  });

  try {
    const savedDucks = await Duck.insertMany(ducks);
    res.status(201).json(savedDucks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Bulk create houses
app.post('/houses/bulk', async (req, res) => {
  const housesData = req.body.houses;

  const houses = housesData.map(houseData => new House({
    _id: new mongoose.Types.ObjectId(),
    name: houseData.name,
    address: houseData.address,
  }));

  try {
    const savedHouses = await House.insertMany(houses);
    res.status(201).json(savedHouses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Bulk create users with profile pictures
app.post('/users/bulk', upload.array('profilePictures'), async (req, res) => {
  const usersData = req.body.users;
  const files = req.files;

  const users = usersData.map((userData, index) => {
    const profilePicture = files && files[index] ? `uploads/${files[index].filename}` : null;

    return new User({
      _id: new mongoose.Types.ObjectId(),
      username: userData.username,
      house: userData.houseId,
      profilePicture,
    });
  });

  try {
    const savedUsers = await User.insertMany(users);
    res.status(201).json(savedUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new clue associated with a duck
app.post('/ducks/:duckId/clues', async (req, res) => {
  const { clue, answer } = req.body;

  try {
    const duck = await Duck.findById(req.params.duckId);
    if (!duck) return res.status(404).json({ message: 'Duck not found' });

    const newClue = new Clue({
      _id: new mongoose.Types.ObjectId(),
      clue,
      answer,
      solved: false,
    });

    const savedClue = await newClue.save();

    // Add the clue to the duck's clues array
    duck.clues.push(savedClue._id);
    await duck.save();

    res.status(201).json(savedClue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all clues
app.get('/clues', async (req, res) => {
  try {
    const clues = await Clue.find();
    res.json(clues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single clue by ID
app.get('/clues/:id', async (req, res) => {
  try {
    const clue = await Clue.findById(req.params.id);
    if (!clue) return res.status(404).json({ message: 'Clue not found' });
    res.json(clue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a clue by ID
app.put('/clues/:id', async (req, res) => {
  try {
    const clue = await Clue.findById(req.params.id);
    if (!clue) return res.status(404).json({ message: 'Clue not found' });

    const { clue: updatedClue, answer, solved } = req.body;
    if (updatedClue !== undefined) clue.clue = updatedClue;
    if (answer !== undefined) clue.answer = answer;
    if (solved !== undefined) clue.solved = solved;

    const updatedClueObj = await clue.save();
    res.json(updatedClueObj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a clue by ID
app.delete('/clues/:id', async (req, res) => {
  try {
    const clue = await Clue.findById(req.params.id);
    if (!clue) return res.status(404).json({ message: 'Clue not found' });

    await clue.deleteOne();
    res.json({ message: 'Clue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Load SSL certificate and key based on environment
const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
};

// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
