const Ship = require("../models/shipModel");

exports.newShip = async (req, res) => {

    const data = {...req.body};
    const query = Ship.create({
        sessionId: req.headers["sessionid"],
        type: Object.keys(data)[0],
        coordinates: Object.values(data)[0]
    });
    const ship = await query;

    res
        .status(200)
        .json({
            status: "success",
            message: "Ships have been placed",
            ship: ship
        })
}

exports.checkShipTypeCount = async (shipType, sessionId) => {
    const query = Ship.find({
        sessionId: sessionId,
        type: shipType,
    }).countDocuments();

    const shipsCount = await query;
    return shipsCount;
}

exports.allShipsOnboard = async (sessionId) => {
    const query = Ship.distinct("coordinates", {sessionId: sessionId});

    const ships = await query;
    return ships;
}