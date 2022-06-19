const mongoose = require('mongoose')
const validator = require("validator")
const bcryptjs = require('bcrypt')
const jwt = require("jsonwebtoken")
const CatchAsyncErrors = require('../middleware/CatchAsyncErrors')
const userScehema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter your name"],
        maxLength:[30,"Cannot exceed 30 digits"],
        minLength:[4,"Name atleast have 4 digits"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Enter Valid Email Address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        maxLength:[8,"Password not exceed 8 characters"],
        minLength:[6,"Password Have atleast 6 Characters"],
        select:false
    },
    avtar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userScehema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await  bcryptjs.hash (this.password,10)
})


//JWT TOken
userScehema.methods.getWebToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })

}

userScehema.methods.comparePassword = async function(enteredPassword){
    return bcryptjs.compare(enteredPassword,this.password)

}



module.exports = mongoose.model("User",userScehema)