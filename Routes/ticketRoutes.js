const {verifyToken, isAdmin} = require("../Middlewares/authJWT");
const {createTicket,geAllTickets, getTicketById, updateTicketById} = require("../Controllers/ticketController")
const {validateTicketRequestBody,validateTicketRequestStatus} = require("../Middlewares/verifyTicketReqBody");





module.exports = (app)=>{

    app.post("/crm/api/v1/tickets",[verifyToken,validateTicketRequestBody],createTicket)
    app.get("/crm/api/v1/tickets",[verifyToken],geAllTickets);
    app.get("/crm/api/v1/tickets/:id",[verifyToken],getTicketById);
    app.put("/crm/api/v1/tickets/:id",[verifyToken],updateTicketById)
}