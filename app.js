const express = require('express');

// import routes
const statusRoute = require("./routes/statusRoute");
const newGameRoute = require("./routes/newGameRoute.js");
const placeShipRoute = require("./routes/placeShipRoute");
const attackRoute = require("./routes/attackRoute");

// import input validation
const {shipInputValidator} = require("./utils/shipValidation");
const attackInputValidation = require("./utils/attackValidation");

const app = express();

// Middleware for express
app.use(express.json()); //Attaches body in JSON form to request

// APIs
app.use("/api/v1/new-game", newGameRoute) // Done

app.use("/api/v1/place-ship", shipInputValidator, placeShipRoute) // Done - add horizontal direction and test isSetupDone

app.use("/api/v1/attack", attackInputValidation.attackInputValidator, attackRoute)

app.use("/api/v1/status", statusRoute);


module.exports = app;
