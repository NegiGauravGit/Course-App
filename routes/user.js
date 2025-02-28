const {Router} = require('express')
const userRouter = Router()
const userModel = require('../db')
userRouter.post('/signUp',function(req,res){
    res.json({
        msg:"signUp endpoint"
    })
})
userRouter.post('/signIn',function(req,res){
    res.json({
        msg:"signIn endpoint"
    })
})
userRouter.get('/purchases',function(req,res){
    res.json({
        msg:"user purchase endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}