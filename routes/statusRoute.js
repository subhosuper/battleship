const express = require('express');
const router = express.Router();
const statusController = require("../controllers/statusController.js");

router.route('/').get(statusController.getGameStatus);

module.exports = router;
      
