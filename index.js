const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const {adminRouter} = require('./routes/admin')
const {userModel,adminModel,courseModel,purchaseModel} = require('./dataBase/db')
const cookieParser = require("cookie-parser");

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminRouter)

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log("connected to the database")
    app.listen(process.env.PORT)
}
main()