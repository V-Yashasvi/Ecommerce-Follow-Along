const express=require('express')
const mongoose=require('mongoose')
const { UserModel } = require('./module/user.module')
const app=express()
const PORT=8084
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config();
const { productRouter } = require('./routes/product.route')
const {userRouter} = require('./routes/user.route')
const {cartRouter} = require('./routes/cart.route')
const cors = require("cors");
app.use(cors());
app.use(express.json())
let url=process.env.mongoURL
let connection=mongoose.connect(url);

app.get('/ping',(req,res)=>{
    console.log(req)
    try {
        res.send("Pong")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post('/signup', async(req, res)=>{
    console.log(req.body)
    const {name, email, password}=req.body;
    const userPresent=await UserModel.findOne({email})
    if(userPresent?.email){
        res.send("Try loggin in, already exist")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err,hash){
                const user= new UserModel({name,email,password:hash})
                await user.save();
                res.send("Signup successful")
            });
        }
        catch(err){
            console.log(err);
            res.send("Something went wrong, please try again later")
        }
    }
})

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
                    res.send({"msg":"Login successfully","token":token,email})
                } else{
                    res.send({"message":"Invalid "})
                }
            })
        }else{
            res.send({'msg':"login Failed! Pls Sign-up first!"})
        }
    }catch(err){
        console.log("error", err)
    }
})

app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/cart', cartRouter)


app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("Successfully connected to mongoDb")
    }
    catch(error){
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
})
