const { userStatus, userTypes } = require("../utils/constants");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfigs = require("../configs/auth.config");
const {sendEmail} = require("../utils/NotificationClient");
const {userRegistration} = require("../script/authScripts");

exports.signUp = async (req,res)=>{

    var userType =  req.body.userType;
    var status;

    if(!userType || userType===userTypes.customer){
        status = userStatus.approved
    }else{
        status = userStatus.pending;
    }

    const userObj={
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        userTypes:req.body.userType,
        userStatus:status,
        password:bcrypt.hashSync(req.body.password, 8)
    }

    try{
    const user = await User.create(userObj);

    //send the notification to the registered email that you are registered succesfully

    const {subject,html,text} = userRegistration(user);

    sendEmail([user.email],subject,html,text);

    res.status(201).send(user)

    }
    catch(e){
        res.status(500).send({message:"Internal server error"})
    }
}


exports.signIn = async (req,res)=>{

    const user = await User.findOne({userId:req.body.userId});

    if(user===null){
        return res.status(400).send({message:"UserId passed is invalid"});
    }

    if(user.userStatus != userStatus.approved){
        return res.status(200).send({message:`Cant allow user to login as this user is in ${user.userStatus} state`});
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordValid){
        return res.status(401).send({message:"Invalid password!"});
    }

    var token = jwt.sign({id:user.userId},authConfigs.secret, {expiresIn:86400});
    
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userTypes,
        userStatus:user.userStatus,
        accessToken: token
    })
}