const express=require('express')
const mongoose=require('mongoose')
const { UserModel } = require('./module/user.module')
const multer=require('multer')
const app=express()
const PORT=8084
const bcrypt=require('bcryptjs')

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
// app.post('/create',async(req,res)=>{
//     let payload=req.body
//     console.log(payload)
//     try{
//         let new_user=new userModel(payload);
//         await new_user.save();
//         res.send({"message":"Hurray! Successfully saved the user to the database"})
//     }
//     catch(error){
//         console.log(error);
//         res.send({"error":error})
//     }
// })
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
