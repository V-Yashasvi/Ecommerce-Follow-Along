const express= require('express')
const {CartModel}=require('../module/cart.module');
let cartRouter=express.Router();
const authenticate = require('../middleware/authenticate');

cartRouter.get('/cart', authenticate, async (req, res) => {
    console.log("11")
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

cartRouter.post('/cart/add', async (req, res) => {
    console.log("12")
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

cartRouter.put('/cart/increase/:cartItemId', async (req, res) => {
    console.log("13")
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

cartRouter.put('/cart/decrease/:cartItemId', async (req, res) => {
    console.log("14")
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