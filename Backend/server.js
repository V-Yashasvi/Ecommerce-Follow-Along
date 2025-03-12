const express=require('express')
const mongoose=require('mongoose')
const path = require('path');
const app=express()
require("dotenv").config();
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken")
const cors = require("cors");
const cookieParser=require('cookie-parser')
const {UserModel} = require('./model/user.model')
const {productRouter} = require('./routes/product.route')
const {userRouter} = require('./routes/user.route')
const {cartRouter} = require('./routes/cart.route')
const {orderRouter} = require('./routes/order.route')
app.use(cors());
app.use(express.static('uploads'))
app.use(express.json())
const Port=process.env.PORT
let connection=require('./db/database.js');
const authenticate = require('./middleware/authenticate.js');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.get('/ping',(req,res)=>{
    console.log(req)
    try {
        res.send("Pong")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post('/signup', async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userPresent = await UserModel.findOne({ email });
    if (userPresent) {
        return res.json({ msg: "User already exists. Try logging in!" });
    }
    try {
        bcrypt.hash(password, 4, async function (err, hash) {
            if (err) {
                return res.json({ msg: "Error hashing password" });
            }
            const user = new UserModel({ name, email, password: hash });
            await user.save();
            console.log("Signup successful");
            return res.json({ msg: "Signup successful" , user})
        });
    } catch (err) {
        console.error(err);
        return res.json({ msg: "Something went wrong, please try again later" });
    }
});

app.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try{
        let user=await UserModel.find({email});
        console.log(user,password);
        if (user.length>0){
            let hasPassword= user[0].password;
            bcrypt.compare(password,hasPassword,function(err,result){
                if(result){
                    let token=jwt.sign({"userID": user[0]._id,"email":user[0].email},process.env.SECRET_KEY);
                    res.send({"msg":"Login successfully","token":token, email})
                } else{
                    res.send({"msg":"Invalid ! Failed"})
                }
            })
        }else{
            res.send({'msg':"login Failed! Pls Sign-up first!"})
        }
    }catch(err){
        console.log("error", err)
    }
})

app.use('/orders', orderRouter)
app.use('/product', productRouter)
app.use(authenticate)
app.use('/user', userRouter)
app.use('/cart', cartRouter)

app.listen(Port,async()=>{
    try{
        await connection;
        console.log(`app is listening on http://localhost:${Port}`)
    }
    catch(error){
        console.log(error)
    }
})
