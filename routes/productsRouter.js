const express=require("express");
const router=express.Router();
const upload=require('../config/multer-config');
const productModel=require("../model/productmodel")
const userModel=require("../model/usermodel")
const {userMiddleware, ownerMiddleware}=require("../middleware/isLoggedIn");

router.post("/create",upload.single("image"),async(req,res)=>{
    try {
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
        let product=await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            panelcolor,
            textcolor,
            bgcolor
        })
        req.flash("success","Product Created Successfully");
        res.redirect("/admin")
    } catch (error) {
        console.log(error.message)
    }
})

//add to cart
router.get("/addtocart/:id",userMiddleware,async function(req,res){
    try {
        let {email}=req.user;
        let product=await productModel.findOne({_id:req.params.id});
        let user= await userModel.findOne({email:email});
        if(user.cart.includes(product._id)) {
            req.flash("added","Product Already Added");
            res.redirect("/shop");
        }
        else{
            user.cart.push(product._id);
            await user.save();
            req.flash("added","Product Added");
            res.redirect("/shop");
        }
    } catch (error) {
        console.log(error.message);
    }
})

//delete product route

router.get("/deleteproduct/:id",ownerMiddleware,async function (req,res) {
    try {
        let delProduct=await productModel.deleteOne({_id:req.params.id});
        req.flash("added","Product Deleted");
        res.redirect("/admin");
    } catch (error) {
        console.log(error.message);
    }
})




module.exports=router;