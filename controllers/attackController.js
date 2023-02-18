const missedMoves = require("../models/missedModel");
const Ship = require("../models/shipModel");
const attackValidations = require("../utils/attackValidation");
const utility = require("../utils/utils");
var ObjectId = require('mongoose').Types.ObjectId;

const updateMissMoves = async (req, attackCoordinates) => {
    const query = missedMoves.create({sessionId: req.headers["sessionid"], coordinates: attackCoordinates})
    await query;
}

const isHitsAvailable = async () => {
    const query = Ship.find({status: "none"}).count();
    const noneCount = await query;
    if (!noneCount)
        throw Error("You are already a winner. Keep it up champ!")
}

const isShip = async (req, attackCoordinates) => {
    const query = Ship.findOne({coordinates: attackCoordinates});
    const ships = await query;
    if (ships)
    {   
        const query = Ship.updateOne(
                {"sessionId": req.headers["sessionid"], "coordinates": attackCoordinates},
                {"$set": {"status.$": "hit"}}
            )   
        const update = await query;
        return true;
    }
    return false;
}

const checkInMissedMoves = (attackCoordinates) => {
    // const query = missedMoves.
}

exports.attackController =  async (req, res, next) => {
    try{
        //call validations 
        const attackCoordinates = {...req.body}["attackCoordinates"];
        attackValidations.validateCoordinate(attackCoordinates);
        isHitsAvailable();
        if(!isShip(req, attackCoordinates)) updateMissMoves(req, attackCoordinates);

        // checkInMissedMoves(attackCoordinates);
        
        res
            .status(200)
            .json({
                status: "fail",
                message: "dferf"
            })
    } catch(err) {
        res
            .status(400)
            .json({
                status: "fail",
                message: err.message
            })
    }
}


