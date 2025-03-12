const express = require('express');
const {UserModel}=require('../model/user.model')
const {OrderModel} = require('../model/order.model');
const {productModel} = require('../model/product.model');
const orderRouter = express.Router();
const authenticate = require('../middleware/authenticate');

orderRouter.get("/", async (req, res) => {
    try {
    const orders = await OrderModel.find()
        .populate("product", "productName productImage productPrice")
        .populate("user", "email name");
    res.status(200).json(orders);
    } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
    }
});

orderRouter.post('/create', async (req, res) => {
    try {
        const order = new OrderModel(req.body); 
        await order.save(); 
        res.status(201).send(order); 
        } catch (error) {
        res.status(400).send(error); 
    }
})

orderRouter.post("/place", authenticate, async (req, res) => {
    try {
        const { email, products, address } = req.body;
        console.log(req.body,"Body")
        if (!email || !products || !address || !address.zipCode) {
            return res.status(400).json({ message: "Email, products, and full address are required" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userId = user._id;
        let orders = [];
        for (const product of products) {
            const new_product = await productModel.findById(product._id);
            if (!new_product) {
                return res.status(404).json({ message: `Product ${product._id} not found` });
            }
            if (!new_product.productPrice || isNaN(new_product.productPrice)) {
                return res.status(400).json({ message: `Invalid product price for ${new_product._id}` });
            }
            const newOrder = new OrderModel({
                user: userId,
                product: new_product._id,
                quantity: product.quantity,
                totalPrice: product.quantity * new_product.productPrice,
                address,
                status: "Pending",
                orderDate: new Date()
            });
            await newOrder.save();
            orders.push(newOrder);
            user.orders.push(newOrder._id);
        }
        await user.save();
        return res.status(201).json({ message: "Orders placed successfully", orders });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

orderRouter.get('/:id', async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id); 
        return res.status(200).send(order); 
    } catch (error) {
        res.status(500).send(error); 
    }
})

orderRouter.patch('/update/:id', async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
        return res.status(404).send();
        }
        res.send(order);
    } catch (error) {
        res.status(400).send(error);
    }
})

orderRouter.delete('/delete/:id', async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order) {
        return res.status(404).send();
        }
        res.status(200).json({ message: "Order deleted successfully", order });
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = {orderRouter};