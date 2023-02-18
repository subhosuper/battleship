const express = require('express');
const router = express.Router();

const {attackController} = require("../controllers/attackController");

router.route("/")
                .post(attackController)


module.exports = router;
