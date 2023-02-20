const express = require('express');
const {shipPlaceAvailable, shipDataValidations} = require("../utils/shipValidation");
const {sessionValidation} = require("../utils/sessionValidation");

const router = express.Router();

const placeShipController = require("../controllers/placeShipController");

router.route("/")
                .post(sessionValidation, shipPlaceAvailable, shipDataValidations, placeShipController.newShip);


module.exports = router;
