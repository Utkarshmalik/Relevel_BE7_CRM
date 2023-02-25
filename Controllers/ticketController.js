const User = require("../Models/user");
const { userTypes, userStatus } = require("../utils/constants");
const Ticket = require("../Models/ticket");

exports.createTicket = async (req,res)=>{

    const ticketObj={
        title:req.body.title,
        ticketPriority:req.body.ticketPriority,
        description:req.body.description,
        status:req.body.status,
        requestor:req.userId
    };

    //find a random enginner in approved state and assign this ticket to that engineer

    const engineer = await User.findOne({
        userTypes:userTypes.engineer,
        userStatus:userStatus.approved
    });

    ticketObj.assignee = engineer.userId;

    try{
        const ticket = await Ticket.create(ticketObj);

        return res.status(201).send(ticket);
    }catch(e){
        return res.status(500).send({message:"Internal Server Error!"});
    }
    
}