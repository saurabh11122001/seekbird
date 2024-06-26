const express=require("express");
const router=express.Router();
const ownerModel=require("../model/ownersmodel")
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const {generateToken} =require("../utils/generator")



//routes only execute while development 
if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
        let owner=await ownerModel.find();
        if (owner.length > 0){
             return res
                .status(504)
                .send("You dont have permission to create new owner");
        }
        try {
            let {fullname,email,password}=req.body;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) return res.send(err.message);
                    else {
                        let createdOwner=await ownerModel.create({
                            fullname,
                            email,
                            password:hash
                        })
                        res.redirect("/owners/admin")
                    }
                })
            })
        } catch (error) {
            console.log(error.message);
        }
    })      
}
//login route
router.post('/login',async function(req,res){
    try {
        let {email,password}=req.body;
        let admin=await ownerModel.findOne({email:email});
        if(!admin) return res.redirect("/");
        bcrypt.compare(password,admin.password,function(err,result){
            if(result){
                let token=generateToken(admin);
                res.cookie("adminToken",token);
                res.redirect("/admin");
            }
            else{
                res.redirect("/admin");
            }
        })
    } catch (error) {
        
    }
})
//logout route
router.get('/logout',function(req,res){
    res.cookie("adminToken","");
    res.redirect("/admin");
})



module.exports=router;