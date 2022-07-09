const ErrorHandleing = require('../utils/errorHandle')
const CatchAsyncError = require('../middleware/CatchAsyncErrors')
const User = require('../models/UserModels')
const { TokenExpiredError } = require('jsonwebtoken')
const sendTokens = require('../utils/JwtToken')
const sendmail = require('../utils/SendEmail.js')
const crypto = require("crypto")
const { findById } = require('../models/UserModels')


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

    const user= await User.findOne({email:req.body.email})
    if (!user) {
        
        return next(new ErrorHandleing("User Not found",404))
    }
    //console.log(userFetch)  
    const resetToke= user.getResetToken()
    console.log(resetToke);
    await user.save({validateBeforeSave:false})

    const resetpasswordUrl= `http://127.0.0.1:3000/api/v1/password/reset/${resetToke}`
    const message = `Your password Reset token : is :- ${resetpasswordUrl}` 
       console.log(user.email);
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
        // console.log(error);
        res.send(error)
    }
})

//Reset Passowrd
exports.resetpassword = CatchAsyncError(async (req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if (!user) {
        
        return next(new ErrorHandleing("Reset password token Has been expired or Invalid",404))
    }

    if (req.body.password!==req.body.confirmpassword) {
        return next(new ErrorHandleing("Password Does not Matched",404))
    }

    user.password = req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined

    await user.save()
    sendTokens(user,200,res)

})


//Get user Details

exports.getUserDetails=CatchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,user
    })
})

//Update user Profile

exports.UpdateUserProfile=CatchAsyncError(async(req,res,next)=>{
    const UpdatedData={
        email:req.body.email,
        name:req.body.name
    }
    //We will Add cloudnary Later
    const user = await User.findByIdAndUpdate(req.user.id,UpdatedData,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({
        success:true
    })
})

//get All User Admin
exports.getAlluser=CatchAsyncError(async(req,res,next)=>{

    const user =await User.find()

    res.status(200).json({
        user
    })
})

//Role Update User ->BAKI Ache only for admin
//User Delete->Baki ache only for Admin