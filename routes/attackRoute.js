const express = require('express');
const router = express.Router();

const {attackController} = require("../controllers/attackController");
const attackValidation = require("../utils/attackValidation");

router.route("/")
                .post(attackValidation.validateAttack, attackController)


module.exports = router;
