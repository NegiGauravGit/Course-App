const Router = require('express')
const courseRouter = Router()
const {courseModel,purchaseModel} = require('../dataBase/db')
const {userAuth} = require("../middleware/userMiddleware")

courseRouter.post('/purchase',userAuth,async function(req,res){
    const userId = req.userId
    const courseId = req.body.courseId

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        msg:"you have successfully bought the course"
    })
})
courseRouter.get('/preview',async function(req,res){

    const allCourses = await courseModel.find({})
    res.json({allCourses})
})

module.exports = {
    courseRouter:courseRouter
}