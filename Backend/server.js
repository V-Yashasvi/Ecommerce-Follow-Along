const express=require('express')
const mongoose=require('mongoose')
const { userModel } = require('./module/user.module')
const multer=require('multer')
const app=express()
const PORT=8084

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
        let new_user=new userModel(payload);
        await new_user.save();
        res.send({"message":"Hurray! Successfully saved the user to the database"})
    }
    catch(error){
        console.log(error);
        res.send({"error":error})
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
