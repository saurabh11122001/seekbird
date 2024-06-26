const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser}=require("../controllers/authController");


//register route
router.post("/register",registerUser)
//login route
router.post("/login",loginUser);
//logout route
router.get("/logout",logoutUser);
module.exports = router;