const express = require('express');
const router = express.Router();

const sessionController = require("../controllers/sessionController");

router.route("/")
                .post(sessionController.createNewSession)


module.exports = router;
