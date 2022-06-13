const mongoose = require('mongoose')

const productSchema=new mongoose.Schema({
    name:{

        type:String,
        required:[true,"Enter Product name"],
        trim:true
    },
    description:{

        type:String,
        required:[true,"Enter Product description"]
    },
    price:{
        type:Number,
        required:[true,"Enter Product Price"],
        maxlength:[8,"price Cannot Exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please Enter Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxlength:[4,"Stock Cannot exceed 4 digit"],
        default:1


    },
    numofReviews:{
        type:Number,
        default:0


    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }


})
module.exports=mongoose.model("product",productSchema)