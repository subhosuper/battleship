const store = require('../store/storeObj');
const {gameState, ground} = require("../utils/constants");

exports.getGameStatus = (req, res) => {
    // const resp = store.getGameState();
    console.log(gameState)
    res
        .status(200)
        .json({
            "data": ground,
            "status": "successss"
        });
}
