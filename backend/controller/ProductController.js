const Product=require('../models/productModel')
const ErrorHandleing = require('../utils/errorHandle')
const CatchAsyncError = require('../middleware/CatchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')


//create product

exports.createProduct=CatchAsyncError(async(req,res,next)=>{

    req.body.user = req.user.id
    console.log(req.body)
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})
//Fetch All product
exports.getAllProducts=CatchAsyncError(async (req,res)=>{
    const resultPage=10
    const productCount = await Product.countDocuments()
   const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPage)
   console.log( apiFeatures.query);
       const product=await apiFeatures.query
    res.status(200).json({
        success:true,
        product,
        productCount
    })
});
//Update Product   
    exports.ProductsUpdate =CatchAsyncError( async (req,res,next)=>{
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
    });

//Fetch Products
    exports.ProductDetails = CatchAsyncError(async (req,res,next)=>{
        let prodId=req.params.id
        let product=await Product.findById(prodId)
        if(!product){
            return next(new ErrorHandleing("Product Not Found",404))
        }

         res.status(200).json({
            success:true,
            product
        })
    })

//Delete Product
    exports.DeleteProduct =CatchAsyncError( async (req,res,next)=>{
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
    });
