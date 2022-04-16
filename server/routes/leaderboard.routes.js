const router = require('express').Router();
const leaderboard = require('../controllers/leaderboard.controller.js');

// Leaderboard Routes
router.get('/leaderboard/global', leaderboard.global);

module.exports = router;