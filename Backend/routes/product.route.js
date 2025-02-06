const express= require('express')
const multer=require('multer')
const path=require('path');
const { productModel } = require('../module/product.module');
let productRouter=express.Router();


productRouter.get('/',async(req, res)=>{
    try {
        const products=await productModel.find()
        res.send({"message":"Successfully recieved the data from database", data:products})
    } catch (error) {
        res.send({"error message":error})
    }
})
productRouter.get('/:id',async(req, res)=>{
    const id=req.params.id
    try {
        const product=await productModel.findById(id)
        res.send({"message":"Successfully recieved the data from database", data:product})
    } catch (error) {
        res.send({"error message":error})
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+ path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

productRouter.post('/create',upload.array('productImage', 12),async(req, res)=>{
    try {
        const { productName, productDescription, productPrice } = req.body;
        const imgPath=req.files.map((file)=>{
            return(`/uploads/${file.filename}`)
        })
        const newProduct=new productModel({
            productName, 
            productDescription, 
            productPrice,
            productImages:imgPath
        })

        await newProduct.save();
        res.json({"message":"Hurray! Product added to the database successfully", "product":newProduct})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
})

module.exports={productRouter}