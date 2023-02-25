const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

const verifyToken = (req,res,next)=> {

    //get the token 

    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message:"No Token Provided"});
    }

    jwt.verify(token,authConfig.secret,(err,payload) => {

        if(err){
            return res.status(403).send({message:"Invalid JWT token"});
        }

        req.userId = payload.id;
        
        next();
    })

}

module.exports = {
    verifyToken
}