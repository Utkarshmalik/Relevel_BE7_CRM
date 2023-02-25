const {verifyToken} = require("../Middlewares/authJWT");
const {createTicket} = require("../Controllers/ticketController")

module.exports = (app)=>{

    app.post("/crm/api/v1/tickets",[verifyToken],createTicket)

}