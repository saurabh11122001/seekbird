const express=require('express');
const app=express();
//cookie parser 
const cookieParser=require("cookie-parser");
const expressSession=require("express-session");
const flash=require("connect-flash")
require("dotenv").config();
const path=require("path");
const db=require("./config/mongoose-connection");
const ownersRouter=require("./routes/ownersRouter");
const usersRouter=require("./routes/usersRouter");
const productsRouter=require("./routes/productsRouter");
const index=require("./routes/index")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET
    })
);
app.use(flash());

//setting up ejs
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

// setting up routes files
app.use("/",index);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);


//listening at port 3000
app.listen(3000);