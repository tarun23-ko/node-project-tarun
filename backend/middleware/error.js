const ErrorHandler = require('../utils/errorHandle')

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500
    err.message=err.message||"Internal Server Error"
    if(err.name === "CastError"){
        const message=`Resource Not Found ${err.path}`
        err=new ErrorHandler(message)
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.stack,
        message:err.message
    })
}