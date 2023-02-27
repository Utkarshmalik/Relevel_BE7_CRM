const {verifyToken} = require("../Middlewares/authJWT");
const {createTicket} = require("../Controllers/ticketController")
const {validateTicketRequestBody} = require("../Middlewares/verifyTicketReqBody");

module.exports = (app)=>{

    app.post("/crm/api/v1/tickets",[verifyToken,validateTicketRequestBody],createTicket)

}