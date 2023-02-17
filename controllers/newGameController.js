const Session = require("../models/sessionModel");

exports.createNewSession = async (req, res) => {
    const sessionId = (Math.random().toString(35).slice(2).substring(0,6)+Math.random().toString(35).slice(2).substring(0,6)).toUpperCase();
    
    const data = {"sessionId": sessionId};
    const newGame = await Session.create(data);
    
    res
       .status(201)
       .json({
        "sessionId": newGame["sessionId"],
        "status": "success"
       })
}
