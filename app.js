const express = require('express');
// import routes
const statusRoute = require("./routes/statusRoute");
const newGameRoute = require("./routes/newGameRoute.js")

const app = express();
// Middleware for express
app.use(express.json()); //Attaches body in JSON form to request


// APIs

app.use("/api/v1/new-game", newGameRoute)


app.use("/api/v1/status", statusRoute);





module.exports = app;
