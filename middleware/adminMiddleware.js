const jwt = require('jsonwebtoken')
function adminAuth(req,res,next){
    const token = req.cookies.token

    if(token){
        jwt.verify(token,process.env.JWT_ADMIN_SECRET,function(err,decoded){
            if(err){
                res.status(401).json({
                    msg:"Unauthorized"
                })
            }else{
                req.adminId = decoded.id
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
    adminAuth:adminAuth
}