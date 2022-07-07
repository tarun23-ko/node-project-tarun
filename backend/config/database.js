const mongoose = require('mongoose')
const ConnectDatabse=()=>{
mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce",

{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
    
}).then((data) => {

    console.log("Database Conneted")
}).catch((err) => {
    console.log(err)
});
} 
module.exports=ConnectDatabse;  