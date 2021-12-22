const express = require("express");
const server = express();
const errorHandler = require("./errors/error-handler");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followsController = require("./controllers/follows-controller");
const loginFilter = require("./login-filter");

const cors = require('cors');
server.use(cors({ origin: "http://localhost:3000"}));

server.use(express.json()); 

server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followers", followsController);

server.use(loginFilter);
server.use(errorHandler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));