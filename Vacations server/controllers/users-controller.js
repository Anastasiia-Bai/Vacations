const express = require("express");
const router = express.Router();
const usersLogic = require("../logic/users-logic");

router.post("/", async (request, response, next) => {
    let registrationData = request.body;
    try{
        await usersLogic.addUser(registrationData);
        response.json();
    } catch(e) {
        return next(e);
    }
});

router.post("/login", async (request, response, next) => {
    let user = request.body;
    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
    } catch(e) {
        return next(e);
    }
});

module.exports = router;