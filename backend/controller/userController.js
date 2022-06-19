const ErrorHandleing = require('../utils/errorHandle')
const CatchAsyncError = require('../middleware/CatchAsyncErrors')
const User = require('../models/UserModels')
const { TokenExpiredError } = require('jsonwebtoken')
const sendTokens = require('../utils/JwtToken')


//Register User FUnction

exports.registerUser=CatchAsyncError(async(req,res,next)=>{

    const {name,email,password}=req.body

    const user = await User.create({
        name,email,password,
        avtar:{
            public_id:"This is ID of public",
            url:"This is URL",
        },
    });
    sendTokens(user,201,res)
})

exports.loginUSer=CatchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        return next(new ErrorHandleing("Please Enter Password & Email"))
    }
    const user= await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandleing("Invalid user"))
    }
    const iSpasswordmatch = user.comparePassword(password)

    if(!iSpasswordmatch){
        return next(new ErrorHandleing("Invalid user",401))
    }

    sendTokens(user,200,res)
})