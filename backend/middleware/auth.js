const ErrorHandleing = require("../utils/errorHandle");
const CatchAsyncErrors = require("./CatchAsyncErrors");
const jwt = require('jsonwebtoken');
const UserModels = require("../models/UserModels");

exports.isAuthenticated = CatchAsyncErrors(async(req,res,next)=>{
  const {token} = req.cookies
 if(!token){
    return next(new ErrorHandleing("Please Login First to access this resource"))

 }
 const decodeData=jwt.verify(token,process.env.JWT_SECRET)
 req.user = await UserModels.findById(decodeData.id)
 next()
})
exports.authorizedRoles = (role)=>{
    return (req,res,next)=>{
         console.log(req.user.role );
        if (!(req.user.role === "admin")) {
             console.log("HEY")
            return new ErrorHandleing ("You have no permission to Access this feature",403)
        }
        next()
    } 

}