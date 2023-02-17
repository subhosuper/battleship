const {constants} = require("../utils/constants");
// const Ship = require("../models/shipModel");
const {checkShipTypeCount ,allShipsOnboard} = require("../controllers/placeShipController");

const getAllCoordinates = (startCoordinate, shipSize) => {
// calculate all coordinates of ship according to size in horizontal direction
    const coordinateX = startCoordinate[0];
    let allCoordinates = [];

    for (var i=0; i<shipSize; i++){
        allCoordinates.push([coordinateX + i, startCoordinate[1]]);
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

const checkBoundaryOverlap = (shipsPlaced, coordinates) => {
    const err = Error("Coordinates shouldn't overlap on the top, bottom, and both sides of any ship present on the board");
    const startCoordinate = [coordinates[0][0]-1, coordinates[0][1]] // Gets the top boundary
    const endCoordinate = [coordinates[coordinates.length - 1][0]+1, coordinates[coordinates.length - 1][1]] // Gets the bottom boundary

    if (!shipsPlaced.length)
        return {}
    
    shipsPlaced.map(dbVal => {
        coordinates.map(inputVal => {
            var rightCoordinate = [inputVal[0], inputVal[1]+1];
            var leftCoordinate = [inputVal[0], inputVal[1]-1];
            if (JSON.stringify(dbVal) === JSON.stringify(rightCoordinate)) throw err;
            if (JSON.stringify(dbVal) === JSON.stringify(leftCoordinate)) throw err;
            if (JSON.stringify(dbVal) === JSON.stringify(startCoordinate)) throw err;
            if (JSON.stringify(dbVal) === JSON.stringify(endCoordinate)) throw err;
        });
    })
}

exports.shipDataValidations = async (req, res, next) => {
    // ship validations
    const shipsPlaced = await allShipsOnboard(req.headers["sessionid"]);
    const shipData = {...req.body};
    const shipType = Object.keys(shipData)[0];
    const shipTypeSize = constants.shipTypeCounts[[shipType]];
    const startCoordinates = Object.values(shipData)[0];
    
    const allCoordinates = getAllCoordinates(startCoordinates, shipTypeSize);
    try{
        validateCoordinates(allCoordinates);
        checkOverlap(shipsPlaced, allCoordinates);
        checkBoundaryOverlap(shipsPlaced, allCoordinates);

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
