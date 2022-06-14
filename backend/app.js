const express = require('express')
const app=express()
const ErrorMiddleWare=require('./middleware/error')
app.use(express.json())
const product = require('./routes/productRoute')
app.use('/api/v1',product)
app.use(ErrorMiddleWare)
module.exports=app