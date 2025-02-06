const jwt= require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const authenticate=(req, res, next)=>{
    const token= req.headers?.authentication?.split(" ")[1];
    if(token){
        const decoded=jwt.verify(token, process.env.SECRET_KEY)
    }
}

module.exports=[authenticate]