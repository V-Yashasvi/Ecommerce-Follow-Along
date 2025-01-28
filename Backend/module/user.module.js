const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        min: 8,
        max: 16
    }


})
const UserModel=mongoose.model("usercollection",userSchema)
module.exports={
    UserModel
}