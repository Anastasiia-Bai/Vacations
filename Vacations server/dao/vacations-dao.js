const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function addVacation(vacationData) {
    let sql = `INSERT INTO vacations (destination, description, image, start_date, end_date, price) VALUES (?, ?, ?, ?, ?, ?)`;
    let parameters = [vacationData.destination, vacationData.description, vacationData.image, vacationData.startDate, vacationData.endDate, vacationData.price];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationData), e);
    }
}

async function getAllVacations(userId) {
    let sql = `SELECT 
    v.id,
    v.destination,
    v.description,
    v.image,
    DATE_FORMAT(v.start_date, "%Y-%m-%d") AS startDate,
    DATE_FORMAT(v.end_date, "%Y-%m-%d") AS endDate,
    v.price,
    CASE WHEN followed.vacation_id IS NOT NULL THEN 1
    ELSE 0 
    END AS 'isFollowed',
    CASE WHEN fv.followers IS NOT NULL THEN fv.followers 
    ELSE 0 
    END AS 'amountOfFollowers'
    FROM vacations v 
    LEFT JOIN
    (SELECT vacation_id 
    FROM followers 
    WHERE user_id = ?) 
    followed ON v.id = followed.vacation_id 
    LEFT JOIN
    (SELECT vacation_id, COUNT(vacation_id) AS 'followers'
    FROM followers 
    GROUP BY vacation_id) fv ON v.id = fv.vacation_id
    ORDER BY isFollowed DESC`;
    let parameters = [userId];
    try {
        let allVacations = await connection.executeWithParameters(sql, parameters);
        return allVacations;
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
    }
}

async function updateVacation(updatedVacationData, vacationId) {
    let sql = `UPDATE vacations SET destination=?, description=?, image=?, start_date=?, end_date=?, price=? WHERE id= ${vacationId}`;
    let parameters = [
        updatedVacationData.destination,
        updatedVacationData.description,
        updatedVacationData.image,
        updatedVacationData.startDate,
        updatedVacationData.endDate,
        updatedVacationData.price
    ];
    try{
        await connection.executeWithParameters(sql, parameters);
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updatedVacationData), e);
    }
}

async function deleteVacation(vacationId) {
    let sql = "DELETE FROM vacations WHERE id=?";
    let parameters = [vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationId), e);
    }
}

module.exports = {
    addVacation,
    getAllVacations,
    updateVacation,
    deleteVacation,
};