const mongoose=require('mongoose');
const config=require("config");
const dbgr=require("debug")("development:mongoose");


//creating connection with mongoose
mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports=mongoose.connection;