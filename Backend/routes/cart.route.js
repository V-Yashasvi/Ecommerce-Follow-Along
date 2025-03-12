const express= require('express')
const {CartModel}=require('../model/cart.model');
const {UserModel}=require('../model/user.model')
let cartRouter=express.Router();
const authenticate = require('../middleware/authenticate');
const { productModel } = require('../model/product.model');

cartRouter.get('/products', authenticate, async (req, res) => {
    try {
        const  userId  = req.body.id;
        console.log(userId);
        const user = await CartModel.find({user:userId}).populate('product');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user)
        res.status(200).json({
            message: "Cart items fetched successfully",
            cart: user
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

cartRouter.post('/add', authenticate, async (req, res) => {
    try {
        const userId = req.body.id;
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }
        const user = await UserModel.findById(userId);
        const product = await productModel.findById(productId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!product) return res.status(404).json({ message: "Product not found" });
        const productPrice = parseFloat(product.productPrice);
        let cartItem = await CartModel.findOne({ user: userId, product: productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * productPrice;
        } else {
            cartItem = new CartModel({
                user: userId,
                product: productId,
                quantity,
                totalPrice: quantity * productPrice
            });
            user.cart.push(cartItem._id);
        }
        await cartItem.save();
        await user.save();
        return res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        console.error("Error in /cart/add:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

cartRouter.put('/increase/:cartItemId', async (req, res) => {
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

cartRouter.put('/decrease/:cartItemId', async (req, res) => {
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

module.exports={cartRouter}