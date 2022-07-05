const ErrorHandleing = require('../utils/errorHandle')
const CatchAsyncError = require('../middleware/CatchAsyncErrors')
const User = require('../models/UserModels')
const { TokenExpiredError } = require('jsonwebtoken')
const sendTokens = require('../utils/JwtToken')
const sendmail = require('../utils/SendEmail.js')


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

//Logged out User
exports.logout = CatchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true

    })
    res.status(201).json({
        success:true,
        message:"Logged out"
    })
})

exports.forgetpassword = CatchAsyncError(async (req,res,next)=>{

    const userFetch= User.findOne({email:req.user.email})
    if (!userFetch) {
        
        return next(new ErrorHandleing("User Not found",404))
    }

    const resetToke= userFetch.getResetToken()
    await userFetch.save({validateBeforeSave:false})

    const resetpasswordUrl= `http://127.0.0.1:3000/api/v1/password/reset/${resetToke}`
    const message = `Your password Reset token : is :- ${resetpasswordUrl}` 

    try {
        await sendmail({
            email:user.email,
            subject :"Ecommerce Reset Password",
            message:message
        })
        res.status(200).json({
            success:true,
            message:`Eamil Has been sent Successfully to ${user.email}`
        })
        
    } catch (error) {
        
    }
})