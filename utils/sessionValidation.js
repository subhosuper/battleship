const {getSession} = require("../controllers/sessionController");

exports.sessionValidation = async (req, res, next) => {

    const headers = {...req.headers}
    if (!("sessionid" in headers)) {
        return res
                .status(400)
                .json({
                    status: "fail",
                    message: "Valid session id should be present in headers inside key: sessionid"
                });
    }

    const session = await getSession(headers["sessionid"]);
    if (!session){
        return res
                .status(400)
                .json({
                    status: "fail",
                    message: "Session id should be present in headers inside key: sessionid"
                });
    }
    
    next();

    
}
