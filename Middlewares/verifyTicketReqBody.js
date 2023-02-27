

const validateTicketRequestBody = (req,res,next)=>{

    if(!req.body.title){
        return res.status(400).send({message:"Failed! Title is not provided"});
    }

    if(!req.body.description){
        return res.status(400).send({message:"Failed! Description is not provided"});
    }
    
    next();
}




module.exports={
    validateTicketRequestBody
}