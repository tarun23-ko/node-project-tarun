const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'backend/config/config.env'})
app.listen(3000,()=>{
console.log( `Server is working at http://localhost:${process.env.PORT}`);
})