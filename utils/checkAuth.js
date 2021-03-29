const jwt = require("jsonwebtoken")
const { formatResult } = require("./import")

module.exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
        next();
    }catch(error) {
        return res.send(formatResult({message: "Auth failed", status: 401}))
    }
}

module.exports.superAdmin = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}