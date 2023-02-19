const {constants} = require("../utils/constants");
const {checkShipTypeCount ,allShipsOnboard} = require("../controllers/placeShipController");
const {setupDone} = require("..//controllers/sessionController");

const getAllCoordinates = (startCoordinate, shipSize, direction="vertical") => {
// calculate all coordinates of ship according to size in vertical direction
    let variableCoordinate;
    
    if (direction === "vertical") {
        variableCoordinate = startCoordinate[0];
    } else {
        variableCoordinate = startCoordinate[1];
    }
    let allCoordinates = [];

    for (var i=0; i<shipSize; i++){
        if (direction === "vertical") {
            allCoordinates.push([variableCoordinate + i, startCoordinate[1]]);
        } else {
            allCoordinates.push([startCoordinate[0], variableCoordinate + i]);
        }
    }
    console.log("All coordinates: ", allCoordinates);
    return allCoordinates;
}

const validateCoordinates = (allCoordinates, throwError=true) => {
    for (eachCoordinate of allCoordinates){
        if (!(eachCoordinate[0] <= constants.GRID_X && eachCoordinate[1] <= constants.GRID_Y)){
            if (throwError)
                throw Error(`Coordinates does not lie inside the board, board size is ${constants.GRID_X}X${constants.GRID_Y}`)
            else
                return false
        }    
    }
    return true
}

const checkOverlap = (shipsPlaced, coordinates) => {
    // check overlap
    shipsPlaced.map(dbVal => {
        coordinates.map(inputVal => {
            if (JSON.stringify(dbVal) == JSON.stringify(inputVal)) {
                throw Error("Coordinates overlap with other ships present on the board")
            }
        })
    });
}

const checkBoundaryOverlap = (shipsPlaced, coordinates, direction="vertical") => {
    const err = Error("Coordinates shouldn't overlap on the top, bottom, and both sides of any ship present on the board");
    
    let startCoordinate, endCoordinate;
    
    if (direction === "vertical"){
        startCoordinate = [coordinates[0][0]-1, coordinates[0][1]] // Gets the top boundary
        endCoordinate = [coordinates[coordinates.length - 1][0]+1, coordinates[coordinates.length - 1][1]] // Gets the bottom boundary
    } else {
        startCoordinate = [coordinates[0][0], coordinates[0][1]-1] // Gets the left side start boundary
        endCoordinate = [coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]+1] // Gets the bottom boundary
    }

    if (!shipsPlaced.length)
        return {}
    
    shipsPlaced.map(dbVal => {
        coordinates.map(inputVal => {

            if (direction === "vertical"){
                var rightCoordinate = [inputVal[0], inputVal[1]+1];
                var leftCoordinate = [inputVal[0], inputVal[1]-1];
            } else {
                var rightCoordinate = [inputVal[0]+1, inputVal[1]];
                var leftCoordinate = [inputVal[0]-1, inputVal[1]];
            }

            if (JSON.stringify(dbVal) === JSON.stringify(rightCoordinate)) throw err;
            if (JSON.stringify(dbVal) === JSON.stringify(leftCoordinate)) throw err;
            if (JSON.stringify(dbVal) === JSON.stringify(startCoordinate)) throw err;
            if (JSON.stringify(dbVal) === JSON.stringify(endCoordinate)) throw err;
        });
    })
}

exports.shipDataValidations = async (req, res, next) => {
    // ship validations
    const sessionId = req.headers["sessionid"];
    const shipsPlaced = await allShipsOnboard(sessionId);
    const shipData = {...req.body};
    // const shipType = Object.keys(shipData)[0];
    const shipType = shipData["type"];

    const shipTypeSize = constants.SHIP_SIZE[[shipType]];
    // const startCoordinates = Object.values(shipData)[0];
    const startCoordinates = shipData["coordinates"];
    
    const allCoordinates = getAllCoordinates(startCoordinates, shipTypeSize, shipData["direction"]);
    try{
        validateCoordinates(allCoordinates);
        checkOverlap(shipsPlaced, allCoordinates);
        checkBoundaryOverlap(shipsPlaced, allCoordinates, shipData["direction"]);

        // pass through all validations then add all requests in request body
        req.body["coordinates"] = allCoordinates;
    } catch(err) {
        return res
            .status(400)
            .json({
                status: "fail",
                message:  err.message
            })
    }

    // TODO: setupDOne update, TEST this criteria - TESTED OK
    if ((shipsPlaced.length + allCoordinates.length) == constants.TOTAL_UNITS_OF_ALL_SHIPS)
        await setupDone(sessionId);
    next();
}

exports.shipPlaceAvailable = async (req, res, next) => {
    const shipData = {...req.body};    
    // for (shipType in shipData){
    //     if (shipType in constants.shipTypeCounts){
    //         shipsCount = await checkShipTypeCount(shipType, req.headers["sessionid"]);
    //         if (shipsCount === constants.shipTypeCounts[[shipType]]) {
    //             return res
    //                         .status(400)
    //                         .json({
    //                             status: "fail",
    //                             message: `All ${shipType}s have been placed already`
    //                         })
    //         }
    //     }
    // }    
    const shipType = shipData["type"];
    if (shipType in constants.shipTypeCounts){
        const shipsCount = await checkShipTypeCount(shipType, req.headers["sessionid"]);
        if (shipsCount === constants.shipTypeCounts[[shipType]]) {
            return res
                        .status(400)
                        .json({
                            status: "fail",
                            message: `All ${shipType}s have been placed already`
                        })
        }
    }

    next();
}
