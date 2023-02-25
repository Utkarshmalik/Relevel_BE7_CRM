const User = require("../Models/user");
const bcrypt = require("bcrypt");
const { userStatus } = require("../utils/constants");

exports.createUser = async (req,res)=>{

    const user = await User.create({
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,5)
    })

    if(!user){
        return res.status(400).send({message:"Invalid details"});
    }

    return res.status(201).send(user);
}

exports.getAllUsers = async (req,res) =>{

    try{
          const users = await User.find({});
        return res.status(200).send(users);
    }
    catch(e){
        return res.status(500).send({message:"Internal server error"});
    }
}


exports.getUserById = async (req,res) =>{
    try{
          const id = req.params.id;

          const user = await User.find({_id:id});
          
          if(!user || !(user.length)){
            return res.status(400).send({message:"Invalid userid passed"});
          }

          return res.status(200).send(user);
    }
    catch(e){
        return res.status(500).send({message:"Internal server error"+e});
    }
}

exports.updateUser = async (req,res)=>{

    const userToBeUpdated = req.params.id;

    const savedUser = await User.findOne({_id:userToBeUpdated});

    if(req.body.status === userStatus.approved){
        savedUser.userStatus = userStatus.approved;
    }

    const updatedUser = await savedUser.save();

    return res.status(200).send(updatedUser);
}