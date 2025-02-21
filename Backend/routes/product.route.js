const express= require('express')
const multer=require('multer')
const path=require('path');
const {UserModel}=require('../module/user.module')
const {productModel} = require('../module/product.module');
const {CartModel}=require('../module/cart.module');
const authenticate = require('../middleware/authenticate');
let productRouter=express.Router();

productRouter.get('/',async(req, res)=>{
    try {
        const products=await productModel.find()
        res.send({"message":"Successfully recieved the data from database", data:products})
    } catch (error) {
        res.send({"error message":error})
    }
});

productRouter.get('/cart', authenticate, async (req, res) => {
    try {
        const  userId  = req.body.id;
        console.log(userId);
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
        console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error.message });
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
        const { userId, productId } = req.body;
        const quantity = req.body.quantity

        const user = await UserModel.findById(userId);
        const product = await productModel.findById(productId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!product) return res.status(404).json({ message: "Product not found" });

        const productPrice = parseFloat(product.productPrice);
        let cartItem = await CartModel.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new CartModel({
                user: userId,
                product: productId,
                quantity
            });
            user.cart.push(cartItem._id);
        }

        cartItem.totalPrice = cartItem.quantity * productPrice;

        await cartItem.save();
        await user.save();
        return res.status(200).json({ message: "Product added to cart", cart: cartItem });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



productRouter.put('/cart/increase/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cartItem = await CartModel.findById(cartItemId).populate('product');
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        cartItem.quantity += 1;
        cartItem.totalPrice = cartItem.quantity * cartItem.product.productPrice;
        await cartItem.save();
        return res.status(200).json({ message: "Quantity increased", cartItem });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

productRouter.put('/cart/decrease/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cartItem = await CartModel.findById(cartItemId).populate('product');
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        if (cartItem.quantity === 1) return res.status(400).json({ message: "Minimum quantity is 1" });

        cartItem.quantity -= 1;
        cartItem.totalPrice = cartItem.quantity * cartItem.product.productPrice;
        await cartItem.save();
        return res.status(200).json({ message: "Quantity decreased", cartItem });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


module.exports={productRouter}