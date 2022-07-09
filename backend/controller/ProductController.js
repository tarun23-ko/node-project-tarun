const Product=require('../models/productModel')
const ErrorHandleing = require('../utils/errorHandle')
const CatchAsyncError = require('../middleware/CatchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')
const CatchAsyncErrors = require('../middleware/CatchAsyncErrors')


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


    //User create and Update Review
    exports.CreateUpdateProductReview = CatchAsyncErrors(async(req,res,next)=>{
        const {rating,comment,productid}=req.body
        const Review={
            user:req.user.id,
            name:req.user.name,
            rating:Number(rating),
            comment

        }

        const product = await Product.findById(productid)
        const isReviewd = await product.reviews.find((rev)=>rev.user.id.toString() === req.user._id.toString())
        if (isReviewd) {
        product.reviews.forEach(element => {
            if (element.user.toString() === req.user._id.toString()) {
                element.rating = rating
                element.comment = comment
            }
            
        });
            
        }else{
            product.reviews.push(Review)
            product.numofReviews = product.reviews.length
        }

        let avg = 0 ;
      product.reviews.forEach(rev => {
            avg+=rev.ratings
        })
        
        product.ratings = avg/product.reviews.length

        await product.save({validateBeforeSave:false})
        res.status(200).json({
            success:true
        })
    })

    //Get product reviews
