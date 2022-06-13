const Product=require('../models/productModel')

//create product

exports.createProduct=async(req,res,next)=>{
console.log(req.body)
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}
//Fetch All product
exports.getAllProducts=async (req,res)=>{
       const product=await Product.find()
    res.status(200).json({
        success:true,
        product
    })
}
//Update Product   
    exports.ProductsUpdate = async (req,res,next)=>{
        let prodId=req.params.id
        let product=await Product.findById(prodId)
        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product Not Found"
            })
        }
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:true
        })

         res.status(200).json({
            success:true,
            product
        })
    }

//Fetch Products
    exports.ProductDetails = async (req,res,next)=>{
        let prodId=req.params.id
        let product=await Product.findById(prodId)
        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product Not Found"
            })
        }

         res.status(200).json({
            success:true,
            product
        })
    }

//Delete Product
    exports.DeleteProduct = async (req,res,next)=>{
        let prodId=req.params.id
        let product=await Product.findById(prodId)
        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product Not Found"
            })
        }
        product.remove()

         res.status(200).json({
            success:true,
            product
        })
    }

