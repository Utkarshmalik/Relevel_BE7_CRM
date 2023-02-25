const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../Models/user");
const { userTypes } = require("../utils/constants");

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

const isAdmin = async (req,res,next)=>{

    const user = await User.findOne({userId:req.userId});

    if(user && user.userTypes === userTypes.admin){
        next();
    }else{
        return res.status(403).send({message:"Only Admin users are allowed to access this route!"})
    }
}

const isAdminOrOwnUser = async (req,res,next)=>{

    //this will run only for routes which gives id in params 

    const user = await User.findOne({userId:req.userId});

    if( (user && user.userTypes === userTypes.admin) || (req.params.id===user.id)){
        next();
    
    }
    else{
        return res.status(403).send({message:"You users are allowed to access this route!"})
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isAdminOrOwnUser
}