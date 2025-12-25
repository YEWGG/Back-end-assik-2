const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/get-random-profile', userController.getRandomUserData);

module.exports = router;