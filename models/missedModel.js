const mongoose = require('mongoose');

const missedMovesSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: [true, "Session id should be unique"],
    },
    coordinates: {
        type: Array
    }
});

const missedMoves = mongoose.model("missedMoves", missedMovesSchema);

module.exports = missedMoves;
