const express = require('express');

//import middlewares
const checkSession = require("./utils/sessionValidation");

// import routes
const statusRoute = require("./routes/statusRoute");
const newGameRoute = require("./routes/newGameRoute.js");
const placeShipRoute = require("./routes/placeShipRoute");


const app = express();
// Middleware for express
app.use(express.json()); //Attaches body in JSON form to request
// app.use(checkSession);

// APIs
app.use("/api/v1/new-game", newGameRoute)

app.use("/api/v1/place-ship", placeShipRoute)

app.use("/api/v1/status", statusRoute);


module.exports = app;
