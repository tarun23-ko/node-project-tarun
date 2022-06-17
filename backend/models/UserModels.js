const mongoose = require('mongoose')
const validator = require("validator")
const userScehema = new mongoose.schema({

    name:{
        type:String,
        required:[true, "Please Enter your name"]
    }
})