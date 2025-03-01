const Router = require('express')
const adminRouter = Router()
const {adminModel} = require('../dataBase/db')
adminRouter.post('/signUp',function(req,res){
    res.json({
        msg:"signUp endpoint"
    })
})
adminRouter.post('/signIn',function(req,res){
    res.json({
        msg:"signIn endpoint"
    })
})
adminRouter.post('/',function(req,res){
    res.json({
        msg:"user purchase endpoint"
    })
})
adminRouter.put('/',function(req,res){
    res.json({
        msg:"user purchase endpoint"
    })
})
adminRouter.get('/bulk',function(req,res){
    res.json({
        msg:"user purchase endpoint"
    })
})

module.exports = {
    adminRouter:adminRouter
}