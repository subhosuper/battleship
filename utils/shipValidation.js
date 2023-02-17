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

const getAllCoordinate = (startCoordinate, shipSize) => {
// calculate all coordinates of ship according to size in horizontal direction
    const coordinateX = startCoordinate[0];
    let allCoordinates = [];

    for (var i=0; i<shipSize; i++){
        allCoordinates.push([coordinateX + i, startCoordinate[1]]);
    }
    console.log("All coordinates: ", allCoordinates);
    return allCoordinates;
}

const validateCoordinates = (allCoordinates) => {
    for (eachCoordinate of allCoordinates){
        if (!(eachCoordinate[0] <= constants.GRID_X && eachCoordinate[1] <= constants.GRID_Y)){
            throw Error(`Coordinates does not lie inside the board, board size is ${constants.GRID_X}X${constants.GRID_Y}`)
        }    
    }
}

const checkOverlap = (coordinates) => {
 // check overlap
}

exports.shipDataValidations = (req, res, next) => {
    // ship validations
    const shipData = {...req.body};
    const shipType = Object.keys(shipData)[0];
    const shipTypeSize = constants.shipTypeCounts[[shipType]];
    const startCoordinates = Object.values(shipData)[0];

    const allCoordinates = getAllCoordinate(startCoordinates, shipTypeSize);
    try{
        validateCoordinates(allCoordinates);

        // pass through all validations then add all requests in request body
        req.body[[shipType]] = allCoordinates;
    } catch(err) {
        return res
            .status(400)
            .json({
                status: "fail",
                message:  err.message
            })
    }
    next();
}

exports.shipPlaceAvailable = async (req, res, next) => {
    const shipData = {...req.body};    
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
    next();
}
