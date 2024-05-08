import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductContoller, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controller/productController.js";
import formidable from 'express-formidable'
const router=express.Router()
//routes
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
//get product
router.get("/get-products",getProductController)
//get single product
router.get("/get-product/:slug",getSingleProductContoller)
//get product photo
router.get("/get-product-photo/:pid",productPhotoController)
//update product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
//delete product
router.delete("/delete-product/:pid",deleteProductController)
//filter product
router.post('/product-filters',productFilterController)
//count
router.get('/product-count',productCountController)
//product per page
router.get('/product-list/:page',productListController);
//search route
router.get('/search/:keyword',searchProductController);
//similar products
router.get('/related-products/:pid/:cid',relatedProductController);
//category wise product
router.get('/product-category/:slug',productCategoryController)

export default router