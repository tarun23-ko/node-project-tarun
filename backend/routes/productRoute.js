const express = require('express')
const {getAllProducts,createProduct,ProductsUpdate, DeleteProduct, ProductDetails}=require('../controller/ProductController')
const router=express.Router()
router.route('/products').get(getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/update/:id').put(ProductsUpdate).delete(DeleteProduct).get(ProductDetails)
module.exports=router