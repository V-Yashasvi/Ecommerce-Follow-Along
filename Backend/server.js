const express=require('express')
const mongoose=require('mongoose')
const app=express()
const PORT=8084

let mongoURL="mongodb+srv://VYashasvi:Anurams2262@yashasvi.scepo.mongodb.net/EcomDB"
let connection=mongoose.connect(mongoURL);

app.get('/ping',(req,res)=>{
    res.send("Pong")
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
