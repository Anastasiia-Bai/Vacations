let tokenToUserDetailsMap = new Map();
let userCache = new Map();

async function get(token){
    if (token == null){
        throw new Error("Invalid key, failed to retrieve data from cache");
    }
    return tokenToUserDetailsMap.get(token);
}

async function set(token, userData){
    tokenToUserDetailsMap.set(token, userData);
    userCache.set(token, userData);
}

function extractUserDataFromCache(request) {
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("Bearer ".length);
    let userId = userCache.get(token);
    return {token, userId}
}

module.exports = {
    set,
    get,
    extractUserDataFromCache
}