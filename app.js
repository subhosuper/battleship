const express = require('express');

const app = express();

app.use(express.json()); //Attaches body in JSON form to request

module.exports = app;
