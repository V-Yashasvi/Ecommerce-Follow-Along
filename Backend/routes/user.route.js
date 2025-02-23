const express= require('express')
const {UserModel}=require('../module/user.module')
const authenticate = require('../middleware/authenticate');
let userRouter=express.Router();
const multer=require('multer')

userRouter.get("/", authenticate, async (req, res) => {
    console.log("21")
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

userRouter.patch("/update/address", authenticate,async(req,res)=>{
    try {
        // console.log(req.body.addresses,"JJ")
        const {country,city,address1,address2,zipCode,addressType}=req.body;
        // const payload = {addresses:{country,city,address1,address2,zipCode,addressType}};
        // console.log(payload,"payload", req.body.id)
        
        const user=await UserModel.findById(req.body.id);
        // payload=[...user.addresses,]
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
    console.log("22")
    try{
        console.log(req.file)
        res.send({"message":"file uploaded sucessfully"});
    }catch(error){
        console.log(error);
        res.send({error:"error"})
    }
})

userRouter.post('/create',async(req,res)=>{
    console.log("23")
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
