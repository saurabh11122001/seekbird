const usermodel = require("../model/usermodel");
const {generateToken}=require("../utils/generator");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");

module.exports.registerUser=async function (req, res) {
    try {
        let { email, fullname, password } = req.body;
        let user=await usermodel.findOne({email:email});
        if(user) return res.status(401).send("You already have an account,please login");
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await usermodel.create({
                        email,
                        fullname,
                        password: hash
                    });
                    let token=generateToken(user);
                    res.cookie("token",token);
                    res.redirect("/shop")
                }
            })
        })

    } catch (error) {
        console.log(error.message);
    }
}
module.exports.loginUser=async function (req,res){
    try {
        let {email,password}=req.body;
        let user=await usermodel.findOne({email:email});
        if(!user){
            let err=req.flash("Email or Password Incorrect");
            res.render("index",{err});
        }
        bcrypt.compare(password, user.password,function (err,result){
            if(result){
                let token=generateToken(user);
                res.cookie("token",token);
                res.redirect("/shop");
            }
            else{
                res.send("Email or Password incorrect");
            }
    })
    } catch (error) {
        console.log(error.message);
    }

}
module.exports.logoutUser=async function (req, res){
    res.cookie("token","");
    res.redirect("/");
}