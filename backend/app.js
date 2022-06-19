const express = require('express')
const app=express()
const ErrorMiddleWare=require('./middleware/error')
app.use(express.json())
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
//Routes Imports Start Here---->

app.use('/api/v1',product)
app.use('/api/v1',user)

//Routes Imports End Here------>
app.use(ErrorMiddleWare)
module.exports=app