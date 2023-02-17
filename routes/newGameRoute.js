const express = require('express');
const router = express.Router();

const newGameController = require("../controllers/newGameController");

router.route("/")
                .post(newGameController.createNewSession)


module.exports = router;
