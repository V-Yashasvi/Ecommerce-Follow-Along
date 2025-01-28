const express=require('express')
const mongoose=require('mongoose')
const { UserModel } = require('./module/user.module')
const multer=require('multer')
const app=express()
const PORT=8084
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config();
const cors = require('cors');
const { productRouter } = require('./routes/product.route')
app.use(cors());
app.use(express.json())

let mongoURL="mongodb+srv://VYashasvi:Anurams2262@yashasvi.scepo.mongodb.net/EcomDB"
let connection=mongoose.connect(mongoURL);

app.get('/ping',(req,res)=>{
    console.log(req)
    try {
        res.send("Pong")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+"-"+file.originalname)
    }
});

const upload=multer({storage:storage});
app.post("/upload",upload.single("myFile"),(req,res)=>{
    try{
        console.log(req.file)
        res.send({"message":"file uploaded sucessfully"});
    }catch(error){
        console.log(error);
        res.send({error:"error"})
    }
})

app.post('/create',async(req,res)=>{
    let payload=req.body
    console.log(payload)
    try{
        let new_user=new UserModel(payload);
        await new_user.save();
        res.send({"message":"Hurray! Successfully saved the user to the database"})
    }
    catch(error){
        console.log(error);
        res.send({"error":error})
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
                    let token=jwt.sign({"userID": user[0]._id},process.env.SECRET_KEY);
                    res.send({"msg":"Login successfully","token":token})
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
