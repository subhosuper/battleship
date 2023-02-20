const express = require('express');
const {shipPlaceAvailable, shipDataValidations} = require("../utils/shipValidation");
// const {checkSession} = require("../utils/sessionValidation");

const router = express.Router();

const placeShipController = require("../controllers/placeShipController");

router.route("/")
                .post(shipPlaceAvailable, shipDataValidations, placeShipController.newShip);


module.exports = router;
