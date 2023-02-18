const {constants} = require("../utils/constants");
const {getSession} = require("../controllers/sessionController");

const {countHits} = require("../controllers/placeShipController");

const validateCoordinate = async (coordinates) => {
    if (!(coordinates[0] <= constants.GRID_X && coordinates[1] <= constants.GRID_Y))
        throw Error(`Coordinates does not lie inside the board, board size is ${constants.GRID_X}X${constants.GRID_Y}`)        
}

const validateAttack = async (req, res, next) => {
    const session = await getSession(req.headers["sessionid"]);
    if (!session["isSetupDone"])
    {   
        return res
                  .status(412)
                  .json({
                        status: "fail",
                        message: "Please let the defender setup all their ships before attack"
                  });
    }
    next();
}

const checkForWinner = async (sessionId) => {
    const hitCount = await countHits(sessionId);
    if(hitCount.length && (hitCount[0]["hitCount"] === constants.TOTAL_UNITS_OF_ALL_SHIPS))
        return true;
    return false;
}

module.exports = {validateCoordinate, validateAttack, checkForWinner};
