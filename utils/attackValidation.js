const {constants} = require("../utils/constants");

const validateCoordinate = async (coordinates) => {
    if (!(coordinates[0] <= constants.GRID_X && coordinates[1] <= constants.GRID_Y))
        throw Error(`Coordinates does not lie inside the board, board size is ${constants.GRID_X}X${constants.GRID_Y}`)        
}

module.exports = {validateCoordinate};