const Router = require('express')
const courseRouter = Router()
const {courseModel,purchaseModel} = require('../dataBase/db')
const userMiddleware = require("../middleware/userMiddleware")

courseRouter.post('/purchase',userMiddleware,async function(req,res){
    const userId = req.userId
    const courseId = req.body.courseId

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        msg:"course is purchased successfully"
    })
})
courseRouter.get('/preview',async function(req,res){
    const userId = req.userId

    const allCourses = await courseModel.find({})
    res.json({allCourses})
})

module.exports = {
    courseRouter:courseRouter
}