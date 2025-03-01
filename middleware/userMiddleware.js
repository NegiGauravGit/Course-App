const jwt = require('jsonwebtoken')
function auth(req,res,next){
    const token = req.cookies.token

    if(token){
        jwt.verify(token,process.env.JWT_USER_SECRET,function(err,decoded){
            if(err){
                res.status(401).json({
                    msg:"Unauthorized"
                })
            }else{
                req.Id = decoded.Id
                next()
            }
        })
    }else{
        res.status(401).json({
            msg:"Unauthorized"
        })
    }
}
module.exports = {
    auth
}