
const {createUser, getAllUsers, getUserById} = require("../Controllers/userController");
const {verifyToken} = require("../Middlewares/authJWT");

module.exports = function(app){

    app.post("/crm/api/v1/users",createUser);
    app.get("/crm/api/v1/users",[verifyToken],getAllUsers);
    app.get("/crm/api/v1/users/:id",[verifyToken],getUserById);

}