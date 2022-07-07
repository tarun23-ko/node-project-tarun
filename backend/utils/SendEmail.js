const nodemailer = require('nodemailer')

const sendEmail= async(options)=>{
    const transproter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"bubaiadh@gmail.com",
            password:"Bubai@7891"
        },
 

    });
    const mailOptions={
        from:"bubaiadh@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }  
   
    await transproter.sendMail(mailOptions)
} 

module.exports =sendEmail