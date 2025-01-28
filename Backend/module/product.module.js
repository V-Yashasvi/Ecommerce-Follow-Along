const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true,
        min: 50,
    },
    productPrice:{
        type:String,
        required: true
    },
    productImage:{
        type:[String],
        required: true
    }
})

const productModel=mongoose.model("productCollection", productSchema)

module.exports={
    productModel
}