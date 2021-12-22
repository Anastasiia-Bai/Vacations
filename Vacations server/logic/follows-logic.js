const followsDao = require("../dao/follows-dao");

async function unFollow(vacationId, userId) {
    await followsDao.unFollow(vacationId, userId);
}

async function follow(vacationId, userId) {
    await followsDao.follow(vacationId, userId);
}

module.exports = {
    unFollow,
    follow
}