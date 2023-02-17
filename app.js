const express = require('express');
const statusRoute = require("./routes/statusRoute");

const app = express();

app.use(express.json()); //Attaches body in JSON form to request




app.use("/api/v1/status", statusRoute);






module.exports = app;
