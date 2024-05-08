import express from "express";
import {registerController,loginController,testController,forgotPasswordController} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router =express.Router();
//routing
//register,method=post
router.post('/register',registerController);
//LOGIN
router.post('/login',loginController);
//forgot password,mrthod=post
router.post('/forgot-password',forgotPasswordController)

//test routr
router.get('/test',requireSignIn,isAdmin,testController);
//procted  user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
//procted  admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});
export default router;