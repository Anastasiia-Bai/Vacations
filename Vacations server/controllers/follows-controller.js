const express = require("express");
const router = express.Router();
const followsLogic = require("../logic/follows-logic");
const cacheModule = require("../dao/cache-module");

router.post("/", async (request, response, next) => {
    try {
        let vacationId = request.body.id;
        let userDetails = await cacheModule.extractUserDataFromCache(request);
        await followsLogic.follow(vacationId, userDetails.userId);
        response.json();
    } catch(e) {
        next(e);
    }
});

router.delete("/:id", async (request, response, next) => {
    try {
        let vacationId = request.params.id;
        let userDetails = await cacheModule.extractUserDataFromCache(request);
        await followsLogic.unFollow(vacationId, userDetails.userId);
        response.json();
    } catch {
        next(e);
    }
});

module.exports = router;