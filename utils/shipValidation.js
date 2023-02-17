const {constants} = require("../utils/constants");
const Ship = require("../models/shipModel");

const checkShipTypeCount = async (shipType, sessionId) => {
    const query = Ship.find({
        sessionId: sessionId,
        type: shipType,
    }).countDocuments();

    const shipsCount = await query;
    return shipsCount;
}

// const getAllCoordinates = (req) => {
        
// }

exports.shipPlaceAvailable = async (req, res, next) => {
    const shipData = req.body;    
    console.log("TESTING: ", constants.shipTypeCounts);
    for (shipType in shipData){
        if (shipType in constants.shipTypeCounts){
            shipsCount = await checkShipTypeCount(shipType, req.headers["sessionid"]);
            if (shipsCount === constants.shipTypeCounts[[shipType]]) {
                return res
                            .status(400)
                            .json({
                                status: "fail",
                                message: `All ${shipType}s have been placed already`
                            })
            }
        }
    }

    // getAllCoordinates(req);

    next();
}
