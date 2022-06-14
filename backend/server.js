const app = require('./app')
const connect_DB = require('./config/database')
const dotenv = require('dotenv')
dotenv.config({path:'backend/config/config.env'})
//Connect With Databse
connect_DB()
//Unhandled Uncaught Exception
process.on("uncaughtException",(err)=>{

    console.log(`Error : ${err.message}`);
    console.log( `Server is Shutting Down Due to Uncaught Exception`);
    process.exit(1)
})

app.listen(3000,()=>{
console.log( `Server is working at http://localhost:${process.env.PORT}`);
})