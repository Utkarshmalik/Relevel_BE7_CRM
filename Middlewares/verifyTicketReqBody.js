const { ticketStatus } = require("../utils/constants");


const validateTicketRequestBody = (req,res,next)=>{

    if(!req.body.title){
        return res.status(400).send({message:"Failed! Title is not provided"});
    }

    if(!req.body.description){
        return res.status(400).send({message:"Failed! Description is not provided"});
    }

    next();
}

const validateTicketRequestStatus = async (req,res,next)=>{

    const status = req.body.status;
    const possibleStatus= [ticketStatus.inProgress,ticketStatus.open,ticketStatus.closed,ticketStatus.blocked];

    if(status && !possibleStatus.includes(status)){
        return res.status(400).send({message:`Status should be among ${possibleStatus}`});
    }

next();

}



module.exports={
    validateTicketRequestBody,
    validateTicketRequestStatus
}