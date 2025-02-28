const Router = require('express')
const courseRouter = Router()
const courseModel = require('../db')
courseRouter.post('/purchase',function(req,res){
    res.json({
        msg:"purchase endpoint"
    })
})
courseRouter.get('/preview',function(req,res){
    res.json({
        msg:"course preview endpoint"
    })
})

module.exports = {
    courseRouter:courseRouter
}