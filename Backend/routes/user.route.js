const express= require('express')
const {UserModel}=require('../model/user.model')
const authenticate = require('../middleware/authenticate');
let userRouter=express.Router();
const multer=require('multer')

userRouter.get("/profile", authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
});

userRouter.post("/add-address", authenticate, async (req, res) => {
    try {
        const { country, city, address1, address2, zipCode, addressType } = req.body;
        const user = await UserModel.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.addresses.push({ country, city, address1, address2, zipCode, addressType });
        await user.save()
        res.status(201).json({ message: "Address added successfully", user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

userRouter.patch("/update/address", authenticate,async(req,res)=>{
    try {
        const {country,city,address1,address2,zipCode,addressType}=req.body;
        const user=await UserModel.findById(req.body.id);
        const payload={addresses:[...user.addresses,{country,city,address1,address2,zipCode,addressType}]} 
        if(!user){
            res.status(404).json({"message":"User not found"})
        }else{
            await UserModel.findByIdAndUpdate(req.body.id,payload);
            res.json({"message":"Successfully added an address on the databasse"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"message":"Something went wrong"});
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
userRouter.post("/upload",upload.single("myFile"),(req,res)=>{
    try{
        console.log(req.file)
        res.send({"message":"file uploaded sucessfully"});
    }catch(error){
        console.log(error);
        res.send({error:"error"})
    }
})

userRouter.post('/create',async(req,res)=>{
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

module.exports={userRouter}
