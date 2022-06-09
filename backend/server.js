const app = require('./app')
const connect_DB = require('./config/database')
const dotenv = require('dotenv')
dotenv.config({path:'backend/config/config.env'})
//Connect With Databse
connect_DB()
app.listen(3000,()=>{
console.log( `Server is working at http://localhost:${process.env.PORT}`);
})