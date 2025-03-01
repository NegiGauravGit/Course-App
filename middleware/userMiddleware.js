const jwt = require('jsonwebtoken')
function userAuth(req,res,next){
    const token = req.cookies?.token

    if(!token){
        return res.status(401).json({ msg: "No token provided. Unauthorized" });
    }
    jwt.verify(token,process.env.JWT_USER_SECRET,function(err,decoded){
        if(err){
            return res.status(403).json({ msg: "Invalid or expired token. Access denied" });
        }
        req.userId = decoded.id
        next()
    })
}
module.exports = {
    userAuth:userAuth
}