const express = require('express');
const {shipPlaceAvailable} = require("../utils/shipValidation");
const {checkSession} = require("../utils/sessionValidation");

const router = express.Router();

const placeShipController = require("../controllers/placeShipController");

router.route("/")
                .post(shipPlaceAvailable, placeShipController.newShip);


module.exports = router;
