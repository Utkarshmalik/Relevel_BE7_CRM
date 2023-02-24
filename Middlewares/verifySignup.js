const User = require("../Models/user");
const {userTypes} = require("../utils/constants");

const verifySignUpRequest = async (req,res,next)=>{

    if(!req.body.name){
        return res.status(400).send({message:"Failed! UserName doesn't exists"});
    }
   
    if(!req.body.userId){
        return res.status(400).send({message:"Failed! userId doesn't exists"});
    }

    //validate userId

    var user = await User.findOne({userId:req.body.userId});

    if(user!=null){
        return res.status(400).send({message:"Failed! UserId already exists"});
    }



    if(!req.body.email){
        return res.status(400).send({message:"Failed! email doesn't exists"});
    }

        //validate email

       user = await User.findOne({email:req.body.email});

        if(user!=null){
            return res.status(400).send({message:"Failed! email already exists"});
      }

      const validUserTypes = [userTypes.admin,userTypes.customer,userTypes.engineer];
      const userType = req.body.userType;

      if(userType && !validUserTypes.includes(userType)){
        return res.status(400).send({message:`Failed! UserType should be among ${validUserTypes} `});
      }

      next();

}


module.exports={
    verifySignUpRequest
}