const jwt=require("jsonwebtoken");
const userModel=require("../model/usermodel");
const ownerModel=require("../model/ownersmodel");

module.exports.userMiddleware=async function (req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try {
        let decode=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user=await userModel.findOne({email:decode.email}).select("-password");
        req.user=user;
        next();
    } catch (error) {
        req.flash("error","something went wrong");
        res.redirect("/");
    }
}
module.exports.ownerMiddleware=async function (req,res,next){
    if(!req.cookies.adminToken){
        req.flash("error","you need to login first");
        return res.render("owner-login");
    }
    try {
        let decode=jwt.verify(req.cookies.adminToken,process.env.JWT_KEY);
        let admin=await ownerModel.findOne({email:decode.email}).select("-password");
        req.admin=admin;
        next();
    } catch (error) {
        req.flash("error","something went wrong");
        res.render("owner-login");
    }
}