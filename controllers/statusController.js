const Ship = require("../models/shipModel");
const missedMoves = require("../models/missedModel");
const {constants} = require("../utils/constants");
const attackValidations = require("../utils/attackValidation");

const getAllHits = async (sessionId) => {
    const allHits = [];
    const query = Ship.find({sessionId: sessionId, status: "hit"}, {_id: 0, coordinates: 1, status: 1})
    const gameState = await query;

    for (doc of gameState){
        for (eachIndex in doc["status"]) {
            if (doc["status"][eachIndex] === "hit"){
                var indexOfHit = eachIndex;
                allHits.push(doc["coordinates"][[indexOfHit]]);
            }
        }
    }
    return allHits;
}

const getAllMiss = async (sessionId) => {

    const query = missedMoves.distinct("coordinates", {sessionId: sessionId});
    const missedCoordinates = await query;
    return missedCoordinates;
} 

exports.getGameStatus = async (req, res) => {

    const sessionId = req.headers["sessionid"];
    const allHits = await getAllHits(sessionId);
    const allMissed = await getAllMiss(sessionId);
    
    const data = {
        missed: allMissed,
        hits: allHits,
        gridX: constants.GRID_X,
        gridY: constants.GRID_Y
    }

    res
        .status(200)
        .json({
            data: data,
            "status": "success"
        });
}
