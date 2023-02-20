const express = require('express');
const router = express.Router();
const statusController = require("../controllers/statusController.js");
const {sessionValidation} = require("../utils/sessionValidation");

router.route('/').get(sessionValidation, statusController.getGameStatus);

module.exports = router;
      
