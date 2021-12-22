const vacationsDao = require("../dao/vacations-dao");

async function addVacation(vacationData) {
    await vacationsDao.addVacation(vacationData);
}

async function getAllVacations(userId) {
    let allVacations = await vacationsDao.getAllVacations(userId);
    for(let i = 0; i < allVacations.length; i ++) {
        if(allVacations[i].isFollowed == 1) {
            allVacations[i].isFollowed = true;
        } else {
            allVacations[i].isFollowed = false;
        }
    }
    return allVacations;
}

async function updateVacation(updatedVacationsData, vacationId) {
    await vacationsDao.updateVacation(updatedVacationsData, vacationId);
}

async function deleteVacation(vacationId) {
    await vacationsDao.deleteVacation(vacationId);
}

module.exports = {
    addVacation,
    getAllVacations,
    updateVacation,
    deleteVacation,
};