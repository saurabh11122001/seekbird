const mongoose=require('mongoose');

//created schema for owner model
const ownerSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin:String,
});

module.exports=mongoose.model("owner",ownerSchema);