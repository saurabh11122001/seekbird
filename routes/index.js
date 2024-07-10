const express=require("express");
const router=express.Router();
const {userMiddleware,ownerMiddleware}=require("../middleware/isLoggedIn");
const productModel=require("../model/productmodel")
const userModel=require("../model/usermodel")


router.get("/",(req,res)=>{
    let err=req.flash("error");
    res.render("index",{err});
})

router.get("/shop",userMiddleware,async function(req,res){
    let products=await productModel.find();
    let added=req.flash("added")
    res.render("shop",{products,added})
})
router.get("/admin",ownerMiddleware,async(req,res)=>{
    let products=await productModel.find();
    let success=req.flash("success");
    res.render("admin",{success,products});
})
router.get("/createproducts",ownerMiddleware,(req,res)=>{
    let success=req.flash("success");
    res.render("createproducts",{success});
})
router.get("/cart",userMiddleware,async function(req,res){
    let items=await userModel.findOne({email:req.user.email}).populate("cart")
    res.render("cart",{items})
})

module.exports=router;