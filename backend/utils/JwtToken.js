const sendTokens = (user,statusCode,res)=>{

    const token = user.getWebToken()

    //options for cookie
    options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRES *24*60*60*1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendTokens