const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function unFollow(vacationId, userId) {
    const sql = `DELETE FROM followers WHERE user_id = ${userId} AND vacation_id = ${vacationId}`;
    let parameters = [vacationId, userId];
    try{
        await connection.executeWithParameters(sql, parameters);
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationId, userId), e);
    }
}

async function follow(vacationId, userId) {
    const sql = `INSERT INTO followers (vacation_id, user_id) VALUES(${vacationId}, ${userId})`;
    let parameters = [vacationId, userId];
    try{
        await connection.executeWithParameters(sql, parameters);
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationId, userId), e);
    }
}

module.exports = {
    unFollow,
    follow
};