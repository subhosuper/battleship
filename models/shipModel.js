const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        // ref: 'Session',
        required: [true, "SessionRef is required"],
    },
    type: {
        type: String,
        required: [true, "Ship type shouldn't be empty"]
    },
    coordinates: {
        type: Array,
        required: [true, "Ship coordinates shouldn't be empty"]
    },
    status: {
        type: Array
    }
});

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;
