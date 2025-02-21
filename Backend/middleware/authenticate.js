const jwt= require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const authenticate=(req, res, next)=>{
    const token= req.headers?.authorization?.split(" ")[1];
    console.log(req.headers,token,"n")
    if(token){
        const decoded=jwt.verify(token, process.env.SECRET_KEY);
        if(decoded){
            console.log(decoded)
            let userID=decoded.userID;
            let email=decoded.email;
            req.body.id=userID;
            req.body.email=email;

        }else{
            res.send("Login Pls")
        }
    }else{
        res.send("Login Pls")
    }
    next();
}

module.exports=[authenticate]