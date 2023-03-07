const { mockRequest, mockResponse } = require("../interceptor");
const {validateTicketRequestStatus} = require("../../Middlewares/verifyTicketReqBody");

const ticketTestPayload={
ticketPriority:5,
status:"OPENED",
}


const correctticketTestPayload={
    ticketPriority:5,
    status:"OPEN"
    }
    

describe("validate Ticket Status",()=>{

    it("should fail",async ()=>{

        const req=mockRequest();
        const res=mockResponse();

        req.body = ticketTestPayload;

        await validateTicketRequestStatus(req,res,jest.fn());

        expect(res.status).toHaveBeenCalledWith(400);
    })


    it("should pass",async ()=>{

        const req=mockRequest();
        const res=mockResponse();

        req.body = correctticketTestPayload;

        await validateTicketRequestStatus(req,res,jest.fn());

        expect(res.status).not.toHaveBeenCalled();
    })

})