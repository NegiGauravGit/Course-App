require('dotenv').config();
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
console.log("connected to")

mongoose.connect(process.env.DB_CONNECTION_STRING)
const UserSchema = new Schema({
    email: {type:String , unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const AdminSchema = new Schema({
    email: {type:String , unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const CourseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
})

const PurchasesSchema = new Schema({
    courseId:ObjectId,
    userId:ObjectId
})

const userModel = mongoose.model('users',UserSchema)
const adminModel = mongoose.model('admin',AdminSchema)
const courseModel = mongoose.model('courses',CourseSchema)
const purchaseModel = mongoose.model('purchases',PurchasesSchema)

module.exports = {
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}