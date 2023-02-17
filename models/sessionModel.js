const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: [true, "Session id should be unique"],
        unique: true
    }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
