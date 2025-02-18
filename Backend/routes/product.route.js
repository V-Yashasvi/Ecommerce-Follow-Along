const express= require('express')
const multer=require('multer')
const path=require('path');
const {UserModel}=require('../module/user.module')
const {productModel} = require('../module/product.module');
const {CartModel}=require('../module/cart.module')
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

productRouter.post('/cart/add', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const user = await UserModel.findById(userId);
        const product = await productModel.findById(productId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const productPrice = parseFloat(product.productPrice);
        const totalPrice = productPrice * quantity;
        let cartItem = await CartModel.findOne({ user: userId, product: productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalPrice += totalPrice;
        } else {
            cartItem = new CartModel({
                user: userId,
                product: productId,
                quantity,
                totalPrice
            });
            user.cart.push(cartItem._id);
        }
        await cartItem.save();
        await user.save();
        res.status(200).json({ message: "Product added to cart", cart: cartItem });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

productRouter.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'product',
                model: 'productCollection'
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Cart items fetched successfully",
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



module.exports={productRouter}