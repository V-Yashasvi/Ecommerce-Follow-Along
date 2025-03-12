const express= require('express')
const multer=require('multer')
const path=require('path');
const {productModel} = require('../model/product.model');
let productRouter=express.Router();

productRouter.get('/',async(req, res)=>{
    try {
        const products=await productModel.find()
        res.send({"message":"Successfully recieved the data from database", data:products})
    } catch (error) {
        res.send({"error message":error})
    }
});

productRouter.get('/:id',async(req, res)=>{
    const id=req.params.id
    try {
        const product=await productModel.findById(id)
        res.send({"message":"Successfully recieved the data from database", data:product})
    } catch (error) {
        res.send({"error message":error})
    }
})

productRouter.delete('/delete/:id', async(req, res)=>{
    const {id}=req.params
    try {
        deleted_product=await productModel.findByIdAndDelete(id)
        if (!deleted_product){
            return res.status(404).json({"message":"Product not found"})
        }
        res.status(200).json({"message":"Successfully deleted the product"})
    } catch (error) {
        res.status(500).json({"error":error.message})
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
        const imgPath = req.files.map((file) => `/uploads/${file.filename}`);
        const newProduct=new productModel({
            productName, 
            productDescription, 
            productPrice,
            productImage:imgPath
        })
        await newProduct.save();
        res.json({"message":"Hurray! Product added to the database successfully", "product":newProduct})
    } catch (error) {
        console.log(error)
        res.send({error})
    }
})
productRouter.put("/update/:id", upload.array("productImage", 12), async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productDescription, productPrice } = req.body;
        let product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        let imgPath = product.productImage
        if (req.files && req.files.length > 0) {
            imgPath = req.files.map((file) => `/uploads/${file.filename}`);
        }
        product.productName = productName || product.productName;
        product.productDescription = productDescription || product.productDescription;
        product.productPrice = productPrice || product.productPrice;
        product.productImage = imgPath;
        await product.save();
        res.json({ message: "Product updated successfully!", product });
    } catch (error) {
        console.log("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports={productRouter}