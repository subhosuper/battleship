const express = require('express');
const router = express.Router();

const {attackController} = require("../controllers/attackController");
const attackValidation = require("../utils/attackValidation");
const {sessionValidation} = require("../utils/sessionValidation");

router.route("/")
                .post(sessionValidation, attackValidation.validateAttack, attackController)


module.exports = router;
