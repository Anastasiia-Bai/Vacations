let usersDao = require("../dao/users-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const usersCache = require("../dao/cache-module");

const saltLeft = "awsdrfgyhujkol;12";
const saltRight = "10ncgdfska3e";

async function addUser(registrationData) {
    validateUserData(registrationData);
    usersDao.isUserExistByEmail(registrationData);
    registrationData.password = crypto.createHash("md5").update(saltLeft + registrationData.password + saltRight).digest("hex");
    await usersDao.addUser(registrationData);
}

function validateUserData(registrationData) {
    if (!registrationData.password){
        alert(ErrorType.INVALID_PASSWORD.message);
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }
    if (!registrationData.userName){
        alert(ErrorType.INVALID_USER_NAME.message);
        throw new ServerError(ErrorType.INVALID_USER_NAME);
    }
    if (!registrationData.email){
        alert(ErrorType.INVALID_EMAIL.message);
        throw new ServerError(ErrorType.INVALID_EMAIL);
    }
}

async function login(user) {
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    let userData = await usersDao.login(user);
    const token = jwt.sign({ sub: user.email }, config.secret);
    await usersCache.set(token, userData.userId, userData.userType);

    return {token: token, userName: userData.userName, userType: userData.userType, userId: userData.userId};
}

module.exports = {
    addUser,
    login,
};