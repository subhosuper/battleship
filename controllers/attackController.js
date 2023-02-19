const missedMoves = require("../models/missedModel");
const Ship = require("../models/shipModel");
const attackValidations = require("../utils/attackValidation");
const utility = require("../utils/utils");
const {constants} = require("../utils/constants");


const updateMissMoves = async (req, attackCoordinates) => {

    // const query = missedMoves.create({sessionId: req.headers["sessionid"], coordinates:  [attackCoordinates]})
    const query = missedMoves.findOneAndUpdate(
            {sessionId: req.headers["sessionid"], coordinates:  [attackCoordinates]},
            {sessionId: req.headers["sessionid"], coordinates:  [attackCoordinates]},
            { upsert: true, new: true, setDefaultsOnInsert: true}
        )

    await query;
}

const isHitsAvailable = async (sessionId) => {
    const query = Ship.find({sessionId: sessionId, status: "none"}).count();
    const noneCount = await query;
    if (!noneCount)
        throw Error("You are already a winner. Keep it up champ!")
}

const isShip = async (req, attackCoordinates) => {
    let isSunk = false;
    const query = Ship.aggregate( [ {$match: {sessionId: req.headers["sessionid"]}},
    {
        $project: {
           index: { $indexOfArray: [ "$coordinates", attackCoordinates ] },
            status: 1,
            coordinates: 1,
            type: 1
        }},
        {"$unwind": "$index"},
        {"$match":{"index":{"$ne":-1}}}
    ]);

    
    var ships = await query;
    if (ships.length > 0)
    {
        ships = ships[0];
        const index = ships["index"];
        if (ships["status"][[index]] == "none"){
            const updateQuery = Ship.updateOne(
                {"sessionId": req.headers["sessionid"], "coordinates": attackCoordinates},
                {"$set": {"status.$": "hit"}}
            )
            await updateQuery;
        }
        else throw Error("The coordinate was already hit")
        
        const hitCount = utility.getCount("hit", ships["status"])
        if (hitCount+1 === ships["coordinates"].length)
            isSunk = true
        return {isShip: true, isSunk: isSunk, shipType: ships["type"]};
    }
    return {isShip: false, isSunk: isSunk, shipType: undefined};
}

const missedMovesCount = async (sessionId) => {
    const query = missedMoves.find({sessionId: sessionId}).count();
    const count = await query;
    return count;
}

exports.attackController =  async (req, res) => {
    try{
        //call validations 
        const attackCoordinates = {...req.body}["attackCoordinates"];
        attackValidations.validateCoordinate(attackCoordinates);
        await isHitsAvailable(req.headers["sessionid"]);
        const isHit = await isShip(req, attackCoordinates);
        if( !( isHit["isShip"] ) )
        {
            updateMissMoves(req, attackCoordinates);
            return res
                        .status(200)
                        .json({
                            status: "success",
                            message: "Miss"
                        })
        }
        if (isHit["isSunk"]){
            // TODO: add check for winner , TEST
            if ((await attackValidations.checkForWinner(req.headers["sessionid"]))){
                const missedMoves = await missedMovesCount(req.headers["sessionid"]);
                return res
                            .status(200)
                            .json({
                                status: "success",
                                message: `Win! You have completed the game in ${constants.TOTAL_UNITS_OF_ALL_SHIPS+missedMoves} moves`
                            })
                }
            return res
                .status(200)
                .json({
                    status: "success",
                    message: `You just sank a ${isHit["shipType"]}`
                });
        }

        res
            .status(200)
            .json({
                status: "success",
                message: "Hit"
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


