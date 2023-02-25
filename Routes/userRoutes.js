
const {createUser, getAllUsers, getUserById} = require("../Controllers/userController");
const {verifyToken, isAdmin, isAdminOrOwnUser} = require("../Middlewares/authJWT");

module.exports = function(app){

    app.post("/crm/api/v1/users",createUser);
    app.get("/crm/api/v1/users",[verifyToken, isAdmin],getAllUsers);
    app.get("/crm/api/v1/users/:id",[verifyToken,isAdminOrOwnUser],getUserById);

}