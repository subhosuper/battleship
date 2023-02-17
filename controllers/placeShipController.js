const Ship = require("../models/shipModel");

exports.newShip = async (req, res) => {

    console.log("From controller ", req.headers)

    const data = {...req.body};
    const query = Ship.create({
        sessionId: req.headers["sessionid"],
        type: Object.keys(data)[0],
        coordinates: [Object.values(data)[0]]
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

