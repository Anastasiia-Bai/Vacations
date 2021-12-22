let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addUser(registrationData) {
    let sql = "INSERT INTO users (user_name, email, password, user_type)  VALUES(?, ?, ?, 'CUSTOMER')";
    let parameters = [registrationData.userName, registrationData.email, registrationData.password];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
    }
}

async function isUserExistByEmail(registrationData) {
    let sql = "SELECT email FROM users WHERE email=?";
    let parameters = [registrationData.email];
    try{
        let usersEmail = await connection.executeWithParameters(sql, parameters);

        if(usersEmail == null || usersEmail.length == 0) {
            return false;
        }
        return true;
    } catch(e) {
        throw new ServerError(ErrorType.USER_EMAIL_ALREADY_EXIST, JSON.stringify(registrationData), e);
    }
}

async function login(user) {
    let sql = "SELECT id as userId, user_type as userType, user_name as userName FROM users where email =? and password =?";
    let parameters = [user.email, user.password];
    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
        return usersLoginResult[0];
    }
    catch (e) {
            throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
}

module.exports = {
    addUser,
    login,
    isUserExistByEmail,
};