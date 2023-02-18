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

exports.setupDone = async (sessionId) => {
    const query = Session.updateOne({sessionId: sessionId}, {"$set": {"isSetupDone": true}})

    const session = await query;
    console.log(session);
}

exports.getSession = async (sessionId) => {
    const query = Session.find({sessionId: sessionId});
    const session = await query;
    return session;
}
