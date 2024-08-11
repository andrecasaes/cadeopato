// routes/ducks.js
const express = require('express');
const router = express.Router();
const duckController = require('../controllers/duck');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, duckController.getAllDucks);
router.post('/', [verifyToken, isAdmin], duckController.createDuck);
router.put('/:id', [verifyToken, isAdmin], duckController.updateDuck);

module.exports = router;
