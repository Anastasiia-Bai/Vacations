const express = require("express");
const router = express.Router();
const vacationsLogic = require("../logic/vacations-logic");
const cacheModule = require("../dao/cache-module");

router.post("/", async (request, response, next) => {
    let vacationData = request.body;
    try{
        await vacationsLogic.addVacation(vacationData);
        response.json();
    } catch(e) {
        return next(e);
    }
});

router.get("/", async (request, response, next) => {
    try{
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let vacations = await vacationsLogic.getAllVacations(userId);
        response.json(vacations);
    } catch(e) {
        return next(e);
    }
});

router.put("/:id", async (request, response, next) => {
    try{
        let vacation = request.body;
        let id = request.params.id;
        await vacationsLogic.updateVacation(vacation, id);
        response.json();
    } catch(e) {
        return next(e);
    }
});

router.delete("/:id", async (request, response, next) => {
    try{
        let id = request.params.id;
        await vacationsLogic.deleteVacation(id);
    } catch(e) {
        return next(e);
    }
});

module.exports = router;